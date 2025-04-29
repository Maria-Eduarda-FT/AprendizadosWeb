document.addEventListener("DOMContentLoaded", function() {
    const compraRapida = JSON.parse(localStorage.getItem("compraRapida"));
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    console.log("Carrinho atual:", JSON.parse(localStorage.getItem("carrinho")));
    const itensPedidoContainer = document.getElementById("itens-pedido");
    const valorTotalElement = document.getElementById("valor-total");

    function exibirItens() {
        itensPedidoContainer.innerHTML = "";
        let total = 0;

        const itens = compraRapida ? [compraRapida] : carrinho;

        if (itens.length === 0) {
            itensPedidoContainer.innerHTML = "<p>Nenhum item selecionado</p>";
            setTimeout(() => {
                alert("Nenhum item para compra. Redirecionando para a página inicial.");
                window.location.href = "index.html";
            }, 2000);
            return;
        }

        itens.forEach(produto => {
            const item = document.createElement("div");
            item.className = "item-resumo";

            let precoNumerico = parseFloat(produto.preco.replace(/[^0-9.,]/g, '').replace(',', '.'));
            let subtotal = precoNumerico * produto.quantidade;
            total += subtotal;

            item.innerHTML = `
                <img src="${produto.img}" alt="${produto.titulo}" class="item-thumb">
                <div class="item-info">
                    <h3>${produto.titulo}</h3>
                    <p>Quantidade: ${produto.quantidade}</p>
                    <p>Preço: ${produto.preco}</p>
                    <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
                </div>
            `;

            itensPedidoContainer.appendChild(item);
        });

        valorTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    exibirItens();

    document.getElementsByName("pagamento").forEach(radio => {
        radio.addEventListener("change", function() {
            document.getElementById("campos-cartao").style.display = this.value === "cartao" ? "block" : "none";
        });
    });

    const cepInput = document.getElementById("cep");
    if (cepInput) {
        cepInput.addEventListener("blur", function() {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById("endereco").value = data.logradouro;
                            document.getElementById("bairro").value = data.bairro;
                            document.getElementById("cidade").value = data.localidade;
                            document.getElementById("estado").value = data.uf;
                            document.getElementById("numero").focus();
                        }
                    })
                    .catch(error => console.error("Erro ao buscar CEP:", error));
            }
        });
    }

    document.querySelector("#botaoFinalizarCompra").addEventListener("click", function(event) {
        event.preventDefault();
        const dadosCompra = (compraRapida ? [compraRapida] : carrinho).map(produto => ({
            id: produto.id,
            quantidade: produto.quantidade
        }));
    
        console.log("Produtos para compra:", dadosCompra);
    
        fetch("finalizarCompra.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosCompra)
        })
        .then(response => { 
            console.log("Status da resposta:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Resposta do servidor:", data);
            
            if (data.sucesso) {
                alert("Compra finalizada com sucesso!");
                localStorage.removeItem("compraRapida");
                localStorage.removeItem("carrinho");
                window.location.href = "confirmacao.html";
            } else {
                alert(data.erro || "Erro ao finalizar a compra.");
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            alert("Erro ao processar a compra.");
        });
    });
});
