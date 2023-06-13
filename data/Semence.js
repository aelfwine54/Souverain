class Semence{
    constructor(nom_francais, nom_anglais, nom_latin, nom_semencier, infos) {
        this.nom_francais = nom_francais;
        this.nom_latin = nom_latin;
        this.nom_semencier = nom_semencier;
        this.infos = infos;
        this.nom_anglais = nom_anglais;
    }
}

module.exports = Semence;