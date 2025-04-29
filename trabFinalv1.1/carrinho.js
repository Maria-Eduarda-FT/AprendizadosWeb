document.addEventListener("DOMContentLoaded", function() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let lista = document.querySelector(".carrinho ul");
    let botaoPagar = document.getElementById("pagar");

    if (!lista) {
        console.error("Elemento .carrinho ul não encontrado na página");
        return;
    }

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Seu carrinho está vazio</li>";
        botaoPagar.disabled = true;
        botaoPagar.textContent = "Carrinho vazio";
    } else {
        carrinho.forEach((produto, index) => {
            let li = document.createElement("li");
            li.classList.add("item");
            li.setAttribute("data-index", index); 

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

        atualizarEventos();
        atualizarTotal();

        botaoPagar.addEventListener("click", function () { window.location.href = "checkout.html"; });
    }
});

function atualizarEventos() {
    document.querySelectorAll(".fi-rs-minuss").forEach(botao => {
        botao.addEventListener("click", function() {
            let index = this.closest(".item").getAttribute("data-index");
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            if (carrinho[index]) {
                if (carrinho[index].quantidade > 1) {
                    carrinho[index].quantidade--;
                } else {
                    carrinho.splice(index, 1); // Remove item
                }
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                location.reload();
            }
        });
    });

    document.querySelectorAll(".fi-br-plus").forEach(botao => {
        botao.addEventListener("click", function() {
            let index = this.closest(".item").getAttribute("data-index");
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            if (carrinho[index]) {
                carrinho[index].quantidade++;
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                location.reload();
            }
        });
    });
}

function atualizarTotal() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = 0;

    carrinho.forEach(produto => {
        let preco = produto.preco.replace(/[^0-9.,]/g, '').replace(',', '.');
        total += parseFloat(preco) * produto.quantidade;
    });

    let botaoPagar = document.getElementById("pagar");
    if (botaoPagar) {
        botaoPagar.textContent = `Pagar R$ ${total.toFixed(2)}`;
    }
}
