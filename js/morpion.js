/**
 * Fichier JS pour le Morpion
 * @author Julien
 */
var grille = [];
var proba = [];

var winnerId = '';
var gameIsFinish = false;
var wait = false;

initGrille();
initProba();
drawGrille();
drawProba();

/**
 * Initialize les lignes et colonnes
 * de la grille de départ.
 * i = ligne
 * j = colonne
 */
function initGrille(){
    for(var i = 0; i < 3; i++){
        grille[i] = new Array('', '', '');
        proba[i] = new Array('', '', '');
    }
}

/**
 * Permet d'initialiser les probas pour chaques
 * cases en début de partie.
 */
function initProba(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            proba[i][j] = verifMouvements(i, j) / 8;
        }
    }
}

/**
 * Permet de vérifier les mouvements possibles
 * pour une case.
 * @param i ligne
 * @param j colonne
 */
function verifMouvements(i, j){
    var mouvementPossibible = 0;
    mouvementPossibible += verifMouvEnLigne(i, j);
    mouvementPossibible += verifMouvEnColonne(i, j);
    mouvementPossibible += verifMouvEnDiag(i, j);

    return mouvementPossibible
}

/**
 * Permet de vérifier les mouvements possibles
 * en ligne à partir d'une position
 * @param i
 * @param j
 */
function verifMouvEnLigne(i, j){
    var nbCase = 0;
    if(j == 2){
        // Colonne 3
        for(var jBis = j; jBis > -1; jBis--){
            if(jBis > -1 && grille[i][jBis] == ''){
                nbCase++;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    } else if(j == 1){
        // Colonne 2
        if(j - 1 > -1 && j + 1 < 3 && grille[i][j - 1] == '' && grille[i][j + 1] == ''){
            return 1;
        }else{
            return 0;
        }
    } else{
        // Colonne 1
        for(var jBis = j; jBis < 3; jBis++){
            if(jBis < 3 && grille[i][jBis] == ''){
                nbCase++;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    }
}

/**
 * Permet de vérifier les mouvements possibles
 * en colonne à partir d'une position
 * @param i
 * @param j
 */
function verifMouvEnColonne(i, j){
    var nbCase = 0;
    if(i == 2){
        // Ligne 3
        for(var iBis = i; iBis > -1; iBis--){
            if(iBis > -1 && grille[iBis][j] == ''){
                nbCase++;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    } else if(i == 1){
        // Ligne 2
        if(i - 1 > -1 && i + 1 < 3 && grille[i - 1][j] == '' && grille[i + 1][j] == ''){
            return 1;
        }else{
            return 0;
        }
    } else{
        // Ligne 1
        for(var iBis = i; iBis < 3; iBis++){
            if(iBis < 3 && grille[iBis][j] == ''){
                nbCase++;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    }
}

/**
 * Permet de vérifier les mouvements possibles
 * en diagonale à partir d'une position
 * @param i
 * @param j
 */
function verifMouvEnDiag(i, j){
    var nbCase = 0;
    if(i == 0 && j == 0){
        // Ligne 1 et colonne 1
        for(var iBis = i; iBis < 3; iBis++){
            for(var jBis = j + 1; jBis < 3; jBis++){
                if(jBis < 3 && grille[iBis][jBis] == ''){
                    nbCase++
                }
                break;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    }else if(i == 0 && j == 2){
        // Ligne 1 et colonne 3
        for(var iBis = i; iBis < 3; iBis++){
            for(var jBis = j - 1; jBis > -1; jBis--){
                if(jBis > -1 && grille[iBis][jBis] == ''){
                    nbCase++
                }
                break;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    }else if(i == 2 && j == 0){
        // Ligne 3 et colonne 1
        for(var iBis = i; iBis > -1; iBis--){
            for(var jBis = j + 1; jBis < 3; jBis++){
                if(jBis < 3 && grille[iBis][jBis] == ''){
                    nbCase++
                }
                break;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    }else if(i == 2 && j == 2){
        // Ligne 3 et colonne 3
        for(var iBis = i; iBis > -1; iBis--){
            for(var jBis = j - 1; jBis > -1; jBis--){
                if(jBis > -1 && grille[iBis][jBis] == ''){
                    nbCase++
                }
                break;
            }
        }
        if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    }else if(i == 1 && j == 1){
        // Ligne 2 et colonne 2
        for(var iBis = i - 1; iBis < 3; iBis++){
            for(var jBis = j - 1; jBis < 3; jBis++){
                if(grille[iBis][jBis] == ''){
                    nbCase++
                }
                break;
            }
        }
        for(var iBis = i - 1; iBis < 3; iBis++){
            for(var jBis = j + 1; jBis > -1; jBis--){
                if(grille[iBis][jBis] == ''){
                    nbCase++
                }
                break;
            }
        }
        if(nbCase === 6){
            return 2;
        }else if(nbCase === 3){
            return 1;
        }else{
            return 0;
        }
    }else{
        return 0;
    }

}

/**
 * Dessine la grille de jeu grâce à jquery.
 */
function drawGrille(){

    $('#table-morpion').remove();
    var html = '<table id="table-morpion">';
    for(var i = 0; i < 3; i++){
        html += '<tr class="'+i+'">';
        for(var j = 0; j < 3; j++){
            html += '<td class="'+j+'">'+ grille[i][j] + '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    $('body').append(html);

    $('td').click(function(){

        if(!gameIsFinish && !wait){

            var ligne = $(this).parent()[0].className;
            var colonne = $(this)[0].className;

            if(grille[ligne][colonne] == ''){
                grille[ligne][colonne] = 'X';
                isGameFinish
                wait = true;

                if(!isGameFinish()){
                    setTimeout(function () {
                        tourAi();
                        majProba()
                        drawGrille();
                        drawProba();
                        isGameFinish();
                        wait = false;
                    }, 250);
                }
            }
        }

    });
}

/**
 * Dessine la grille de proba grâce à jquery.
 */
function drawProba(){
    $('#table-proba').remove();
    var html = '<table id="table-proba">';
    for(var i = 0; i < 3; i++){
        html += '<tr>';
        for(var j = 0; j < 3; j++){
            html += '<td>'+ proba[i][j] + '</td>';
        }
        html += '</tr>';
    }
    html += '</table>';
    $('body').append(html);
}

/**
 * Tour de l'ia
 */
function tourAi(){
    var okey = false;
    while(!okey) {
        /*var colonne = Math.floor((Math.random() * 2) + 0);
        var ligne = Math.floor((Math.random() * 2) + 0);*/

        var coord = getHigherProba().split('-');

        var ligne = coord[0];
        var colonne = coord[1];

        if (grille[ligne][colonne] == '') {
            grille[ligne][colonne] = 'O'
            okey = true;
        }
    }
}

/**
 * Permet de récupérer la meilleur probabilité
 * @returns {string}
 */
function getHigherProba(){
    var value = 0;
    var coord = '';
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(proba[i][j] > value && grille[i][j] != 'X' && grille[i][j] != 'O'){
                value = proba[i][j]
                coord = i + '-' + j;
            }
        }
    }
    return coord;
}

/**
 * Vérifie que la partie est terminée
 */
function isGameFinish(){
    // gérer la fin de partie
}

/**
 * Va mettre à jour les probas.
 */
function majProba(){
    // faire la mise à jour des probabilités et pondération
}


