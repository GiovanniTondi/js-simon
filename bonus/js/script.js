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

    // // DEBUG:
    timer = 500;

    while (numRandom.length < casuali) {
        var random = getRandom(min, max);
        if (!isInArray(numRandom, random)) {
            numRandom.push(random);
        }
    }

    console.log(numRandom);

    $('#modal p').text(numRandom);

    setTimeout(function () {
        $('#modal').fadeOut('slow', function functionName() {
            $('.jumbo').fadeIn('slow', function () {
                $('.jumbo').removeClass('hidden');
            });
        });
    }, timer);

    $('#num').val('');

    $(document).keydown(function () {
        var key = event.keyCode;
        // console.log(key);
        if (key == '13') {
            
            var num = $('#num').val();
            console.log(num);
            if (!isInRange(num, min, max)) {
                console.log("Numero fuori range!");
            } else if (isInArray(numInseriti, num)) {
                console.log("Numero già inserito!");
            } else if (isInArray(numRandom, num)) {
                numIndovinati.push(num);
                numInseriti.push(num);
            } else {
                numInseriti.push(num);
            }
            $('#numInseriti').val(casuali - numInseriti.length);
            $('#num').val('');

            if (numInseriti.length == numRandom.length) {

                $('#num').attr('disabled', 'true');
                $('#num').prev('label').text("Numeri indovinati:");
                $('#num').val(numIndovinati.length);
                console.log("Hai indovinato " + numIndovinati.length + ' numeri');
                console.log(numIndovinati);
            }

        }
    });
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
