class GestionSemences {

    constructor(collectionSemences) {
        this.collectionSemences = collectionSemences;
    }

    async listerSemences(id){
        return await this.collectionSemences.listerSemences(id);
    }
}

module.exports = GestionSemences;