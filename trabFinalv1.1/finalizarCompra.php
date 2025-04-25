<?php
include 'conexao.php';

header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["erro" => "Formato inválido. Esperado um array de produtos."]);
    exit;
}

try {
    $pdo->beginTransaction();
    $produtosAtualizados = [];

    foreach ($data as $produto) {
        if (!isset($produto["id"]) || !isset($produto["quantidade"])) {
            throw new Exception("Produto inválido: " . json_encode($produto));
        }

        $id = intval($produto["id"]);
        $quantidadeComprada = intval($produto["quantidade"]);

        $stmt = $pdo->prepare("SELECT quantidade FROM produtos WHERE id = :id");
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            throw new Exception("Produto ID $id não encontrado.");
        }

        $quantidadeAtual = intval($result["quantidade"]);
        $novaQuantidade = $quantidadeAtual - $quantidadeComprada;

        if ($novaQuantidade < 0) {
            throw new Exception("Estoque insuficiente para o produto ID $id.");
        }
 
        $update = $pdo->prepare("UPDATE produtos SET quantidade = :novaQuantidade WHERE id = :id");
        $update->bindValue(":novaQuantidade", $novaQuantidade, PDO::PARAM_INT);
        $update->bindValue(":id", $id, PDO::PARAM_INT);
        $update->execute();

        $produtosAtualizados[] = [
            "id" => $id,
            "quantidadeComprada" => $quantidadeComprada,
            "novoEstoque" => $novaQuantidade
        ];
    }

    $pdo->commit();
    echo json_encode([
        "sucesso" => true,
        "produtos" => $produtosAtualizados
    ]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
