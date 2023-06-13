const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const Semence = require("../data/Semence");

/**
 * @swagger
 * components:
 *   schemas:
 *     Semence:
 *       type: object
 *       required:
 *         - nom_francais
 *       properties:
 *         _id:
 *           type: string
 *           description: L'id auto-généré de la semence
 *         nom_francais:
 *           type: string
 *           description: Le nom en francais de la semence
 *         nom_anglais:
 *           type: string
 *           description: Le nom en anglais de la semence
 *         nom_latin:
 *           type: string
 *           description: Le nom en latin de la semence
 *         nom_semencier:
 *           type: string
 *           description: Le nom du semencier ("clé étrangère")
 *         infos:
 *           type: object
 *           properties:
 *             variete:
 *               type: string
 *               description: La varitété de la semence
 *             etiquettes:
 *               description: Les étiquettes associées
 *               type: array
 *               items:
 *                 type: string
 *             type_contenant:
 *               type : string
 *               description : Le type de contenant recommandé
 *             temps_avant_recolte:
 *               type : number
 *               description : Le temps prévu entre la plantation et la récolte
 *             temps_avant_germination:
 *               type: array
 *               items:
 *                 type: number
 *               description : L'intervalle de temps entre la plantation et la germination. [min, max]
 *             description:
 *               type : string
 *               description : Le texte sur le paquet de semence
 *             instructions:
 *               type : string
 *               description : Les instructions de plantation textuelles données sur l'emballage
 *             prix_vente:
 *               type : float
 *               description : Le prix de vente
 *             profondeur_semence:
 *               type : object
 *               properties:
 *                 pouces:
 *                   type: string
 *                   description : La profondeur de la semence en pouce (généralement une fraction)
 *                 mm:
 *                   type : number
 *                   description : La profondeur de la semence en millimètre
 *             distance_semences:
 *               type : object
 *               properties:
 *                 pouces:
 *                   type: string
 *                   description : La distance entre les semences en pouce (généralement une fraction)
 *                 mm:
 *                   type : number
 *                   description : La distance entre les semences en millimètre
 *             distance_plants:
 *               type : object
 *               properties:
 *                 pouces:
 *                   type: string
 *                   description : La distance entre les plants en pouce (généralement une fraction)
 *                 cm:
 *                   type : number
 *                   description : La distance entre les plants en centimètre
 *             distance_rangs:
 *               type : object
 *               properties:
 *                 pouces:
 *                   type: string
 *                   description : La distance entre les rangs en pouce (généralement une fraction)
 *                 cm:
 *                   type : number
 *                   description : La distance entre les rangs en centimètre
 *             hauteur_plants:
 *               type : object
 *               properties:
 *                 pouces:
 *                   type: string
 *                   description : La hauteur de la plante en pouces
 *                 cm:
 *                   type : number
 *                   description : La hauteur de la plante en centimètre
 *             code_fabriquant:
 *               type : object
 *               properties:
 *                 nom_code:
 *                   type: string
 *                   description : Le nom (ou type) du code
 *                 code:
 *                   type : string
 *                   description : Le code de produit
 *             moment_recolte:
 *               type : object
 *               properties:
 *                 mois:
 *                   type: string
 *                   description : Le mois de la récolte
 *                 annee:
 *                   type : number
 *                   description : L'année de la récolte
 *                 jour:
 *                   type : number
 *                   description : Le jour de la récolte
 */

/**
 * @swagger
 * tags:
 *   name: Semences
 *   description: L'API pour gérer les semences
 * /api/semences:
 *   get:
 *     summary : Récupérer la liste des semences
 *     tags: [Semences]
 *     responses:
 *       200:
 *         description: Une liste de semences.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Semence'
 *       500:
 *         description: Some server error
 *
 */

//TODO à rafiner plus tard pour gérer des params de recherches
router.get("/", async function(req, res) {
    const client = new MongoClient(process.env.MONGO_URI);
    const semencesCol = client.db("souverain").collection("semences");
    const cursor = semencesCol.find({});
    res.send( await cursor.toArray());
});

/**
 * @swagger
 * tags:
 *   name: Semences
 *   description: L'API pour gérer les semences
 * /api/semences:
 *   post:
 *     summary: Ajouter une nouvelle semence
 *     tags: [Semences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semence'
 *     responses:
 *       201:
 *         description: La semence créée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Semence'
 *       500:
 *         description: Some server error
 */

// TODO Donner un warning si le semenciers n'existe pas
router.post("/", async function(req, res){
    const sem = new Semence(req.body.nom_francais, req.body.nom_anglais, req.body.nom_latin, req.body.nom_semencier, req.body.infos);
    const client = new MongoClient(process.env.MONGO_URI);
    const semenciersCol = client.db("souverain").collection("semences");
    await semenciersCol.insertOne(sem);
    res.status(201);
    res.send(sem);
});

module.exports = router;
