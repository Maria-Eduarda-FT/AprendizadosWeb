<?php
file_put_contents("debug_entrada.txt", file_get_contents("php://input"));
include 'conexao.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

error_log("Dados de compra recebidos: " . file_get_contents("php://input"));

$data = json_decode(file_get_contents("php://input"), true);

// Verifique se o JSON tem dados de produtos (independente da categoria)
if (empty($data) || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["erro" => "Formato inválido ou dados ausentes."]);
    exit;
}

try {
    $pdo->beginTransaction();
    $produtosAtualizados = [];

    // Percorrendo cada categoria no JSON
    foreach ($data as $categoria => $produtos) {
        // Verifica se a categoria tem produtos
        if (is_array($produtos)) {
            foreach ($produtos as $produto) {
                error_log("Produto da categoria '$categoria': " . json_encode($produto));

                $idProduto = null;
                $identificador = null;

                if (isset($produto["id"]) && !empty($produto["id"])) {
                    $idProduto = intval($produto["id"]);
                    $identificador = "id = :id";
                } elseif (isset($produto["titulo"]) && !empty($produto["titulo"])) {
                    $identificador = "titulo = :titulo";
                } else {
                    error_log("Produto sem identificação válida: " . json_encode($produto));
                    continue;
                }

                $stmt = $pdo->prepare("SELECT id, quantidade FROM produtos WHERE $identificador");

                if ($idProduto !== null) {
                    $stmt->bindParam(":id", $idProduto);
                } else {
                    $stmt->bindParam(":titulo", $produto["titulo"]);
                }

                $stmt->execute();
                $produtoDB = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$produtoDB) {
                    error_log("Produto não encontrado no banco: " . json_encode($produto));
                    continue;
                }

                $idProduto = $produtoDB["id"];
                $quantidadeAtual = intval($produtoDB["quantidade"]);
                $quantidadeComprada = isset($produto["quantidade"]) ? intval($produto["quantidade"]) : 0;

                error_log("ID: $idProduto | Estoque atual: $quantidadeAtual | Quantidade comprada: $quantidadeComprada");

                if ($quantidadeComprada <= 0) {
                    error_log("Quantidade inválida para o produto ID $idProduto");
                    continue;
                }

                if ($quantidadeAtual < $quantidadeComprada) {
                    throw new Exception("Estoque insuficiente para o produto ID $idProduto. Disponível: $quantidadeAtual, Solicitado: $quantidadeComprada");
                }

                $novaQuantidade = $quantidadeAtual - $quantidadeComprada;
                $update = $pdo->prepare("UPDATE produtos SET quantidade = :novaQuantidade WHERE id = :id");
                $update->bindValue(":novaQuantidade", $novaQuantidade, PDO::PARAM_INT);
                $update->bindValue(":id", $idProduto, PDO::PARAM_INT);
                $update->execute();

                error_log("UPDATE executado. Linhas afetadas: " . $update->rowCount());

                if ($update->rowCount() === 0) {
                    error_log("Aviso: Nenhuma linha alterada no produto ID $idProduto. Quantidade pode já estar igual.");
                }

                $produtosAtualizados[] = [
                    "id" => $idProduto,
                    "titulo" => $produto["titulo"] ?? "Desconhecido",
                    "quantidadeComprada" => $quantidadeComprada,
                    "novoEstoque" => $novaQuantidade
                ];
            }
        } else {
            error_log("Categoria '$categoria' não contém produtos válidos.");
        }
    }

    if (count($produtosAtualizados) > 0) {
        $pdo->commit();
        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Compra finalizada com sucesso!",
            "produtos" => $produtosAtualizados
        ]);
    } else {
        $pdo->rollBack();
        echo json_encode([
            "erro" => "Nenhum produto foi atualizado. Verifique os dados enviados."
        ]);
    }

} catch (Exception $e) {
    $pdo->rollBack();
    error_log("Erro na compra: " . $e->getMessage());
    echo json_encode([
        "erro" => $e->getMessage()
    ]);
}
?>