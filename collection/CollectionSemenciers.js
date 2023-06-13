//const Semencier = require("../data/Semencier");

class CollectionSemenciers{
    
    constructor(collection) {
        this.collection = collection;
    }
    
    
    async listerSemenciers(id){
        if(id > -1){
            return await this.collection.find({_id : id}).toArray();
        }
        else{
            return await this.collection.find({}).toArray();
        }
    }

    async ajouterSemencier(semencier){
        await this.collection.insertOne(semencier);
        return semencier;
    }

    async existe(nom){
        const nb = await this.collection.countDocuments({nom : nom});
        return nb > 0;
    }
}

module.exports = CollectionSemenciers;