<?php
header('Content-Type: application/json');
include 'conexao.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $titulo = $data['titulo'];

    $query = $pdo->prepare("SELECT quantidade FROM produtos WHERE titulo = :titulo");
    $query->bindParam(':titulo', $titulo);
    $query->execute();
    $produto = $query->fetch(PDO::FETCH_ASSOC);

    if ($produto) {
        echo json_encode(['quantidade' => $produto['quantidade']]);
    } else {
        echo json_encode(['erro' => 'Produto não encontrado']);
    }

} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>