<?php
require 'common.php';
include 'func.php';
require_once 'handler.php';

if(!empty($_SERVER['X-SKITTER-AUTH-USER']) && $_SERVER['REQUEST_METHOD'] === "POST" && !empty($_SERVER['HTTP_X_STCSRF_TOKEN']) && validateCSRF($_SERVER['HTTP_X_STCSRF_TOKEN'])) {
    $user_to_modify = $_SERVER['X-SKITTER-AUTH-USER'];

    //attributes that they can modify: firstName, lastName, email, and profile picture
    $valid_keys = [ "first_name", "last_name", "email" ];
    $keys_to_modify = array_intersect($valid_keys, array_keys($_POST));
    
    // check if user exists
    $query = "SELECT COUNT(*) FROM account WHERE uid = :uid";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam('uid', $user_to_modify, PDO::PARAM_STR);
    $stmt->execute();
    $user_count = $stmt->fetchColumn();
    if($user_count == 0) {
        header('Content-Type: application/json');
        http_response_code(404);
        die('{"success": false, "message": "user was not found"}');
    } else if($user_count != 1) {
        header('Content-Type: application/json');
        http_response_code(500);
        die('{"success": false, "message": "there is a database issue, contact your administrator"}');
    }

    //prepare keys to be updated
    if(count($keys_to_modify) > 0) {
        $keyq = '';
        foreach($keys_to_modify as $key) {
            $keyq .= $key . "=:" . $key . ",";
        }
        $keyq = rtrim($keyq, ',');
        $query = "UPDATE account SET " . $keyq ." WHERE uid=:uid";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam('uid', $user_to_modify, PDO::PARAM_STR);
        foreach($keys_to_modify as $key) {
            $stmt->bindParam(':'.$key, $_POST[$key], PDO::PARAM_STR);
        }
        if($stmt->execute()) {
            header('Content-Type: application/json');
            http_response_code(200);
            die('{"success": true}');
        };
    } else if (isset($_POST['qqfilename'])) {
        $uploader = new UploadHandler();
        $uploader->allowedExtensions = array("jpg");
        $uploader->sizeLimit = 1048576;
        $uploader->inputName = "profilepic";
        $result = $uploader->handleUpload("../profile_pictures", "$user_to_modify.jpg");
        header('Content-Type: application/json');
        echo json_encode($result);
    }
} else {
    // user is not properly authenticated
    header('Content-Type: application/json');
    http_response_code(401);
    die('{"success": false, "message": "This action is unauthorized"}');
}
?>
