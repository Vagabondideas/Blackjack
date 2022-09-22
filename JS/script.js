"use strict";
/*In the version (r2) 
TO DO 
- Refactoring, i.e. clean up the codes (HTML, CSS and JS) a bit
- implement rule of Dealer Must hold if hand > 16
- implement face cards in the Math.Random to account for the fact that 10 value will occure more often */

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

//Hidden Cards
const hidden1 = document.querySelector(".hidden1");
const hidden2 = document.querySelector(".hidden2");
const hidden3 = document.querySelector(".hidden3");
const dealerHide1 = document.querySelector(".dealerHide1");
const dealerHide2 = document.querySelector(".dealerHide2");
const dealerHide3 = document.querySelector(".dealerHide3");
const dealerHideTotal = document.querySelector(".dealerHideTotal");

// let modal = document.querySelectorAll(".modal"); //THAT DID NOT WORK!
const hiddenDealerWins = document.querySelector(".hiddenDealerWins");
const hiddenBusted = document.querySelector(".hiddenBusted");
const hiddenBlackJack = document.querySelector(".hiddenBlackJack");
const hiddenYouWin = document.querySelector(".hiddenYouWin");

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

    // document.querySelector(".player1Draw1").textContent = player1Draw1;
    // document.querySelector(".faceUpCard").textContent = dealerDraw2;
    // document.querySelector(".player1Draw3").textContent = player1Draw3;

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
    document.querySelector(".faceUpCard").textContent = "Face-up Card Draw2";
    document.querySelector(".faceDownCard").textContent = "Face-down Card Draw4";
    document.querySelector(".player1Draw1").textContent = "Player1Draw1";
    document.querySelector(".player1Draw3").textContent = "Player1Draw3";
    // document.querySelector(".player1Hit1").textContent = "player1Hit1";
    document.querySelector(".player1Total").textContent = "Player1 Total";
    hidden1.classList.add("hidden1");
    hidden2.classList.add("hidden2");

    closeModal();
});

//Hit
//NB this fx is executed ONLY if Hit Btn is clicked.
document.querySelector("#hitBtn").addEventListener("click", function() {
    let modal = document.querySelector(".modal");
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

    if (player1HitCount == 3) {
        hidden3.classList.remove("hidden3");
        document.querySelector(".player1Hit3").textContent = dealerHitArray[2];
    }

    player1Total = playerHand + player1HitSum; //if HitBtn fx is not called, player1Total will = 0, not playerHand because this fx will not be executed. This issue is handled in the HOLD fx where playerTotal = playerHand if Hit Fx is not called.

    document.querySelector(".player1Total").textContent = `Total ${player1Total}`;

    if (player1Total > 21) {
        document.querySelector(".player1Total").textContent = `${player1Total} Bust!`;
        console.log("Player Busted");
        hiddenBusted.classList.remove("hiddenBusted");
    } else if (player1Total == 21) {
        document.querySelector(
            ".player1Total"
        ).textContent = `${player1Total} Black Jack!`;
        console.log("Player Black Jack!");
        hiddenBlackJack.classList.remove("hiddenBlackJack");
    } else {
        document.querySelector(".player1Total").textContent = `Total ${player1Total}`;
    }
}); //end of EventListener Fx

//Display Message - Modal Who Wins
function compare() {
    if (player1Total == 0) {
        player1Total = playerHand;
    }

    if (player1Total == 21) {
        console.log("Black Jack - Player Wins");
        hiddenBlackJack.classList.remove("hiddenBlackJack");
    } else if (player1Total > 21) {
        console.log("Busted - Dealer Wins");
        hiddenBusted.classList.remove("hiddenBusted");
    } else if (
        player1Total < 21 &&
        dealerTotal > player1Total &&
        dealerTotal <= 21
    ) {
        console.log("Dealer Wins");
        hiddenDealerWins.classList.remove("hiddenDealerWins");
    } else if (dealerTotal > 21) {
        console.log("Player Wins");
        hiddenYouWin.classList.remove("hiddenYouWin");
    }
}

function closeModal() {
    // modal = document.querySelectorAll(".modal");

    hiddenDealerWins.classList.add("hiddenDealerWins");
    // modal.classList.add("hiddenDealerWins");
    console.log("close1");
    // modal.classList.add("hiddenBusted");
    hiddenBusted.classList.add("hiddenBusted");
    console.log("close2");
    // modal.classList.add("hiddenBlackJack");
    hiddenBlackJack.classList.add("hiddenBlackJack");
    console.log("close3");
    // modal.classList.add("hiddenYouWin");
    hiddenYouWin.classList.add("hiddenYouWin");
    console.log("close4");
}

//Hold Btn
document.querySelector("#holdBtn").addEventListener("click", function() {
    document.querySelector(".faceDownCard").textContent = dealerDraw4;
    dealerHideTotal.classList.remove("dealerHideTotal");

    if (player1Total == 0) {
        player1Total = playerHand;
    }

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