document.addEventListener("DOMContentLoaded", function () {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let lista = document.querySelector(".carrinho ul");
    
    if (lista) {
        lista.innerHTML = "";
        
        if (carrinho.length === 0) {
            lista.innerHTML = "<li>Seu carrinho está vazio</li>";
        } else {
            carrinho.forEach((produto, index) => {
                let li = document.createElement("li");
                li.classList.add("item");
                li.setAttribute("data-id-produto", index);
                
                li.innerHTML = `
                    <div class="imagem">
                        <img class="img img-fluid" src="${produto.img}" alt="">
                    </div>
                    <div class="info">
                        <h4 class="tituloItem">${produto.titulo}</h4>
                        <div class="status">
                            <span class="statusItem">Disponível</span>
                        </div>
                        <div class="preco">
                            <p class="precoItem">${produto.preco}</p>
                            <div class="contador">
                                <i class="fi fi-rs-minuss"></i>
                                <span class="qntdItem">${produto.quantidade}</span>
                                <i class="fi fi-br-plus"></i>
                            </div>
                        </div>
                    </div>
                `;
                
                lista.appendChild(li);
            });
        }
        
        atualizarEventos();
    } else {
        console.error("Elemento .carrinho ul não encontrado na página");
    }
});

function atualizarEventos() {
    document.querySelectorAll(".fi-rs-minuss").forEach(botao => {
        botao.addEventListener("click", function () {
            let index = this.closest(".item").getAttribute("data-id-produto");
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            
            if (carrinho[index]) {
                if (carrinho[index].quantidade > 1) {
                    carrinho[index].quantidade--;
                } else {
                    carrinho.splice(index, 1); // remove item se qntd = 1
                }
                
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                location.reload();
            }
        });
    });

    document.querySelectorAll(".fi-br-plus").forEach(botao => {
        botao.addEventListener("click", function () {
            let index = this.closest(".item").getAttribute("data-id-produto");
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            
            if (!carrinho[index]) {
                console.error("Item não encontrado no carrinho");
                return;
            }
            
            let quantidadeAtual = carrinho[index].quantidade || 0;
            let quantidadeDisponivel;
             
            if (carrinho[index].quantidadeDisponivel !== undefined) {
                quantidadeDisponivel = parseInt(carrinho[index].quantidadeDisponivel);
                
                if (quantidadeAtual < quantidadeDisponivel) {
                    carrinho[index].quantidade = quantidadeAtual + 1;
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));
                    location.reload();
                } else {
                    alert("Quantidade máxima em estoque atingida!");
                }
            } else {
                fetch('item.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        titulo: carrinho[index].titulo
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.quantidade) {
                        quantidadeDisponivel = parseInt(data.quantidade);
                        
                        if (quantidadeAtual < quantidadeDisponivel) {
                            carrinho[index].quantidade = quantidadeAtual + 1;
                            carrinho[index].quantidadeDisponivel = quantidadeDisponivel;
                            localStorage.setItem("carrinho", JSON.stringify(carrinho));
                            location.reload();
                        } else {
                            alert("Quantidade máxima em estoque atingida!");
                        }
                    } else {
                        alert("Não foi possível verificar o estoque disponível");
                    }
                })
                .catch(error => {
                    console.error('Erro ao verificar estoque:', error);
                    alert("Erro ao verificar o estoque. Por favor, tente novamente.");
                });
            }
        });
    });
     
    const botaoFinalizar = document.querySelector(".finalizar-compra");
    if (botaoFinalizar) {
        botaoFinalizar.addEventListener("click", function() { 
            alert("Pedido finalizado com sucesso!");
            localStorage.removeItem("carrinho");  
            location.reload();
        });
    }
}
 
function atualizarTotal() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = 0;
    
    carrinho.forEach(produto => {
        //remove símbolos como R$ e converter para número
        let preco = produto.preco.replace(/[^0-9.,]/g, '').replace(',', '.');
        total += parseFloat(preco) * produto.quantidade;
    });
    
    const elementoTotal = document.querySelector(".total-carrinho");
    if (elementoTotal) {
        elementoTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    atualizarTotal();
});