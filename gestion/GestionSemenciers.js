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
                console.log(item.nom);
                item.nombre_semences = await this.collectionSemences.nombreSemences(item.nom);
            }
        }
        return await liste;
    }
}

module.exports = GestionSemenciers;