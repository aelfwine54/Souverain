//const Semence = require("../data/Semence");

class CollectionSemences{

    constructor(collection) {
        this.collection = collection;
    }


    async listerSemences(id){
        if(id > -1){
            return await this.collection.find({_id : id}).toArray();
        }
        else{
            return await this.collection.find({}).toArray();
        }
    }
    
    async nombreSemences(nom){
        return await this.collection.countDocuments({nom_semencier : nom});
    }

    async existe(nom){
        const nb = await this.collection.countDocuments({nom_francais : nom});
        return nb > 0;
    }

    async ajouterSemence(semence){
        await this.collection.insertOne(semence);
        return semence;
    }
}

module.exports = CollectionSemences;