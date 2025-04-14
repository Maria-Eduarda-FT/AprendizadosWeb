<?php
$host = 'localhost';
$port = '5432';
$dbname = 'ldaBanco';
$user = 'postgres';
$password = '254100';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo 'Conexão bem sucedida';
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>