document.addEventListener("DOMContentLoaded", function () {
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

    //global
    window.swiper2 = swiper2;
    window.swiper3 = swiper3;
});


document.addEventListener('DOMContentLoaded', function() {
    openTab('tab1'); 
    openTab('tab6'); 
});
function openTab(tabId) {
    var tabCima = document.querySelectorAll('.tabCima'); 
    var tabBaixo = document.querySelectorAll('.tabBaixo');  
    if (tabId<="tab5"){
        tabCima.forEach(function(tab) {
        tab.style.display = 'none';
    });
    } else{
        tabBaixo.forEach(function(tab) {
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


