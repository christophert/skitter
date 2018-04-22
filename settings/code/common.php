<?php
// CHANGE TO APPROPRIATE MYSQL VARIABLES
$dbHost = "db";
$dbUser = $_ENV['SKITTER_DB_USER'];
$dbPass = $_ENV['SKITTER_DB_PASS'];
$dbName = "skitter";
$charset = 'utf8mb4';

$dsn = "mysql:host=$dbHost;dbname=$dbName;charset=$charset";

$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

$pdo = new PDO($dsn, $dbUser, $dbPass, $opt);
?>
