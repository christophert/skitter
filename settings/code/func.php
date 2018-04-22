<?php

// generate new CSRF token
function generateNewCSRF() {
    unset($_SESSION['csrf_token']);
    $_SESSION['csrf_token'] = bin2hex(openssl_random_pseudo_bytes(32));
    setcookie("X-STCSRF-TOKEN", $_SESSION['csrf_token'], 0, '/', '', true);
}

function validateCSRF($csrf) {
    session_start();
    if($_SESSION['csrf_token'] === $csrf) {
        //token valid, destroy and generate new one
        generateNewCSRF();
        return true;
    } else {
        return false;
    }
}
?>
