/**
 * Fichier JS pour le Morpion
 * @author Julien
 */
var grille = [];
var proba = [];
var grilleLigne = [];
var grilleColonne = [];
var grilleDiagonale = [];
var tempProba = [];

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
        grilleLigne[i] = new Array('', '', '');
        grilleColonne[i] = new Array('', '', '');
        grilleDiagonale[i] = new Array('0', '0', '0');
        tempProba[i] = new Array(0, 0, 0);
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
                drawGrille();
                wait = true;

                if(!isGameFinish('X')){
                    setTimeout(function () {
                        majProba();
                        drawProba();
                        tourAi();
                        drawGrille();
                        drawProba();
                        isGameFinish('O');
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
            majProba();
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
                value = proba[i][j];
                coord = i + '-' + j;
            }
        }
    }
    return coord;
}

/**
 * Vérifie que la partie est terminée
 */
function isGameFinish(player){
    for(var i = 0; i<3; i++ ){
        if(grille[i][0] == player && grille[i][1] == player && grille[i][2] == player){
            alert(player+ " a gagné");
            location.reload();
        }
        if(grille[0][i] == player && grille[1][i] == player && grille[2][i] == player){
            alert(player+ " a gagné");
            location.reload();
        }   
    }
    if(grille[0][0] == player && grille[1][1] == player && grille[2][2] == player){
            alert(player+ " a gagné");
            location.reload();
        }
    if(grille[0][2] == player && grille[1][1] == player && grille[2][0] == player){
            alert(player+ " a gagné");
            location.reload();
        }
    return false;
}


function majProbaLC (g) {
    for(var i = 0; i <3; i++){
        if(g[i].indexOf(-2) != -1){
            for(var j = 0; j<3; j++){
                if(g[i][j] != -2 && g[i][j] != 2)
                    g[i][j] = 0;
            }
        }
    }
    for(var i = 0; i <3; i++){
        var checkWin = 0;
        var checkLoose = 0;
        for(var j = 0; j<3; j++){
            if(g[i][j] == 2){
                checkWin ++;
            }
            if(g[i][j] == -2){
                checkLoose ++;
            }
            if (checkWin >= 2 && g[i][j] != -2)
                g[i][j] = 3;
            if(checkLoose >=2 && g[i][j] != 2 && g[i][j] != -2)
                g[i][j] = 2;
            if(checkWin == 2){
                checkWin++;
                j=-1;
            }
            if( checkLoose == 2){
                checkLoose++;
                j=-1;
            }
        }
    }
}

function majProbaDiag (g) {
    var check = 0;
    var gTemp = new Array(g[0][0], g[1][1], g[2][2]);
    if(gTemp.filter(function(arr){arr == -2;}).length == 2){
        for(var i=0; i<3;i++){
            if(g[i][i] != -2){
                g[i][i] = 2;
            }
        }
    } else if(gTemp.filter(function(arr){arr == 2;}).length == 2){
        for(var i=0; i<3;i++){
            if(g[i][i] != 2){
                g[i][i] = 3;
            }
        }
    } else if (gTemp.filter(function(arr){return arr == -2;}).length == 1){
        for(var i=0; i<3;i++){
            if(g[i][i] != 2 && g[i][i] != -2){
                if(i == 1)
                    check++;
                g[i][i] = 0;
            }
        }
    }
    
    gTemp = new Array(g[0][2], g[1][1], g[2][0]);
    if(gTemp.filter(function(arr){return arr == -2;}).length == 2){
        var j = 2;
        for(var i=0; i<3;i++){
                if(g[i][j] != -2){
                    g[i][j] = 2;
                }
            j--;
        }
    } else if(gTemp.filter(function(arr){return arr == 2;}).length == 2){
        var j = 2;
        for(var i=0; i<3;i++){
                if(g[i][j] != 2){
                    g[i][j] = 3;
                }
            j--;
        }
    } else if (gTemp.filter(function(arr){return arr == -2;}).length == 1){
        var j = 2;
        for(var i=0; i<3;i++){
                if(g[i][j] != -2){
                    if(i == 1 && j == 1)
                        check++;
                    g[i][j] = 0;
                }
            j--;
        }
    }
    if(check != 2){
        g[1][1] = 1;
    }
}

function addProba (grilleLigne, grilleColonne, grilleDiagonale) {
    for (var i = 0; i <3; i++) {   
        for (var j = 0; j <3; j++) {
            if(grilleLigne[i][j] == 0){
                if(grilleColonne[j][i] == 1)
                    tempProba[i][j] += 1/8;
                if(grilleDiagonale[i][j] == 1)
                    tempProba[i][j] += 1/8;
            }

            if(grilleLigne[i][j] == 1){
                    tempProba[i][j] += 1/8;
                if(grilleColonne[j][i] == 1)
                    tempProba[i][j] += 1/8;
                if(grilleDiagonale[i][j] == 1)
                    tempProba[i][j] += 1/8;
            }

            if(grilleLigne[i][j] == -2)
                tempProba[i][j] = -2;

            if(grilleLigne[i][j] == 2)
                tempProba[i][j] = 2;

            if(grilleLigne[i][j] == 3)
                tempProba[i][j] = 3;            

            if(grilleColonne[j][i] == -2)
                tempProba[i][j] = -2;

            if(grilleColonne[j][i] == 2)
                tempProba[i][j] = 2;

            if(grilleColonne[j][i] == 3)
                tempProba[i][j] = 3;

            if(grilleDiagonale[i][j] == -2)
                tempProba[i][j] = -2;

            if(grilleDiagonale[i][j] == 2)
                tempProba[i][j] = 2;

            if(grilleDiagonale[i][j] == 3)
                tempProba[i][j] = 3;

            
        }
    }
    return tempProba;
}


/**
 * Va mettre à jour les probas.
 */
function majProba() {

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (grille[i][j] == 'X') {
                grilleLigne[i][j] = -2;
            } else if (grille[i][j] == 'O') {
                grilleLigne[i][j] = 2;
            } else {
                grilleLigne[i][j] = 1;
            }
        }
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (grille[j][i] == 'X')
                grilleColonne[i][j] = -2;
            else if (grille[j][i] == 'O')
                grilleColonne[i][j] = 2;
            else
                grilleColonne[i][j] = 1;
        }
    }

    grilleDiagonale[0] = new Array(grilleLigne[0][0], 0, grilleLigne[0][2]);
    grilleDiagonale[1] = new Array(0, grilleLigne[1][1], 0);
    grilleDiagonale[2] = new Array(grilleLigne[2][0], 0, grilleLigne[2][2]);

    majProbaLC(grilleLigne);
    majProbaLC(grilleColonne);
    majProbaDiag(grilleDiagonale);

    proba = addProba(grilleLigne, grilleColonne, grilleDiagonale);
}