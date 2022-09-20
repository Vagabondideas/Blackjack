"use strict";

console.log("Hello Dud");

let draw1ScoreValue = 0;
let draw2ScoreValue = 0;
let draw3ScoreValue = 0;
let draw4ScoreValue = 0;

let cashBalance = 0; //bankroll
let displayBet = 0; // face value of bet
let totalBet = 0; //$ amount beside token
let dealerHand = 0;
let playerHand = 0;

const displayCashBalance = document.querySelector(".value");
const displayPlaceBet = document.querySelector(".msg-place-bet");
const displayBetValue = document.querySelector(".bet-amount");
const displayPlayerMsg = document.querySelector(".msg-player");
const displayDealerMsg = document.querySelector(".msg-dealer");

const inputMoney = document.querySelector(".input-buyin-value");

const btnShowBuyin = document.querySelector(".btn-show-buyin-msg");
const btnGetToken = document.querySelector(".btn-buyin-convert");
const btnTokenPlace = document.querySelector(".btn-token-place");
const btnDeal = document.querySelector(".deal");
const btnDouble = document.querySelector(".btn-double");
const btnHold = document.querySelector(".btn-hold");
const btnHit = document.querySelector(".btn-hit");
const token10 = document.querySelector(".btn-token-10");
const token20 = document.querySelector(".btn-token-20");
const token50 = document.querySelector(".btn-token-50");
const token100 = document.querySelector(".btn-token-100");

/*****************DEALER CARDS*******************/
const dealerDraw2 = document.querySelector(".draw2");
const dealerDraw4 = document.querySelector(".draw4");
const random1 = document.querySelector(".random1");
const random2 = document.querySelector(".random2");
const random3 = document.querySelector(".random3");
const random4 = document.querySelector(".random4");

let draw2Value = document.querySelector(".value-draw2");
let draw4Value = document.querySelector(".value-draw4");
let random1Value = document.querySelector(".value-random1");
let random2Value = document.querySelector(".value-random2");
let random3Value = document.querySelector(".value-random3");
let random4Value = document.querySelector(".value-random4");

let dealerScore = document.querySelector(".dealer-score-value");

/*****************PLAYER CARDS*******************/
const playerDraw1 = document.querySelector(".draw1");
const playerDraw3 = document.querySelector(".draw3");
const hit1 = document.querySelector(".hit1");
const hit2 = document.querySelector(".hit2");
const hit3 = document.querySelector(".hit3");
const hit4 = document.querySelector(".hit4");

let draw1Value = document.querySelector(".value-draw1");
let draw3Value = document.querySelector(".value-draw3");
let hit1Value = document.querySelector(".value-hit1");
let hit2Value = document.querySelector(".value-hit2");
let hit3Value = document.querySelector(".value-hit3");
let hit4Value = document.querySelector(".value-hit4");

let playerrScore = document.querySelector(".player-score-value");

/***************ON-OFF FUNCTIONS ******************** */

function resetBuyinValue() {
    inputMoney.value = "";
}

function playerDisplay_ON() {
    displayPlayerMsg.style.visibility = "visible";
}

function playerDisplay_OFF() {
    displayPlayerMsg.style.visibility = "hidden";
}

function dealerDisplay_ON() {
    displayDealerMsg.style.visibility = "visible";
}

function dealerrDisplay_OFF() {
    displayDealerMsg.style.visibility = "hidden";
}

function placeBetMsg_ON() {
    displayPlaceBet.style.visibility = "visible";
}

function placeBetMsg_OFF() {
    displayPlaceBet.style.visibility = "hidden";
}

function btnDouble_OFF() {
    btnDouble.style.display = "none";
}

function btnDeal_OFF() {
    btnDeal.style.visibility = "hidden";
}

// DISPLAY Buy-In btn
btnShowBuyin.addEventListener("click", function() {
    btnGetToken.style.visibility = "visible";
    inputMoney.style.visibility = "visible";

    placeBetMsg_OFF();
});

//GET TOKEN (Buyin btn)
btnGetToken.addEventListener("click", function() {
    let cashValue = Number(inputMoney.value);

    if (cashValue === 0) {
        displayPlayerMsg.textContent = `You must enter cash amount`;
    } else {
        cashBalance += cashValue;
        console.log("cashBalance after Buy-in = " + cashBalance);
        btnGetToken.style.visibility = "hidden";
        inputMoney.style.visibility = "hidden";

        displayCashBalance.textContent = `${cashBalance} $`;

        function turnONPlaceBetMsg() {
            displayPlaceBet.style.visibility = "visible";
        }
        placeBetMsg_ON();
        playerDisplay_OFF();
        resetBuyinValue();
    }
});

