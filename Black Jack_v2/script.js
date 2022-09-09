"use strict";

let ace = 11;

let dealerDraw2 = 0;
let dealerDraw4 = 0;
let dealerHand = 0;
let dealerHitArray = [];
let dealerHitCount = 0;
// let dealerHit = 0;
// let dealerHitSum = 0;
let dealerTotal = 0;

let player1Draw1 = 0;
let player1Draw3 = 0;
let playerHand = 0;
let dealArray = [];
let player1Total = 0;

// let player1Hit = 0;
let player1HitArray = [];
let player1HitCount = 0;
// let player1Sum = 0;
// let hitCount = 0;

const hidden1 = document.querySelector(".hidden1");
const hidden2 = document.querySelector(".hidden2");
const dealerHide1 = document.querySelector(".dealerHide1");
const dealerHide2 = document.querySelector(".dealerHide2");
const dealerHide3 = document.querySelector(".dealerHide3");
const dealerHideTotal = document.querySelector(".dealerHideTotal");

//Deal Button
document.querySelector("#dealBtn").addEventListener("click", function() {
    // let dealArray = [];
    for (let i = 0; i < 4; i++) {
        dealArray.push(Math.floor(Math.random() * 10) + 2);
    }
    player1Draw1 = dealArray[0];
    dealerDraw2 = dealArray[1];
    player1Draw3 = dealArray[2];
    dealerDraw4 = dealArray[3];

    dealerHand = dealerDraw2 + dealerDraw4;
    playerHand = player1Draw1 + player1Draw3;

    document.querySelector(".player1Draw1").textContent = player1Draw1;
    document.querySelector(".player1Draw3").textContent = player1Draw3;
    document.querySelector(".faceUpCard").textContent = dealerDraw4;
    if (playerHand !== 21) {
        document.querySelector(".player1Total").textContent = `Total ${playerHand}`;
    } else {
        document.querySelector(".player1Total").textContent = "Black Jack!";
    }
});

//Shuffle Button (Reset)
document.querySelector("#shuffleBtn").addEventListener("click", function() {
    dealArray = [];

    dealerHand = 0;
    dealerTotal = 0;
    dealerHitArray = [];
    dealerHitCount = 0;

    dealerHide1.classList.add("dealerHide1");
    dealerHide2.classList.add("dealerHide2");
    dealerHide3.classList.add("dealerHide3");
    dealerHideTotal.classList.add("dealerHideTotal");

    player1HitArray = [];
    player1Total = 0;
    player1HitCount = 0;
    document.querySelector(".faceDownCard").textContent = "Face-down Card Draw2";
    document.querySelector(".faceUpCard").textContent = "Face-up Card Draw4";
    document.querySelector(".player1Draw1").textContent = "Player1Draw1";
    document.querySelector(".player1Draw3").textContent = "Player1Draw3";
    // document.querySelector(".player1Hit1").textContent = "player1Hit1";
    document.querySelector(".player1Total").textContent = "Player1 Total";
    hidden1.classList.add("hidden1");
    hidden2.classList.add("hidden2");
});

//Hit Button
//NB this fx is executed ONLY if Hit Btn is clicked.
document.querySelector("#hitBtn").addEventListener("click", function() {
    let player1HitSum = 0; //needed to push in the array
    let player1Hit = Math.floor(Math.random() * 10) + 2;
    player1HitArray.push(player1Hit);
    player1HitCount++;

    for (let i = 0; i < player1HitArray.length; i++) {
        player1HitSum += player1HitArray[i];
    }

    hidden1.classList.remove("hidden1");
    document.querySelector(".player1Hit1").textContent = player1HitArray[0];

    if (player1HitCount == 2) {
        hidden2.classList.remove("hidden2");
        document.querySelector(".player1Hit2").textContent = player1HitArray[1];
    }

    player1Total = playerHand + player1HitSum; //if HitBtn fx is not called, player1Total will = 0, not playerHand because this fx will not be executed. This issue is handled in the HOLD fx where playerTotal = playerHand if Hit Fx is not called.

    document.querySelector(".player1Total").textContent = `Total ${player1Total}`;

    if (player1Total > 21) {
        document.querySelector(
            ".player1Total"
        ).textContent = `${player1Total} Busted!`;
    } else if (player1Total == 21) {
        document.querySelector(
            ".player1Total"
        ).textContent = `${player1Total} Black Jack!`;
    } else {
        document.querySelector(
            ".player1Total"
        ).textContent = `Total ${player1Total}`;
    }
});

function compare() {
    if (player1Total == 0) {
        player1Total = playerHand;
    }
    if (player1Total == 21) {
        console.log("Black Jack - Player Wins");
    } else if (player1Total > 21) {
        console.log("Busted - Dealer Wins");
    } else if (
        player1Total < 21 &&
        dealerTotal > player1Total &&
        dealerTotal <= 21
    ) {
        console.log("Dealer Wins");
    } else {
        console.log("Player Wins");
    }
}

//Hold Btn
document.querySelector("#holdBtn").addEventListener("click", function() {
    document.querySelector(".faceDownCard").textContent = dealerDraw2;
    dealerHideTotal.classList.remove("dealerHideTotal");

    if (player1Total == 0) {
        player1Total = playerHand;
    }

    console.log("player1Total inside Hold = " + player1Total);

    if (dealerHand > player1Total) {
        dealerTotal = dealerHand;
        document.querySelector(".dealerTotal").textContent = `Total ${dealerTotal}`;
    } else {
        dealerHand = dealerHand;
    }

    while (dealerTotal <= player1Total) {
        let dealerHitSum = 0;
        let dealerHit = Math.floor(Math.random() * 10) + 2;
        dealerHitArray.push(dealerHit);
        dealerHitCount++;

        for (let i = 0; i < dealerHitArray.length; i++) {
            dealerHitSum += dealerHitArray[i];
        }

        let dealerHit1 = dealerHitArray[0];
        let dealerHit2 = dealerHitArray[1];
        let dealerHit3 = dealerHitArray[2];

        dealerHide1.classList.remove("dealerHide1");
        document.querySelector(".dealerHit1").textContent = dealerHitArray[0];

        if (dealerHitCount == 2) {
            dealerHide2.classList.remove("dealerHide2");
            document.querySelector(".dealerHit2").textContent = dealerHitArray[1];
        }

        if (dealerHitCount == 3) {
            dealerHide3.classList.remove("dealerHide3");
            document.querySelector(".dealerHit3").textContent = dealerHitArray[2];
        }

        dealerTotal = dealerHand + dealerHitSum;
        document.querySelector(".dealerTotal").textContent = `Total ${dealerTotal}`;
    }

    compare();
});