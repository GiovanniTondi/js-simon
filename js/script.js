/*
    Un alert espone 5 numeri casuali (univoci).
    Poi parte un timer di 30 secondi.
    Dopo 30 secondi l’utente deve inserire, un prompt alla volta, i numeri che ha visto precedentemente.
    Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati
*/

$(document).ready(function () {

    var min = 1;
    var max = 10;
    var casuali = 5; // num casuali da generare
    var timer = 30000; // ms
    var numRandom = [];
    var numIndovinati = [];
    var numInseriti = [];

    while (numRandom.length < casuali) {
        var random = getRandom(min, max);
        if (!isInArray(numRandom, random)) {
            numRandom.push(random);
        }
    }

    console.log(numRandom);
    alert(numRandom);

    setTimeout(function () {
        console.log("Timer scaduto");

        var i = 0;
        while (i < numRandom.length) {
            num = parseInt(prompt('Inserisci il ' + (i+1) + ' numero'));
            console.log(isInRange(num, min, max));;

            if (!isInRange(num, min, max)) {
                alert("Numero fuori range!");
            } else if (isInArray(numInseriti, num)) {
                alert("Numero già inserito!");
            } else if (isInArray(numRandom, num)) {
                numIndovinati.push(num);
                numInseriti.push(num);
                i++;
            } else {
                numInseriti.push(num);
                i++;
            }
        }

        console.log("Hai indovinato " + numIndovinati.length + ' numeri');
        console.log(numIndovinati);
        // console.log(numInseriti);
    }, timer);

});


// FUNCTIONS
function isInArray(array, elemento) {
    var i = 0;
    while (i < array.length) {
        if (array[i] == elemento) {
            return true;
        }
        i++;
    }
    return false;
}

function isInRange(num, min, max) {
    if (!isNaN(num) && num >= min && num <= max) {
        return true;
    }
    return false;
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}
