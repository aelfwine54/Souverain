const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const Semencier = require("../data/Semencier");

//TODO à rafiner plus tard pour gérer des params de recherches
router.get("/", async function(req, res) {
    const client = new MongoClient(process.env.MONGO_URI);
    const semenciersCol = client.db("souverain").collection("semenciers");
    const cursor = semenciersCol.find({});
    res.send( await cursor.toArray());
});

router.post("/", async function(req, res){
    const sem = new Semencier(req.body.nom, req.body.siteweb, req.body.adresse, req.body.fondation);
    const client = new MongoClient(process.env.MONGO_URI);
    const semenciersCol = client.db("souverain").collection("semenciers");
    await semenciersCol.insertOne(sem);
    res.status(201);
    res.send(sem);
});

module.exports = router;
