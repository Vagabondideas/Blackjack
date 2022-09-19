"use strict";

console.log("Hello Dud");

let cashBalance = 0; //bankroll
let displayBet = 0; // face value of bet
let totalBet = 0; //$ amount beside token
const displayCashBalance = document.querySelector(".value");
const displayPlaceBet = document.querySelector(".msg-place-bet");
const displayBetValue = document.querySelector(".bet-amount");
const displayPlayerMsg = document.querySelector(".msg-player");

const inputMoney = document.querySelector(".input-buyin-value");

const btnShowBuyin = document.querySelector(".btn-show-buyin-msg");
const btnGetToken = document.querySelector(".btn-buyin-convert");
const btnDeal = document.querySelector(".deal");
const token10 = document.querySelector(".btn-token-10");
const token20 = document.querySelector(".btn-token-20");
const token50 = document.querySelector(".btn-token-50");
const token100 = document.querySelector(".btn-token-100");
const tokenBet = document.querySelector(".btn-token-bet");

/*****************PLAYER CARDS*******************/
const playerDraw1 = document.querySelector(".draw1");
const playerDraw3 = document.querySelector(".draw3");
const hit1 = document.querySelector(".hit1");
const hit2 = document.querySelector(".hit2");
const hit3 = document.querySelector(".hit3");
const hit4 = document.querySelector(".hit4");

function turnONplayerMsg() {
    displayPlayerMsg.style.visibility = "visible";
}

function turnOFFplayerMsg() {
    displayPlayerMsg.style.visibility = "hidden";
}

// DISPLAY Buy-In btn
btnShowBuyin.addEventListener("click", function() {
    btnGetToken.style.visibility = "visible";
    inputMoney.style.visibility = "visible";

    function turnOff() {
        displayPlaceBet.style.visibility = "hidden";
    }
    turnOff();
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
        turnONPlaceBetMsg();

        turnOFFplayerMsg();
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
    } else {
        // tokenBet.replaceWith(token10);
        // tokenBet.outerHTML = token10;
        // let tokenClone = token10.cloneNode(true);
        tokenBet.textContent = "10";
        tokenBet.style.border = "solid 15px #1d1da7";
        tokenBet.style.borderStyle = "dashed";
        tokenBet.style.backgroundColor = "#6b6bd8";
        tokenBet.style.padding = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

token20.addEventListener("click", function() {
    displayBet = 20;
    totalBet += displayBet;

    if (cashBalance < totalBet) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
    } else {
        tokenBet.textContent = "20";
        tokenBet.style.border = "solid 15px #07341e";
        tokenBet.style.borderStyle = "dashed";
        tokenBet.style.backgroundColor = "#3ea268";
        tokenBet.style.padding = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

token50.addEventListener("click", function() {
    displayBet = 50;
    totalBet += displayBet;

    if (cashBalance < totalBet) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
    } else {
        tokenBet.textContent = "50";
        tokenBet.style.border = "solid 15px #5a121c";
        tokenBet.style.borderStyle = "dashed";
        tokenBet.style.backgroundColor = "#ff3869";
        tokenBet.style.padding = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

token100.addEventListener("click", function() {
    displayBet = 100;
    totalBet += displayBet;

    if (cashBalance < totalBet) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
    } else {
        tokenBet.textContent = "100";
        tokenBet.style.border = "solid 15px #664c09";
        tokenBet.style.borderStyle = "dashed";
        tokenBet.style.backgroundColor = "#c3985c";
        tokenBet.style.borderRadius = "65%";
        tokenBet.style.padding = "10px";
        tokenBet.style.paddingTop = "18px";
        tokenBet.style.paddingBottom = "18px";

        displayBetValue.textContent = `${totalBet} $`;
    }
});

//DEAL
/* 1. clear/reset betToken to original
2. clear Place your bet msg
*/

btnDeal.addEventListener("click", function() {
    playerDraw1.style.visibility = "visible";
    playerDraw3.style.visibility = "visible";
});