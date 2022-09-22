"use strict";

console.log("Hello Dud");

let countHit = 0;

let cashBalance = 0; //bankroll
let displayBet = 0; // face value of bet
let totalBet = 0; //$ amount beside token

const displayCashBalance = document.querySelector(".value");
const displayPlaceBet = document.querySelector(".msg-place-bet");
const displayBetValue = document.querySelector(".bet-amount");
const displayPlayerMsg = document.querySelector(".msg-player");
const displayDealerMsg = document.querySelector(".msg-dealer");

const inputMoney = document.querySelector(".input-buyin-value");

const btnShowBuyin = document.querySelector(".btn-show-buyin-msg");
const btnBuyin = document.querySelector(".btn-buyin-convert");
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
const dealerCard1 = document.querySelector(".draw2");
const dealerCard2 = document.querySelector(".draw4");
const dealerCard3 = document.querySelector(".random1");
const dealerCard4 = document.querySelector(".random2");
const dealerCard5 = document.querySelector(".random3");
const dealerCard6 = document.querySelector(".random4");

const dealerCard1Value = document.querySelector(".value-draw2");
const dealerCard2Value = document.querySelector(".value-draw4");
const dealerCard3Value = document.querySelector(".value-random1");
const dealerCard4Value = document.querySelector(".value-random2");
const dealerCard5Value = document.querySelector(".value-random3");
const dealerCard6Value = document.querySelector(".value-random4");

let dealerCard1ScoreValue = 0;
let dealerCard2ScoreValue = 0;
let dealerCard3ScoreValue = 0;
let dealerCard4ScoreValue = 0;
let dealerCard5ScoreValue = 0;
let dealerCard6ScoreValue = 0;

const dealerScoreDisplay = document.querySelector(".dealer-score-value");

let dealerHand = 0;
let dealerTotalScore = 0;

/*****************PLAYER CARDS*******************/
const playerCard1 = document.querySelector(".draw1");
const playerCard2 = document.querySelector(".draw3");
const playerCard3 = document.querySelector(".hit1");
const playerCard4 = document.querySelector(".hit2");
const playerCard5 = document.querySelector(".hit3");
const playerCard6 = document.querySelector(".hit4");

const playerCard1Value = document.querySelector(".value-draw1");
const playerCard2Value = document.querySelector(".value-draw3");
const playerCard3Value = document.querySelector(".value-hit1");
const playerCard4Value = document.querySelector(".value-hit2");
const playerCard5Value = document.querySelector(".value-hit3");
const playerCard6Value = document.querySelector(".value-hit4");

let playerCard1ScoreValue = 0;
let playerCard2ScoreValue = 0;
let playerCard3ScoreValue = 0;
let playerCard4ScoreValue = 0;
let playerCard5ScoreValue = 0;
let playerCard6ScoreValue = 0;

const playerScoreDisplay = document.querySelector(".player-score-value");

let playerHand = 0;
let playerTotalScore = 0;

/***************ON-OFF FUNCTIONS ******************** */

function convertCardValue(card) {
    // let value = 0;
    if (card == 1) {
        return 11;
    } else if (card >= 10) {
        return 10;
    } else {
        return card;
    }
}

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

// DISPLAY (btn in cash modal) Show buton Buyin in ctre block
btnShowBuyin.addEventListener("click", function() {
    btnBuyin.style.visibility = "visible";
    inputMoney.style.visibility = "visible";

    placeBetMsg_OFF();
});

