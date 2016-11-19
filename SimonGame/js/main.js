/// <reference path="../Scripts/jquery-3.1.1.intellisense.js" />
/// <reference path="../Scripts/jquery-3.1.1.min.js" />
// Your code here!
$(document).ready(function () {

   //sounds for button blinks
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


    //reset functions
    var resetArrays = function () {
        sequence = [];
        memory = [];
        human = [];
    }

    var resetGlobVar = function () {
        round = 1;
        strictStatus = false;
        startStatus = false;
    }

    var resetElements = function () {
        strict.text("Strict: Off");
        roundDisplay.text("Round: 1");
        red.removeClass("highlight");
        green.removeClass("highlight");
        yellow.removeClass("highlight");
        blue.removeClass("highlight");
    }

    var resetGame = function () {
        resetArrays();
        resetGlobalVar();
        resetElements();
    }

    //credit for this function goes to https://codeplanet.io/building-simon-says-javascript/
    //iterates through sequence, blinking each block
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

    //blinks a block
    const lightUp = block => {
        soundArr[blinkArr.indexOf(block)].play();
        block.addClass('highlight');
        setTimeout(function () {
            block.removeClass('highlight');
        }, 300);
    }

    var check = function () {
        if (human.length === 20 && human[human.length - 1] === memory[memory.length - 1]) {
            var winMessage = Windows.UI.Popups.MessageDialog("You Win! Good Job!");
            winMessage.showAsync();
            resetGame();
            return;
        }

        for (var i = 0; i < human.length; i++) {
            if (human[i] !== memory[i]) {
                if (strictStatus === true) {
                    onWrongChoice();
                    resetGame();
                    return;
                }
                else {
                    onWrongChoice();
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

    //displays message to user if they try to start the game before pressing the start button
    var onPrematureStart = function () {
        var dialog = new Windows.UI.Popups.MessageDialog("Please click the green button to begin.");
        dialog.showAsync();
    }

    var onWrongChoice = function() {
        var dialog = new Windows.UI.Popups.MessageDialog("Wrong Choice!");
        dialog.showAsync();
    }

    red.click(function () {
        if (!startStatus) {
            onPrematureStart();       
            return;
        }
        redSound.play();
        human.push(red);
        check();
    });

    green.click(function () {
        if (!startStatus) {
            onPrematureStart();
            return;
        }
        greenSound.play();
        human.push(green);
        check();
    });

    yellow.click(function () {
        if (!startStatus) {
            onPrematureStart();
            return;
        }
        yellowSound.play();
        human.push(yellow);
        check();
    });

    blue.click(function () {
        if (!startStatus) {
            onPrematureStart();
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