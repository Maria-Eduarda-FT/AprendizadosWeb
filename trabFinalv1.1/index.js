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
                                <div class="quantidade">Estoque: ${produto.quantidade || 'Indisponível'}</div>
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
    });

    new Swiper('.swiper3', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination3',
            clickable: true,
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
    });

    new Swiper('.swiper5', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination5',
            clickable: true,
        },
    });
}

document.addEventListener('click', function(e) {
    const cardProduto = e.target.closest('.card-produto');
    if (cardProduto) {
        const id = cardProduto.getAttribute('data-produto-id');
        const img = cardProduto.querySelector("img").src;
        const titulo = cardProduto.querySelector(".tituloItem").innerText;
        const descricao = cardProduto.querySelector(".descricaoItem").innerText;
        const preco = cardProduto.querySelector(".preco-final").innerText;
        const quantidade = cardProduto.querySelector(".quantidade")?.innerText || 'Indisponível';  
        
        localStorage.setItem("produtoSelecionado", JSON.stringify({
            id: id,
            img: img,
            titulo: titulo,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade
        }));
        console.log("Produtos para compra:", JSON.parse(localStorage.getItem("produtoSelecionado")));
        window.location.href = "item.html";
    }
});

function filtrarProdutos(categoria, event) {
    const e = event || window.event;
    const secaoAtual = e.target.closest('section');
    const swiperContainer = secaoAtual.querySelector('.swiper');
    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';
    
    fetch('listarItem.php')
        .then(response => response.json())
        .then(produtosPorCategoria => {
            let produtosParaMostrar = [];
            const sectionId = secaoAtual.id;
            
            if (categoria === 'todos') {
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
                if (produtosPorCategoria[categoria]) {
                    produtosParaMostrar = produtosPorCategoria[categoria];
                }
            }
            
            // renderizar os produtos filtrados
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
                                <div class="quantidade">Estoque: ${produto.quantidade || 'Indisponível'}</div>
                                <span class="preco-final">R$${produto.preco}</span>
                            </div>
                        </div>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });
            
            if (swiperContainer.swiper) {
                swiperContainer.swiper.destroy(true, true);
            }
            
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
            
            new Swiper(swiperContainer, swiperConfig);
        })
        .catch(error => {
            console.error('Erro ao filtrar produtos:', error);
        });
}

const allNavLinks = document.querySelectorAll('.nav__link');
const allLights = document.querySelectorAll('.nav__light');

function moveLight(target) {
    const parentLi = target.closest('.nav__link');
    const light = parentLi?.parentElement.querySelector('.nav__light');
    if (parentLi && light) {
        light.style.left = `${parentLi.offsetLeft}px`;
        light.style.width = `${parentLi.offsetWidth}px`;
    }
}

function activeLink(linkActive) {
    const sectionLinks = linkActive.closest('ul').querySelectorAll('.nav__link');
    sectionLinks.forEach(link => link.classList.remove('active'));
    linkActive.classList.add('active');
}

allNavLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        moveLight(event.currentTarget);
        activeLink(event.currentTarget);
    });
});