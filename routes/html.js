const express = require("express");
const path = require("path");

const router = express.Router();
const folder = "public/html";

const gSemenciers = require("../utils/gestionnaires").gSemenciers;
const gSemences = require("../utils/gestionnaires").gSemences;

/**
 * Cette classe sert à retourner les pages HTML.
 */
router.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/../"+folder+"/accueil.html"));
});

router.get("/semenciers", async function(req, res){
    const liste = await gSemenciers.listerSemenciers(-1, true);
    res.render("semenciers", {semenciers : liste});
});

router.get("/plantes", async function(req, res){
    const liste = await gSemences.listerSemences(-1);
    res.render("plantes", {plantes : liste});
});


module.exports = router;