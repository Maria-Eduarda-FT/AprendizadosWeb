document.addEventListener('DOMContentLoaded', () => {
    fetch('listarItem.php')
    .then(response => response.json())
    .then(produtosPorCategoria => {
         console.log(produtosPorCategoria); // pra testar se veio certinho

        for (const categoria in produtosPorCategoria) {
            const produtos = produtosPorCategoria[categoria];
            produtos.forEach(produto => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <div class="card-produto" data-produto-id="${produto.id}">
                        <img src="${produto.imagem}" alt="Produto">
                        <div class="detalhes">
                            <h4 class="tituloItem">${produto.titulo}</h4>
                            <span class="descricaoItem">${produto.descricao}</span>
                            <div class="precos">
                                <span class="preco-final">R$${produto.preco}</span>
                            </div>
                        </div>
                    </div>
                `;

                document.querySelector('.swiper1 .swiper-wrapper').appendChild(slide.cloneNode(true));

                const categoriaFormatada = categoria.toLowerCase();

                if (['amadeirado', 'citrico', 'floral', 'adocicado'].includes(categoriaFormatada)) {
                    document.querySelector('.swiper2 .swiper-wrapper').appendChild(slide.cloneNode(true));
                }
                else if (['escritorio', 'sala de estar', 'cozinha', 'lavabo'].includes(categoriaFormatada)) {
                    document.querySelector('.swiper3 .swiper-wrapper').appendChild(slide.cloneNode(true));
                }
                else if (['vela', 'bandeija', 'toalha', 'tapete'].includes(categoriaFormatada)) {
                    document.querySelector('.swiper4 .swiper-wrapper').appendChild(slide.cloneNode(true));
                }
                else if (categoriaFormatada === 'difusor') {
                    document.querySelector('.swiper5 .swiper-wrapper').appendChild(slide.cloneNode(true));
                }
            });
        }

        inicializaSwipers();
    })
});

function inicializaSwipers() {
    new Swiper('.swiper1', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1',
        },
        pagination: {
            el: '.swiper-pagination1',
            clickable: true,
        },
    });

    new Swiper('.swiper2', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination2',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        },
    });

    new Swiper('.swiper3', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination3',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next3',
            prevEl: '.swiper-button-prev3',
        },
    });

    new Swiper('.swiper4', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination4',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next4',
            prevEl: '.swiper-button-prev4',
        },
    });

    new Swiper('.swiper5', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination5',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next5',
            prevEl: '.swiper-button-prev5',
        },
    });
}

document.addEventListener('click', function(e) {
    const cardProduto = e.target.closest('.card-produto');
    if (cardProduto) {
        const img = cardProduto.querySelector("img").src;
        const titulo = cardProduto.querySelector(".tituloItem").innerText;
        const descricao = cardProduto.querySelector(".descricaoItem").innerText;
        const preco = cardProduto.querySelector(".preco-final").innerText;
        
        localStorage.setItem("produtoSelecionado", JSON.stringify({
            img,
            titulo,
            descricao,
            preco
        }));
        
        window.location.href = "item.html";
    }
});

function filtrarProdutos(categoria, event) {
    const e = event || window.event;
    const secaoAtual = e.target.closest('section');
    const swiperContainer = secaoAtual.querySelector('.swiper');
    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    
    // Limpa o conteúdo atual
    swiperWrapper.innerHTML = '';
    
    fetch('listarItem.php')
        .then(response => response.json())
        .then(produtosPorCategoria => {
            let produtosParaMostrar = [];
            const sectionId = secaoAtual.id;
            
            // Determinar quais produtos mostrar com base na categoria e seção
            if (categoria === 'todos') {
                // Mostrar todos os produtos da seção
                if (sectionId === 'aromas') {
                    ['amadeirado', 'citrico', 'floral', 'adocicado'].forEach(cat => {
                        if (produtosPorCategoria[cat]) {
                            produtosParaMostrar = produtosParaMostrar.concat(produtosPorCategoria[cat]);
                        }
                    });
                } else if (sectionId === 'ambientes') {
                    ['escritorio', 'sala de estar', 'cozinha', 'lavabo'].forEach(cat => {
                        if (produtosPorCategoria[cat]) {
                            produtosParaMostrar = produtosParaMostrar.concat(produtosPorCategoria[cat]);
                        }
                    });
                } else if (sectionId === 'paraCasa') {
                    ['vela', 'bandeija', 'toalha', 'tapete'].forEach(cat => {
                        if (produtosPorCategoria[cat]) {
                            produtosParaMostrar = produtosParaMostrar.concat(produtosPorCategoria[cat]);
                        }
                    });
                }
            } else {
                // Mostrar apenas produtos da categoria específica
                if (produtosPorCategoria[categoria]) {
                    produtosParaMostrar = produtosPorCategoria[categoria];
                }
            }
            
            // Renderizar os produtos filtrados
            produtosParaMostrar.forEach(produto => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <div class="card-produto" data-produto-id="${produto.id}">
                        <img src="${produto.imagem}" alt="Produto">
                        <div class="detalhes">
                            <h4 class="tituloItem">${produto.titulo}</h4>
                            <span class="descricaoItem">${produto.descricao}</span>
                            <div class="precos">
                                <span class="preco-final">R$${produto.preco}</span>
                            </div>
                        </div>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });
            
            // Destruir o Swiper existente se ele existir
            if (swiperContainer.swiper) {
                swiperContainer.swiper.destroy(true, true);
            }
            
            // Configurações comuns para todos os Swipers
            const swiperConfig = {
                loop: true,
                slidesPerView: 5,
                spaceBetween: 10,
                pagination: {
                    el: swiperContainer.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperContainer.querySelector('.swiper-button-next'),
                    prevEl: swiperContainer.querySelector('.swiper-button-prev'),
                },
            };
            
            // Inicializar o novo Swiper
            new Swiper(swiperContainer, swiperConfig);
        })
        .catch(error => {
            console.error('Erro ao filtrar produtos:', error);
        });
}