// CASH BALANCE (Buy-in btn)
btnBuyin.addEventListener("click", function() {
    let cashValue = Number(inputMoney.value);

    if (cashValue === 0) {
        displayPlayerMsg.textContent = `You must enter cash amount`;
    } else {
        cashBalance += cashValue;
        console.log("cashBalance after Buy-in = " + cashBalance);
        btnBuyin.style.visibility = "hidden";
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

    if (cashBalance == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `You must buy-in first`;
    } else if (cashBalance < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 10;
        totalBet += displayBet;

        btnTokenPlace.textContent = "10";
        btnTokenPlace.style.border = "solid 15px #1d1da7";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#6b6bd8";
        btnTokenPlace.style.padding = "18px";
        btnTokenPlace.style.fontSize = "28px";
        btnTokenPlace.style.fontWeight = "bold";
        btnTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

token20.addEventListener("click", function() {
    if (cashBalance == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `You must buy-in first`;
    } else if (cashBalance < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 20;
        totalBet += displayBet;

        btnTokenPlace.textContent = "20";
        btnTokenPlace.style.border = "solid 15px #07341e";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#3ea268";
        btnTokenPlace.style.padding = "18px";
        btnTokenPlace.style.fontSize = "28px";
        btnTokenPlace.style.fontWeight = "bold";
        btnTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

token50.addEventListener("click", function() {
    if (cashBalance == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `You must buy-in first`;
    } else if (cashBalance < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 50;
        totalBet += displayBet;

        btnTokenPlace.textContent = "50";
        btnTokenPlace.style.border = "solid 15px #5a121c";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#ff3869";
        btnTokenPlace.style.padding = "18px";
        btnTokenPlace.style.fontSize = "28px";
        btnTokenPlace.style.fontWeight = "bold";
        btnTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

token100.addEventListener("click", function() {
    if (cashBalance == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `You must buy-in first`;
    } else if (cashBalance < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${cashBalance} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 100;
        totalBet += displayBet;

        btnTokenPlace.textContent = "100";
        btnTokenPlace.style.border = "solid 15px #664c09";
        btnTokenPlace.style.borderStyle = "dashed";
        btnTokenPlace.style.backgroundColor = "#c3985c";
        btnTokenPlace.style.borderRadius = "65%";
        btnTokenPlace.style.padding = "10px";
        btnTokenPlace.style.paddingTop = "18px";
        btnTokenPlace.style.paddingBottom = "18px";
        btnTokenPlace.style.fontSize = "28px";
        btnTokenPlace.style.fontWeight = "bold";
        btnTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

////////////////////// DEAL ////////////////////////
btnDeal.addEventListener("click", function() {
    playerDisplay_OFF();

    if (totalBet == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Place bet or Pass`;
        return;
    }

    playerCard1.style.visibility = "visible";
    playerCard2.style.visibility = "visible";
    dealerCard1.style.visibility = "visible";
    dealerCard2.style.visibility = "visible";
    /*pop-Up Button Double if cash balance provides */
    if (cashBalance !== totalBet && cashBalance >= totalBet * 2) {
        placeBetMsg_OFF();
        // btnTokenPlace.style.visibility = "hidden";
        btnDouble.style.display = "flex";
    }

    let shoeBox = [];
    for (let i = 0; i < 15; i++) {
        shoeBox.push(Math.floor(Math.random() * 13) + 1);
    }

    let card1Value = shoeBox[0];
    let card2Value = shoeBox[1];
    let card3Value = shoeBox[2];
    let card4Value = shoeBox[3];
    let card5Value = shoeBox[4];
    let card6Value = shoeBox[5];
    let card7Value = shoeBox[6];
    let card8Value = shoeBox[7];
    let card9Value = shoeBox[8];
    let card10Value = shoeBox[9];
    let card11Value = shoeBox[10];
    let card12Value = shoeBox[12];

    card1Value == 1 ?
        (playerCard1Value.textContent = `Ace`) :
        (playerCard1Value.textContent = `${card1Value}`);

    card2Value == 1 ?
        (dealerCard1Value.textContent = `Ace`) :
        (dealerCard1Value.textContent = `${card2Value}`);

    card3Value == 1 ?
        (playerCard2Value.textContent = `Ace`) :
        (playerCard2Value.textContent = `${card3Value}`);

    card4Value == 1 ?
        (dealerCard2Value.textContent = `Ace`) :
        (dealerCard2Value.textContent = `${card4Value}`);

    card5Value == 1 ?
        (playerCard3Value.textContent = `Ace`) :
        (playerCard3Value.textContent = `${card5Value}`);

    card6Value == 1 ?
        (playerCard4Value.textContent = `Ace`) :
        (playerCard4Value.textContent = `${card6Value}`);

    card7Value == 1 ?
        (playerCard5Value.textContent = `Ace`) :
        (playerCard5Value.textContent = `${card7Value}`);

    card8Value == 1 ?
        (playerCard6Value.textContent = `Ace`) :
        (playerCard6Value.textContent = `${card8Value}`);

    card9Value == 1 ?
        (dealerCard3Value.textContent = `Ace`) :
        (dealerCard3Value.textContent = `${card9Value}`);

    card10Value == 1 ?
        (dealerCard4Value.textContent = `Ace`) :
        (dealerCard4Value.textContent = `${card10Value}`);

    card11Value == 1 ?
        (dealerCard5Value.textContent = `Ace`) :
        (dealerCard5Value.textContent = `${card11Value}`);

    card12Value == 1 ?
        (dealerCard6Value.textContent = `Ace`) :
        (dealerCard6Value.textContent = `${card12Value}`);

    playerCard1ScoreValue = convertCardValue(card1Value);
    dealerCard1ScoreValue = convertCardValue(card2Value);
    playerCard2ScoreValue = convertCardValue(card3Value);
    dealerCard2ScoreValue = convertCardValue(card4Value);

    playerCard3ScoreValue = convertCardValue(card5Value); //hit1
    playerCard4ScoreValue = convertCardValue(card6Value); //hit2
    playerCard5ScoreValue = convertCardValue(card7Value); //hit3
    playerCard6ScoreValue = convertCardValue(card8Value); //hit4

    dealerCard3ScoreValue = convertCardValue(card9Value);
    dealerCard4ScoreValue = convertCardValue(card10Value);
    dealerCard5ScoreValue = convertCardValue(card11Value);
    dealerCard6ScoreValue = convertCardValue(card12Value);

    dealerHand = dealerCard1ScoreValue + dealerCard2ScoreValue;
    playerHand = playerCard1ScoreValue + playerCard2ScoreValue;

    dealerScoreDisplay.textContent = `${dealerCard1ScoreValue}`;
    playerScoreDisplay.textContent = `${playerHand}`;

    if (playerHand == 21) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `BLACK JACK !`;
        dealerDisplay_ON();
        displayDealerMsg.textContent = `Player Wins !`;
    }

    btnDeal_OFF();
    btnHold.style.visibility = "visible";
    btnHit.style.visibility = "visible";

    /* /////////********* DOUBLE *************/ ///////////  */

    btnDouble.addEventListener("click", function() {
        let doubleBet = totalBet * 2;
        console.log("total bet after double = " + totalBet);

        if (doubleBet > cashBalance) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `Insufficient Funds`;
            /*TO DO
        add Timer - then playerDisplay_OFF */
        } else {
            displayBetValue.textContent = `$${doubleBet}`;
        }
        btnDouble_OFF();
    }); //End Double Fx

    /* ///////*********HIT ME *********/ /////////////  */

    btnHit.addEventListener("click", function() {
        countHit++;
        console.log("countHit = " + countHit);
        console.log("card5 = " + card5Value);

        if (countHit == 1) {
            playerCard3.style.visibility = "visible";
            playerCard3Value.style.visibility = "visible";
            playerTotalScore = playerHand + playerCard3ScoreValue;
            playerScoreDisplay.textContent = `${playerTotalScore}`;
        }

        if (countHit == 2) {
            playerCard4.style.visibility = "visible";
            playerCard4Value.style.visibility = "visible";
            playerTotalScore =
                playerHand + playerCard3ScoreValue + playerCard4ScoreValue;
            playerScoreDisplay.textContent = `${playerTotalScore}`;
        }

        if (countHit == 3) {
            playerCard5.style.visibility = "visible";
            playerCard5Value.style.visibility = "visible";
            playerTotalScore =
                playerHand +
                playerCard3ScoreValue +
                playerCard4ScoreValue +
                playerCard5ScoreValue;
            playerScoreDisplay.textContent = `${playerTotalScore}`;
        }

        if (countHit == 4) {
            playerCard6.style.visibility = "visible";
            playerCard6Value.style.visibility = "visible";
            playerTotalScore =
                playerHand +
                playerCard3ScoreValue +
                playerCard4ScoreValue +
                playerCard5ScoreValue +
                playerCard6ScoreValue;
            playerScoreDisplay.textContent = `${playerTotalScore}`;
        }

        if (playerTotalScore > 21) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `Busted`;
        }

        if (playerTotalScore == 21) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `Black Jack!`;
        }
    }); //End Hit Fx
}); // End Deal Fx