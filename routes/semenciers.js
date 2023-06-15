const express = require("express");
const router = express.Router();
const Semencier = require("../data/Semencier");

const gSemenciers = require("../utils/gestionnaires").gSemenciers;

/**
 * @swagger
 * components:
 *   schemas:
 *     Semencier:
 *       type: object
 *       required:
 *         - nom
 *         - contact
 *       properties:
 *         _id:
 *           type: string
 *           description: L'id auto-généré du semencier
 *         nom:
 *           type: string
 *           description: Le nom du semencier
 *         fondation:
 *           type: int
 *           description: L'année de fondation de la compagnie
 *         contact:
 *           type: object
 *           description : Informations de contact du semencier
 *           properties:
 *             site_web:
 *               type : string
 *               description : L'adresse du site web de la compagnie
 *             courriel:
 *               type : string
 *               format : email
 *               description : L'adresse courriel de la compagnie
 *             telephone:
 *               type : string
 *               description : Le numéro de téléphone de la compagnie
 *             telecopieur:
 *               type : string
 *               description : Le numéro de télécopieur de la compagnie
 *             adresse_postale:
 *               type : object
 *               properties:
 *                 code_postal:
 *                   type : string
 *                 numero:
 *                   type : string
 *                 pays:
 *                   type : string
 *                 province:
 *                   type : string
 *                 rue:
 *                   type : string
 *                 ville:
 *                   type : string
 *         nombre_semences:
 *           type : integer
 *           description : Le nombre de types de semences offertes par la compagnie

 *       example:
 *         _id: d5fE_asz
 *         nom: McKenzie
 *         fondation: 1896
 *         contact:
 *           site_web : www.aaa.com
 *           courriel : bbb@aaa.com
 *           telephone : 888-444-5545
 *           telecopieur : 889-444-5545
 *           adresse_postale :
 *             numero : 25
 *             rue : rue Droite
 *             ville : St-Poils
 *             province : Québec
 *             pays : Canada
 *             code_postal : G1Q 3V3 
 */

/**
 * @swagger
 * tags:
 *   name: Semenciers
 *   description: L'API pour gérer les semenciers
 * /api/semenciers:
 *   get:
 *     summary : Récupérer la liste des semenciers
 *     tags: [Semenciers]
 *     responses:
 *       200:
 *         description: Une liste de semenciers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Semencier'
 *       500:
 *         description: Some server error
 *
 */

//TODO à rafiner plus tard pour gérer des params de recherches
router.get("/", async function(req, res) {
    res.send( await gSemenciers.listerSemenciers(-1, true));
});

/**
 * @swagger
 * tags:
 *   name: Semenciers
 *   description: L'API pour gérer les semenciers
 * /api/semenciers:
 *   post:
 *     summary: Ajouter un nouveau semencier
 *     tags: [Semenciers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semencier'
 *     responses:
 *       200:
 *         description: Le semencier créé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Semencier'
 *       500:
 *         description: Some server error
 */

router.post("/", async function(req, res){
    const sem = new Semencier(req.body.nom, req.body.contact, req.body.fondation);
    //TODO tenir compte des autres champs possibles
    const reponse = await gSemenciers.ajouterSemencier(sem);
    if (reponse.nouveau){
        res.status(201);
        res.send(reponse.nouveau);
    }
    else{
        res.status(reponse.code);
        res.send(reponse.message);
    }

});

module.exports = router;
