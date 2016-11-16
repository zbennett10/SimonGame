/// <reference path="../Scripts/jquery-3.1.1.intellisense.js" />
/// <reference path="../Scripts/jquery-3.1.1.min.js" />
// Your code here!
$(document).ready(function () {

    //add music to buton presses and blinks

    var redSound = document.createElement('audio');
    redSound.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');

    var greenSound = document.createElement('audio');
    greenSound.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');

    var yellowSound = document.createElement('audio');
    yellowSound.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');

    var blueSound = document.createElement('audio');
    blueSound.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

    var red = $("#red");
    var green = $("#green");
    var yellow = $("#yellow");
    var blue = $("#blue");
    var start = $("#start");
    var strict = $("#strictDisplay");
    var roundDisplay = $("#round");
    var reset = $("#reset");
    var indices = [0, 0, 1, 2, 3];
    var blinkArr = [red, green, yellow, blue];
    var soundArr = [redSound, greenSound, yellowSound, blueSound];
    var sequence = [];
    var memory = [];
    var human = [];
    var round = 1;
    var strictStatus = false;
    var startStatus = false;

    var randIndex = function () {
        return Math.floor(Math.random() * 4) + 1;
    };

    var resetGame = function () {
        sequence = [];
        memory = [];
        human = [];
        round = 1;
        roundDisplay.text("Round: 1");
        red.removeClass("highlight");
        green.removeClass("highlight");
        yellow.removeClass("highlight");
        blue.removeClass("highlight");
        strictStatus = false;
        strict.text("Strict: Off");
        startStatus = false;
    }

    //credit for this function goes to https://codeplanet.io/building-simon-says-javascript/
    var blinkSeries = function (elementArr) {
        var i = 0;
        var interval = setInterval(function () {
            lightUp(elementArr[i]);
            i++;
            if (i >= elementArr.length) {
                clearInterval(interval);
            }
        }, 600);

    }

    const lightUp = block => {

        soundArr[blinkArr.indexOf(block)].play();
        block.addClass('highlight');
        setTimeout(function () {
            block.removeClass('highlight');
        }, 300);

    }

    var check = function () {
        if (human.length == 20 && memory.length == 20 && human[human.length - 1] === memory[memory.length - 1]) {
            alert("You Win! Good job!");
            resetGame();
            return;
        }

        for (var i = 0; i < human.length; i++) {
            if (human[i] !== memory[i]) {
                if (strictStatus === true) {
                    alert("Wrong Choice!");
                    resetGame();
                    return;
                }
                if (strictStatus === false) {
                    alert("Wrong Choice!");
                    human = [];
                    blinkSeries(sequence);
                }
            }
        }

        if (human.length === memory.length && human[human.length - 1] === memory[memory.length - 1]) {

            human = [];
            round++;
            roundDisplay.text("Round: " + round.toString());
            var store = indices[randIndex()];
            sequence.push(blinkArr[store]);
            memory.push(blinkArr[store]);
            blinkSeries(sequence);
        }
    }

    red.click(function () {
        if (!startStatus) {
            alert("Please click the green button to begin.");
            return;
        }
        redSound.play();
        human.push(red);
        check();
    });

    green.click(function () {
        if (!startStatus) {
            alert("Please click the green button to begin.");
            return;
        }
        greenSound.play();
        human.push(green);
        check();
    });

    yellow.click(function () {
        if (!startStatus) {
            alert("Please click the green button to begin.");
            return;
        }
        yellowSound.play();
        human.push(yellow);
        check();
    });

    blue.click(function () {
        if (!startStatus) {
            alert("Please click the green button to begin.");
            return;
        }
        blueSound.play();
        human.push(blue);
        check();
    });

    start.click(function () {
        var store = indices[randIndex()];
        sequence.push(blinkArr[store]);
        blinkSeries(sequence);
        memory.push(blinkArr[store]);
        startStatus = true;
    })

    strict.click(function () {
        if (strictStatus == false) {
            strictStatus = true;
            strict.text("Strict: On");
        } else {
            strictStatus = false;
            strict.text("Strict: Off");
        }
    })


    reset.click(function () {
        resetGame();
    })
});