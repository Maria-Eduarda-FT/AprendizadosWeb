<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <title>Configurações</title>
</head>
<body>
    <div class="container">
        <div class="row">
        <?php 
            include "conexao.php";

            $tituloItem = $_POST['tituloItem'];
            $descricaoItem = $_POST['descricaoItem'];
            $categoria = $_POST['categoria'];
            $precoItem = $_POST['precoItem'];
            $qntdItem = $_POST['qntdItem'];

            // config upload da imagem
            $imagemNome = $_FILES['imagemItem']['name'];
            $imagemTmp = $_FILES['imagemItem']['tmp_name'];
            $caminhoDestino = 'IMGS/' . $imagemNome;

            if (move_uploaded_file($imagemTmp, $caminhoDestino)) {
                $sql = "INSERT INTO produtos (titulo, descricao, imagem, categoria, preco, quantidade) 
                        VALUES (:titulo, :descricao, :imagem, :categoria, :preco, :quantidade)";
                
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':titulo', $tituloItem);
                $stmt->bindParam(':descricao', $descricaoItem);
                $stmt->bindParam(':imagem', $caminhoDestino);
                $stmt->bindParam(':categoria', $categoria);
                $stmt->bindParam(':preco', $precoItem);
                $stmt->bindParam(':quantidade', $qntdItem);
                
                if ($stmt->execute()) {
                    echo "$tituloItem cadastrado com sucesso!";
                } else {
                    echo "Erro ao cadastrar no banco: " . $stmt->errorInfo()[2];
                }
            } else {
                echo "Falha ao fazer upload da imagem.";
            }
            ?>
            
        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>

</body>
</html>