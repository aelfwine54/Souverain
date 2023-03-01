const express = require("express");
const path = require("path");

const router = express.Router();
const folder = "public/html";

/**
 * Cette classe sert à retourner les pages HTML.
 */
router.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/../"+folder+"/accueil.html"));
});


module.exports = router;