document.addEventListener("DOMContentLoaded", function () {
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

  if (produto) {
    document.getElementById('tituloItem').innerHTML = produto.titulo;
    document.getElementById('precoItem').innerHTML = produto.preco;
    document.getElementById('descricaoItem').innerHTML = produto.descricao;
    document.getElementById('imgPrincipal').src = produto.img;
    
    let quantidadeDisponivel;
    
    if (typeof produto.quantidadeDisponivel === 'string' && produto.quantidadeDisponivel.includes('Estoque:')) {
      quantidadeDisponivel = parseInt(produto.quantidadeDisponivel.replace('Estoque:', '').trim());
    } else if (!isNaN(parseInt(produto.quantidadeDisponivel))) {
      quantidadeDisponivel = parseInt(produto.quantidadeDisponivel);
    } else {
      quantidadeDisponivel = 0;
    }
    
    produto.quantidadeDisponivel = quantidadeDisponivel;
    localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
    
    // Exibir na página
    if (quantidadeDisponivel > 0) {
      document.getElementById('estoqueItem').innerHTML = `Disponível: ${quantidadeDisponivel} unidades`;
    } else {
      document.getElementById('estoqueItem').innerHTML = "Estoque indisponível";
    }
  } else {
    document.getElementById('tituloItem').innerHTML = "Produto não encontrado";
    document.getElementById('precoItem').innerHTML = "R$ 0,00";
    document.getElementById('descricaoItem').innerHTML = "Descrição indisponível.";
    document.getElementById('imgPrincipal').src = "IMGS/conjVolumeBranco.jfif";
    document.getElementById('estoqueItem').innerHTML = "Estoque não disponível";
  }

  const botaoCarrinho = document.querySelector(".add-carrinho");
  if (botaoCarrinho) {
    botaoCarrinho.addEventListener("click", addCarrinho);
  } else {
    console.warn("Botão de adicionar ao carrinho não encontrado.");
  }
  const botaoCompra = document.querySelector(".botaoCompra");
  if (botaoCompra) {
    botaoCompra.addEventListener("click", comprarAgora);
  } else {
    console.warn("Botão de compra agora não encontrado.");
  }
});

function addCarrinho() {
  let produto = JSON.parse(localStorage.getItem("produtoSelecionado"));
  if (!produto) {
      alert("Nenhum produto selecionado.");
      return;
  }

  let quantidadeDisponivel;
  if (typeof produto.quantidadeDisponivel === 'string' && produto.quantidadeDisponivel.includes('Estoque:')) {
    quantidadeDisponivel = parseInt(produto.quantidadeDisponivel.replace('Estoque:', '').trim());
  } else if (!isNaN(parseInt(produto.quantidadeDisponivel))) {
    quantidadeDisponivel = parseInt(produto.quantidadeDisponivel);
  } else {
    quantidadeDisponivel = 0;
  }
   
  if (quantidadeDisponivel <= 0) {
    alert("Este produto não está disponível em estoque.");
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let produtoExistente = carrinho.find(item => item.titulo === produto.titulo);

  if (produtoExistente) { 
    if (produtoExistente.quantidade < quantidadeDisponivel) {
      produtoExistente.quantidade += 1;
    } else {
      alert("Quantidade máxima em estoque atingida!");
      return;
    }
  } else { 
    produto.quantidade = 1;
    produto.quantidadeDisponivel = quantidadeDisponivel;
    carrinho.push(produto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}

function comprarAgora() {
  let produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

  if (!produto) {
    alert("Nenhum produto selecionado.");
    return;
  }

  const quantidadeDisponivel = produto.quantidadeDisponivel || 0;

  if (quantidadeDisponivel <= 0) {
    alert("Este produto não está disponível em estoque.");
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let produtoNoCarrinho = carrinho.find(item => item.id ? item.id === produto.id : item.titulo === produto.titulo);

  if (produtoNoCarrinho) {
    if (produtoNoCarrinho.quantidade < quantidadeDisponivel) {
      produtoNoCarrinho.quantidade += 1;
    } else {
      alert("Quantidade máxima em estoque atingida.");
      return;
    }
  } else {
    produto.quantidade = 1;
    carrinho.push(produto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "checkout.html";
}