//PLACE TOKEN (bet via btn-token)
token10.addEventListener("click", function() {
    console.log("clicked token 10");

    displayBet = 10;
    totalBet += displayBet;

    if (cashBalance < totalBet) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        btnTokenPlace.textContent = "10";
        btnTokenPlace.style.border = "solid 15px #1d1da7";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#6b6bd8";
        btnTokenPlace.style.padding = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

token20.addEventListener("click", function() {
    displayBet = 20;
    totalBet += displayBet;

    if (cashBalance < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        btnTokenPlace.textContent = "20";
        btnTokenPlace.style.border = "solid 15px #07341e";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#3ea268";
        btnTokenPlace.style.padding = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

token50.addEventListener("click", function() {
    displayBet = 50;
    totalBet += displayBet;

    if (cashBalance < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        btnTokenPlace.textContent = "50";
        btnTokenPlace.style.border = "solid 15px #5a121c";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#ff3869";
        btnTokenPlace.style.padding = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

token100.addEventListener("click", function() {
    displayBet = 100;
    totalBet += displayBet;

    if (cashBalance < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        btnTokenPlace.textContent = "100";
        btnTokenPlace.style.border = "solid 15px #664c09";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#c3985c";
        btnTokenPlace.style.borderRadius = "65%";
        btnTokenPlace.style.padding = "10px";
        btnTokenPlace.style.paddingTop = "18px";
        btnTokenPlace.style.paddingBottom = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

////////////////////// DEAL ////////////////////////
btnDeal.addEventListener("click", function() {
    playerDisplay_OFF();

    playerDraw1.style.visibility = "visible";
    playerDraw3.style.visibility = "visible";
    dealerDraw2.style.visibility = "visible";
    dealerDraw4.style.visibility = "visible";
    /*pop-Up Button Double if cash balance provides */
    if (cashBalance !== totalBet) {
        placeBetMsg_OFF();
        // btnTokenPlace.style.visibility = "hidden";
        btnDouble.style.display = "flex";
    }

    let dealArray = [];
    for (let i = 0; i < 4; i++) {
        dealArray.push(Math.floor(Math.random() * 13) + 1);
    }

    let draw1 = dealArray[0];
    let draw2 = dealArray[1];
    let draw3 = dealArray[2];
    let draw4 = dealArray[3];

    draw1 == 1 ?
        (draw1Value.textContent = `Ace`) :
        (draw1Value.textContent = `${draw1}`);

    draw2 == 1 ?
        (draw2Value.textContent = `Ace`) :
        (draw2Value.textContent = `${draw2}`);

    draw3 == 1 ?
        (draw3Value.textContent = `Ace`) :
        (draw3Value.textContent = `${draw3}`);

    draw4 == 1 ?
        (draw4Value.textContent = `Ace`) :
        (draw4Value.textContent = `${draw4}`);

    if (draw1 == 1) {
        draw1ScoreValue = 11;
    } else if (draw1 >= 10) {
        draw1ScoreValue = 10;
    } else {
        draw1ScoreValue = draw1;
    }

    if (draw2 == 1) {
        draw2ScoreValue = 11;
    } else if (draw2 >= 10) {
        draw2ScoreValue = 10;
    } else {
        draw2ScoreValue = draw2;
    }

    if (draw3 == 1) {
        draw3ScoreValue = 11;
    } else if (draw3 >= 10) {
        draw3ScoreValue = 10;
    } else {
        draw3ScoreValue = draw3;
    }

    if (draw4 == 1) {
        draw4ScoreValue = 11;
    } else if (draw4 >= 10) {
        draw4ScoreValue = 10;
    } else {
        draw4ScoreValue = draw4;
    }

    dealerHand = draw2ScoreValue + draw4ScoreValue;
    playerHand = draw1ScoreValue + draw3ScoreValue;

    dealerScore.textContent = `${draw2ScoreValue}`;
    playerrScore.textContent = `${playerHand}`;

    if (playerHand == 21) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `BLACK JACK !`;
        dealerDisplay_ON();
        displayDealerMsg.textContent = `Player Wins !`;
    }

    btnDeal_OFF();
    btnHold.style.visibility = "visible";
    btnHit.style.visibility = "visible";
});

btnDouble.addEventListener("click", function() {
    let doubleBet = totalBet * 2;
    console.log("total bet after double = " + totalBet);

    if (doubleBet > cashBalance) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Insufficient Funds`;
        /*TO DO
        add Timer - then playerDisplay_OFF */
    } else {
        displayBetValue.textContent = `${doubleBet} $`;
    }

    btnDouble_OFF();
});