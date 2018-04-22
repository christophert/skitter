<?php
require 'func.php';
if(!empty($_SERVER['X-SKITTER-AUTH-USER'])) {
    session_start();
    if(!isset($_SESSION['csrf_token']) || empty($_SESSION['csrf_token'])) {
        generateNewCSRF();

    }
}

?>
