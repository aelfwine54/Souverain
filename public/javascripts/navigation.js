

/**
 * Fonction qui va provoquer l'appel de la fonction racine du script propre à la page qui vient d'être chargée.
 */
function chargerSousContenu(){
    const nom = "charger" + location.hash.replace("#/", "");
    console.log("Appel de la fonction: " + nom);
    window[nom]();
}

/**
 * Fonction que remplace le contenu intérieur de la balise ayant pour id @idElement par le contenu de @contenu.
 * @param idElement ID de la balise dont on veut remplacer le contenu.
 * @param contenu Contenu qui va remplacer l'ancient.
 */
function remplacerContenu(idElement, contenu){
    const sanitizer1 = new Sanitizer(); //retire les scripts qui risqueraient d'être injecté
    const wrapper = document.getElementById(idElement);
    wrapper.setHTML(contenu, { sanitizer : sanitizer1 });
    chargerSousContenu();
}

/**
 * Fonction pour gérer la navigation entre les pages. Vous ne devriez pas avoir besoin de la modifier
 * @returns {Promise<void>} Ne retourne rien
 */
async function hashHandler() {
    //La page voulu apparaitra dans le hash (ce qui suit le # dans la barre d'adresse
    const hash = location.hash;
    console.log("Le hash est: " + hash);

    if (!hash.includes("/")){
        console.log("Le hash est une ancre, ne rien faire");
        return;
    }
    //On crée le lien vers le contenu qu'on veut charger
    const addr = "/html" + hash.replace("#", "");
    console.log("L'adresse du contenu est: " + addr);
    try{
        //On récupère la page sur le serveur
        const reponse = await fetch(addr);
        //C'est asynchrone, alors on doit attendre que la page arrive. Puis on va la placer au coeur de l'affichage
        if(reponse.ok){
            const contenu = await reponse.text();
            remplacerContenu("corps-principal", contenu);
        }
    }
    catch(erreur){
        console.log(erreur.message);
    }
}

//La navigation se fait en utilisant les hash. Il faut donc surveiller l'événement qui dit que le hash a changé.
window.addEventListener("hashchange", hashHandler, false);

/**
 * Il se peut qu'on manque l'événement de window hashchange, alors on met aussi notre appel sur DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function(){
    void hashHandler();
}, false);