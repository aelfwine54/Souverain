//const Semence = require("../data/Semence");

class CollectionSemences{

    constructor(collection) {
        this.collection = collection;
    }


    async listerSemences(id){
        if(id > -1){
            return await this.collection.find({});
        }
        else{
            return await this.collection.find({_id : id});
        }
    }
    
    async nombreSemences(nom){
        return await this.collection.countDocuments({nom_semencier : nom});
    }
}

module.exports = CollectionSemences;