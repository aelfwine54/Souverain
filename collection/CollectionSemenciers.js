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
}

module.exports = CollectionSemenciers;