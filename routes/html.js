const express = require("express");
const path = require("path");

const router = express.Router();
const folder = "public/html";

const MongoClient = require("mongodb").MongoClient;

/**
 * Cette classe sert à retourner les pages HTML.
 */
router.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/../"+folder+"/accueil.html"));
});

router.get("/semenciers", async function(req, res){
    const client = new MongoClient(process.env.MONGO_URI);
    const semenciersCol = client.db("souverain").collection("semenciers");
    const cursor = semenciersCol.find({});
    const liste = await cursor.toArray();
    res.render("semenciers", {semenciers : liste});
});


module.exports = router;