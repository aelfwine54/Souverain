class GestionSemenciers {
    
    constructor(collectionSemenciers, collectionSemences) {
        this.collectionSemenciers = collectionSemenciers;
        this.collectionSemences = collectionSemences;
    }
    
    async listerSemenciers(id, avecNbSemences){
        const liste = await this.collectionSemenciers.listerSemenciers(id);
        
        if( avecNbSemences){
            for (const index in liste){
                const item = liste[index];
                item.nombre_semences = await this.collectionSemences.nombreSemences(item.nom);
            }
        }
        return await liste;
    }

    async ajouterSemencier(semencier){
        if (await this.collectionSemenciers.existe(semencier.nom)){
            return { "code" : 400, "message" : " Le semencier existe déjà."};
        }
        if (Object.keys(semencier.contact).length === 0){
            return { "code" : 400, "message" : "Au moins un moyen de contact doit être donné."};
        }
        return {"nouveau" : await this.collectionSemenciers.ajouterSemencier(semencier)};
    }
}

module.exports = GestionSemenciers;