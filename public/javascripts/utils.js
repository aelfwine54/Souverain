function afficheOverlay(affiche){
    const overlay = document.getElementById("overlay");
    overlay.classList.toggle("cache", affiche);
}

let menuOuvert, btnActif;

function afficheMenu(menu, bouton){
    menu.classList.toggle("cache");
    bouton.classList.toggle("choisi");
    menuOuvert = menu;
    btnActif = bouton;
}

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById("overlay");
    const btnInscription = document.getElementById("btn-inscription");
    const btnConnexion = document.getElementById("btn-connexion");
    
    btnInscription.addEventListener("click", function() {
        if(menuOuvert === undefined){
            afficheMenu(document.getElementById("form-inscription"), btnInscription);
            afficheOverlay(false);
        }
        else{
            overlay.click();
        }
    });
    
    btnConnexion.addEventListener("click", function() {
        if(menuOuvert === undefined){
            afficheMenu(document.getElementById("form-connexion"), btnConnexion);
            afficheOverlay(false);
        }
        else{
            overlay.click();
        }
    });
    
    overlay.addEventListener("click", function (){
        afficheMenu(menuOuvert, btnActif);
        menuOuvert = undefined;
        btnActif = undefined;
        afficheOverlay(true);
    });
}, false);
