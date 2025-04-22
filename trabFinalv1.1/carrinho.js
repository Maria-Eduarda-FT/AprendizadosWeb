document.querySelectorAll('.item').forEach(item => {
    const btnMais = item.querySelector('.fi-br-plus');
    const btnMenos = item.querySelector('.fi-rs-minuss');
    const spanQntd = item.querySelector('.qntdItem');
    const precoItem = item.querySelector('.precoItem');

    let precoUnitario = parseFloat(precoItem.textContent.replace("R$", "").replace(",", "."));
    let quantidade = parseInt(spanQntd.textContent);
    let id = item.getAttribute('data-id-produto');

    btnMais.addEventListener('click', () => {
        fetch(`banco.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (quantidade < data.quantidade) {
                    quantidade++;
                    spanQntd.textContent = quantidade;
                    atualizarTotal();
                } else {
                    alert("Quantidade máxima disponível atingida!");
                }
            });
    });

    btnMenos.addEventListener('click', () => {
        if (quantidade > 1) {
            quantidade--;
            spanQntd.textContent = quantidade;
            atualizarTotal();
        }
    });

    function atualizarTotal() {
        let total = 0;
        document.querySelectorAll('.item').forEach(item => {
            let preco = parseFloat(item.querySelector('.precoItem').textContent.replace("R$", "").replace(",", "."));
            let qntd = parseInt(item.querySelector('.qntdItem').textContent);
            total += preco * qntd;
        });
        document.getElementById('pagar').textContent = `Pagar R$${total.toFixed(2).replace(".", ",")}`;
    }

    atualizarTotal();
});
 
document.getElementById('pagar').addEventListener('click', () => {
    let itens = [];

    document.querySelectorAll('.item').forEach(item => {
        itens.push({
            id_produto: item.getAttribute('data-id-produto'),
            quantidade: parseInt(item.querySelector('.qntdItem').textContent)
        });
    });

    fetch('finalizar_compra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itens: itens })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            alert('Compra realizada com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Erro: ' + data.mensagem);
        }
    });
});
