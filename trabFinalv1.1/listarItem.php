<?php
header('Content-Type: application/json');
include 'conexao.php';

try {
    $query = $pdo->query("SELECT * FROM produtos");
    $produtos = $query->fetchAll(PDO::FETCH_ASSOC);

    $produtosPorCategoria = [];

    foreach ($produtos as $produto) {
        $produtosPorCategoria[$produto['categoria']][] = $produto;
        
        if (!isset($produtosPorCategoria['todos'])) {
            $produtosPorCategoria['todos'] = [];
        }
        $produtosPorCategoria['todos'][] = $produto;
    }

    echo json_encode($produtosPorCategoria);

} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>