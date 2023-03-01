const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;


router.get("/", async function(req, res) {
    const client = new MongoClient(process.env.MONGO_URI);
    const semenciersCol = client.db("souverain").collection("semenciers");
    const cursor = semenciersCol.find({});
    res.send( await cursor.toArray());
});

module.exports = router;
