document.addEventListener("DOMContentLoaded", function () {
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

  if (produto) {
    document.getElementById('tituloItem').innerHTML = produto.titulo;
    document.getElementById('precoItem').innerHTML = produto.preco;
    document.getElementById('descricaoItem').innerHTML = produto.descricao;
    document.getElementById('imgPrincipal').src = produto.img;
    
    let quantidade;
    
    if (typeof produto.quantidade === 'string' && produto.quantidade.includes('Estoque:')) {
      quantidade = parseInt(produto.quantidade.replace('Estoque:', '').trim());
    } else if (!isNaN(parseInt(produto.quantidade))) {
      quantidade = parseInt(produto.quantidade);
    } else {
      quantidade = 0;
    }
    
    const produtoAtualizado = { ...produto, quantidade };
localStorage.setItem("produtoSelecionado", JSON.stringify(produtoAtualizado));
    
    if (quantidade > 0) {
      document.getElementById('estoqueItem').innerHTML = `Disponível: ${quantidade} unidades`;
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
  }else if (!produto.id) {
    alert("Produto inválido: ID não encontrado.");
    return;
  }

  let quantidade;
  if (typeof produto.quantidade === 'string' && produto.quantidade.includes('quantidade:')) {
    quantidade = parseInt(produto.quantidade.replace('quantidade:', '').trim());
  } else if (!isNaN(parseInt(produto.quantidade))) {
    quantidade = parseInt(produto.quantidade);
  } else {
    quantidade = 0;
  }
   
  if (quantidade <= 0) {
    alert("Este produto não está disponível em estoque.");
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let produtoExistente = carrinho.find(item => item.titulo === produto.titulo);

  if (produtoExistente) { 
    if (produtoExistente.quantidade < quantidade) {
      produtoExistente.quantidade += 1;
    } else {
      alert("Quantidade máxima em estoque atingida!");
      return;
    }
  } else {
    let novoProduto = {
        id: produto.id,
        titulo: produto.titulo,
        preco: produto.preco,
        descricao: produto.descricao,
        img: produto.img,
        estoque: quantidade,   
        quantidade: 1       
    };
    carrinho.push(novoProduto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}

function comprarAgora() {
  let produto = JSON.parse(localStorage.getItem("produtoSelecionado"));
  if (!produto) {
    alert("Nenhum produto selecionado.");
    return;
  }else if (!produto.id) {
    alert("Produto inválido: ID não encontrado.");
    return;
  }

  const quantidade = produto.quantidade || 0;

  if (quantidade <= 0) {
    alert("Este produto não está disponível em estoque.");
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let produtoNoCarrinho = carrinho.find(item => item.id ? item.id === produto.id : item.titulo === produto.titulo);

  if (produtoNoCarrinho) {
    if (produtoNoCarrinho.quantidade < quantidade) {
      produtoNoCarrinho.quantidade += 1;
    } else {
      alert("Quantidade máxima em estoque atingida.");
      return;
    }
  } else {
    let novoProduto = {
      id: produto.id,
      titulo: produto.titulo,
      preco: produto.preco,
      descricao: produto.descricao,
      img: produto.img,
      estoque: quantidade,
      quantidade: 1
  };
  carrinho.push(novoProduto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "checkout.html";
}