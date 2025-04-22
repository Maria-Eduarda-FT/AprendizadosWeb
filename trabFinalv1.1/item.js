let tituloItem = "Difusor n sei q la";
let precoItem = 12.50;
let descricaoItem = "desccrição";
let butaoCompra = "Compre agora";
let AddCarrinho = "Adicionar ao Carrinho";
let imgPrincipal = "IMGS/conjVolumeBranco.jfif";

document.addEventListener("DOMContentLoaded", function () {
    const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));
  
    if (produto) {
      document.getElementById('tituloItem').innerHTML = produto.titulo;
      document.getElementById('precoItem').innerHTML = produto.preco;
      document.getElementById('descricaoItem').innerHTML = produto.descricao;
      document.getElementById('imgPrincipal').src = produto.img;
    } else {
      document.getElementById('tituloItem').innerHTML = "Produto não encontrado";
      document.getElementById('precoItem').innerHTML = "R$ 0,00";
      document.getElementById('descricaoItem').innerHTML = "Descrição indisponível.";
      document.getElementById('imgPrincipal').src = "IMGS/default.jpg"; // ou outro placeholder
    }
  });