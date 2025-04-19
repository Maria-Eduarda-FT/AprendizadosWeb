document.addEventListener('DOMContentLoaded', function () { 
    const swiper1 = new Swiper('.swiper1', {
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

    const swiper2 = new Swiper('.swiper2', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        watchOverflow: true, // forçar a navegação/paginação
        pagination: {
            el: '.swiper-pagination2',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        },
    });

    const swiper3 = new Swiper('.swiper3', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 10,
        watchOverflow: true, // forçar a navegação/paginação
        navigation: {
            nextEl: '.swiper-button-next3',
            prevEl: '.swiper-button-prev3',
        },
        pagination: {
            el: '.swiper-pagination3',
            clickable: true,
        },
    });

    const swiper4 = new Swiper('.swiper4', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 7,
        watchOverflow: true, // forçar a navegação/paginação
        navigation: {
            nextEl: '.swiper-button-next4',
            prevEl: '.swiper-button-prev4',
        },
        pagination: {
            el: '.swiper-pagination4',
            clickable: true,
        },
    });

    const swiper5 = new Swiper('.swiper5', {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 7,
        watchOverflow: true, // forçar a navegação/paginação
        navigation: {
            nextEl: '.swiper-button-next5',
            prevEl: '.swiper-button-prev5',
        },
        pagination: {
            el: '.swiper-pagination5',
            clickable: true,
        },
    });

    
});

document.addEventListener('DOMContentLoaded', function() {
    openTab('tab1'); 
    openTab('tab6');
    openTab('tab11'); 
});
function openTab(tabId) {
    var tabCima = document.querySelectorAll('.tabCima'); 
    var tabBaixo = document.querySelectorAll('.tabBaixo'); 
    var tabCasa = document.querySelectorAll('.tabCasa'); 
    
    var tabNum = parseInt(tabId.replace('tab', ''));
    
    if (tabNum >= 1 && tabNum <= 5) {
        tabCima.forEach(function(tab) {
            tab.style.display = 'none';
        });
    } else if (tabNum >= 6 && tabNum <= 10) {
        tabBaixo.forEach(function(tab) {
            tab.style.display = 'none';
        });
    } else if (tabNum >= 11 && tabNum <= 15) {
        tabCasa.forEach(function(tab) {
            tab.style.display = 'none';
        });
    }

    var activeTab = document.getElementById(tabId);
    activeTab.style.display = 'block';
}





// function filtrar(tipo) {

//     const elemento = document.getElementById(tipo);
        
//     if (elemento) {
//         elemento.style.display = (elemento.style.display === "none") ? "block" : "none";
//     } else {
//         console.warn("Elemento não encontrado:", idElemento);
//     }

// }


