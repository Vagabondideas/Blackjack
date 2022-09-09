"use strict";
/* QUERY SELECTOR (textContent or value by class name)
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "You Got it!";

document.querySelector(".randomNnumber").textContent = 13;
document.querySelector(".score").textContent = 10;

document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

//Generate random number btw 1 and 20
let randomNumber = Math.trunc(Math.random() * 20) + 1;
//console.log(randomNumber);

//Keep track of score
let score = 20;
let highscore = 0;

//Display random number in its box during development
//document.querySelector(".randomNumber").textContent = randomNumber;

// LISTENER (addEventListener)
//recall input from console = string. NEED to parse value into Number
document.querySelector(".checkBtn").addEventListener("click", function() {
    let guessNumber = Number(document.querySelector(".guess").value);

    //if void (empty)
    if (!guessNumber) {
        document.querySelector(".message").textContent = "😡Enter a Number😡";

        //if Wins! (=)
    } else if (guessNumber === randomNumber) {
        document.querySelector(".message").textContent = "🎉Yeah Got It!";

        //display randomNumber when hits
        document.querySelector(".randomNumber").textContent = randomNumber;

        //CSS manipulaiton (chg background if wins)
        document.querySelector("body").style.backgroundColor = "#60b347";

        document.querySelector(".randomNumber").style.width = "30rem";

        if (score > highscore) {
            highscore = score;
        }
        document.querySelector(".highscore").textContent = highscore;

        //if Too High
    } else if (guessNumber > randomNumber) {
        if (score > 1) {
            document.querySelector(".message").textContent = "Too High";
            score--;
            document.querySelector(".score").textContent = score;
        } else {
            document.querySelector(".message").textContent = "You're busted!";
            document.querySelector(".score").textContent = 0;
        }

        //if Too Low
    } else if (guessNumber < randomNumber) {
        if (score > 1) {
            document.querySelector(".message").textContent = "Too Low";
            score--;
            document.querySelector(".score").textContent = score;
        } else {
            document.querySelector(".message").textContent = "You're busted!";
            document.querySelector(".score").textContent = 0;
        }
    }
});

//CHALLENGE
//Step 1 Event listener on the reset (play again) button
document.querySelector(".again").addEventListener("click", function() {
    score = 20; //counter to keep track of
    randomNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector(".score").textContent = score; //displayed score value
    document.querySelector(".message").textContent = "Start guessing...";
    document.querySelector(".randomNumber").textContent = "?"; //random number to be found
    document.querySelector(".guess").value = ""; //input value box

    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".randomNumber").style.width = "15rem";
});