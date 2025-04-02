let tituloItem = "Difusor n sei q la";
let precoItem = 12.50;
let descricaoItem = "desccrição";
let butaoCompra = "Compre agora";
let AddCarrinho = "Adicionar ao Carrinho";
let imgPrincipal = "IMGS/conjVolumeBranco.jfif";

document.addEventListener("DOMContentLoaded", function Carrega(){
    document.getElementById('tituloItem').innerHTML = tituloItem;
    document.getElementById('precoItem').innerHTML = precoItem;
    document.getElementById('descricaoItem').innerHTML = descricaoItem;
    document.getElementById('imgPrincipal').src = imgPrincipal;
});