"use strict";

let dealerDraw2 = 0;
let dealerDraw4 = 0;

let player1Draw1 = 0;
let player1Draw3 = 0;
let player1Hit1 = 0;
let player1Hit2 = 0;
let player1Sum = player1Draw1 + player1Draw3 + player1Hit1 + player1Hit2;
let dealArray = [];

//Deal Button
document.querySelector("#item2-dealBtn").addEventListener("click", function() {
    // let dealArray = [];
    for (let i = 0; i < 4; i++) {
        dealArray.push(Math.floor(Math.random() * 11) + 1);
    }
    player1Draw1 = dealArray[0];
    dealerDraw2 = dealArray[1];
    player1Draw3 = dealArray[2];
    dealerDraw4 = dealArray[3];

    document.querySelector("#player1-draw1").textContent = player1Draw1;
    document.querySelector("#player1-draw3").textContent = player1Draw3;
    document.querySelector("#item4-dealerDraw4").textContent = dealerDraw4;
    document.querySelector("#player1-total").textContent =
        player1Draw1 + player1Draw3;

    console.log(
        (document.querySelector("#player1-draw1").textContent = player1Draw1)
    );
});

//Shuffle Button (Reset)
document
    .querySelector("#item1-shuffleBtn")
    .addEventListener("click", function() {
        dealArray = [];
        document.querySelector("#item4-dealerDraw4").textContent =
            "random dealerDraw4";
        document.querySelector("#player1-draw1").textContent =
            "random Player1Draw1";
        document.querySelector("#player1-draw3").textContent =
            "random Player1Draw3";
        document.querySelector("#player1-hit1").textContent = "player1Hit1";
        document.querySelector("#player1-total").textContent = "player1Total";
    });

//Hit Button
document.querySelector("#hitBtn").addEventListener("click", function() {
    let player1Hit1 = Math.floor(Math.random() * 11) + 1;
    player1Sum = player1Draw1 + player1Draw3 + player1Hit1;
    document.querySelector("#player1-hit1").textContent = player1Hit1;

    let player1Hit2 = Math.floor(Math.random() * 11) + 1;
    player1Sum = player1Draw1 + player1Draw3 + player1Hit1 + player1Hit2;
    document.querySelector("#player1-hit2").textContent = player1Hit1;

    if (player1Sum > 21) {
        document.querySelector(
            "#player1-total"
        ).textContent = `${player1Sum} Busted!`;
    } else if (player1Sum == 21) {
        document.querySelector(
            "#player1-total"
        ).textContent = `${player1Sum} Black Jack!`;
    } else {
        document.querySelector("#player1-total").textContent = player1Sum;
    }
});