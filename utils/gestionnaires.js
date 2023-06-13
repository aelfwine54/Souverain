const MongoClient = require("mongodb").MongoClient;

const GestionSemences = require("../gestion/GestionSemences");
const GestionSemenciers = require("../gestion/GestionSemenciers");

const CollectionSemences = require("../collection/CollectionSemences");
const CollectionSemenciers = require("../collection/CollectionSemenciers");

const client = new MongoClient(process.env.MONGO_URI);

const bd = client.db("souverain");

const cSemenciers = new CollectionSemenciers(bd.collection("semenciers"));
const cSemences = new CollectionSemences(bd.collection("semences"));

const gestionnaires = {
    gSemences : new GestionSemences(cSemences),
    gSemenciers : new GestionSemenciers(cSemenciers, cSemences)
};

module.exports = gestionnaires;