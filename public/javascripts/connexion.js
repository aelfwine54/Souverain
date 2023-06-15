let menuConnexionOuvert = false;

function afficheOverlay(affiche){
    const overlay = document.getElementById("overlay");
    overlay.classList.toggle("cache", affiche);
}
function afficheMenuConnexion(ouvert){
    const formConnexion = document.getElementById("form-connexion");
    const btnConnexion = document.getElementById("btn-connexion");
    formConnexion.classList.toggle("cache");
    btnConnexion.classList.toggle("choisi");
    afficheOverlay(!ouvert);
    menuConnexionOuvert = ouvert;
}

document.addEventListener("DOMContentLoaded", function() {
    const btnConnexion = document.getElementById("btn-connexion");
    btnConnexion.addEventListener("click", function() {
        afficheMenuConnexion(!menuConnexionOuvert);
    });
    const overlay = document.getElementById("overlay");
    overlay.addEventListener("click", function (){
        afficheMenuConnexion(!menuConnexionOuvert);
    });
}, false);


