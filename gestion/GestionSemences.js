class GestionSemences {

    constructor(collectionSemences) {
        this.collectionSemences = collectionSemences;
    }

    async listerSemences(id){
        return await this.collectionSemences.listerSemences(id);
    }

    async ajouterSemence(semence){
        if (await this.collectionSemences.existe(semence.nom_francais)){
            return { "code" : 400, "message" : " La semence existe déjà"};
        }
        return {"nouveau" : await this.collectionSemences.ajouterSemence(semence)};
    }
}

module.exports = GestionSemences;