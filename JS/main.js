"use strict";

console.log("Hello Dud");

let shoeBox = [];
let countHit = 0;
let cashBalance = 0;
let currentBankroll = 0; //bankroll
let displayBet = 0; // face value of bet
let totalBet = 0; //$ amount beside token

/* /// ********** GAME btn *********/ ///////////// */
const btnDeal = document.querySelector(".deal");
const btnDouble = document.querySelector(".btn-double");
const btnHit = document.querySelector(".btn-hit");
const btnHold = document.querySelector(".btn-hold");
const btnReset = document.querySelector(".btn-reset"); // TEMP to trigger FX Reset

const displayCurrentBankroll = document.querySelector(".value");
const displayPlaceBet = document.querySelector(".msg-place-bet");
const displayTokenPlace = document.querySelector(".btn-token-place");
const displayBetValue = document.querySelector(".bet-amount");
const displayPlayerMsg = document.querySelector(".msg-player");
const displayDealerMsg = document.querySelector(".msg-dealer");
const displayPlayerScore = document.querySelector(".player-score-value");
const displayDealerScore = document.querySelector(".dealer-score-value");

/* /// ********** CENTER / CASH btn *********/ /////////////////// */
const btnBuyin = document.querySelector(".btn-buyin-convert");
const inputMoney = document.querySelector(".input-buyin-value");
const btnShowBuyin = document.querySelector(".btn-show-buyin-msg");

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

function dealerWins() {
    displayDealerMsg.style.visibility = "visible";
    displayDealerMsg.textContent = "Dealer Wins";
    currentBankroll = cashBalance - totalBet;
    displayCurrentBankroll.textContent = `${currentBankroll}`;
}

function playerWins() {
    displayPlayerMsg.style.visibility = "visible";
    displayPlayerMsg.textContent = "You Win";
    currentBankroll = cashBalance + totalBet;
    displayCurrentBankroll.textContent = `${currentBankroll}`;
}

///////////      RESET      //////////////////////////////////
btnReset.addEventListener("click", function() {
    countHit = 0;
    totalBet = 0;
    shoeBox = [];

    btnHit.style.visibility = "hidden";
    btnHold.style.visibility = "hidden";
    btnDeal.style.visibility = "visible";
    btnDouble.style.display = "none";

    btnBuyin.style.visibility = "hidden";
    inputMoney.style.visibility = "hidden";
    displayPlaceBet.style.visibility = "visible";
    displayTokenPlace.style.visibility = "visible";
    displayBetValue.textContent = "$";
    displayDealerMsg.style.visibility = "hidden";
    displayPlayerMsg.style.visibility = "hidden";
    displayDealerScore.textContent = "";
    displayPlayerScore.textContent = "";

    displayTokenPlace.textContent = `token`;
    displayTokenPlace.style.textAlign = "center";
    displayTokenPlace.style.fontSize = "20px";
    displayTokenPlace.style.fontWeight = "bold";
    displayTokenPlace.style.color = "purple";
    displayTokenPlace.style.border = "solid 12px";
    displayTokenPlace.style.borderStyle = "dashed";
    displayTokenPlace.style.borderColor = "#80080";
    displayTokenPlace.style.padding = "15px";
    displayTokenPlace.style.paddingTop = "28px";
    displayTokenPlace.style.paddingBottom = "28px";
    displayTokenPlace.style.borderRadius = "50%";
    displayTokenPlace.style.backgroundColor = "#e4cfb8";

    dealerCard1.style.visibility = "hidden";
    dealerCard2.style.visibility = "hidden";
    dealerCard3.style.visibility = "hidden";
    dealerCard4.style.visibility = "hidden";
    dealerCard5.style.visibility = "hidden";
    dealerCard6.style.visibility = "hidden";

    dealerCard1Value.style.visibility = "hidden";
    dealerCard2Value.style.visibility = "hidden";
    dealerCard3Value.style.visibility = "hidden";
    dealerCard4Value.style.visibility = "hidden";
    dealerCard5Value.style.visibility = "hidden";
    dealerCard6Value.style.visibility = "hidden";

    //  dealerCard1ScoreValue = 0;
    //  dealerCard2ScoreValue = 0;
    //  dealerCard3ScoreValue = 0;
    //  dealerCard4ScoreValue = 0;
    //  dealerCard5ScoreValue = 0;
    //  dealerCard6ScoreValue = 0;

    dealerHand = 0;
    dealerTotalScore = 0;

    playerCard1.style.visibility = "hidden";
    playerCard2.style.visibility = "hidden";
    playerCard3.style.visibility = "hidden";
    playerCard4.style.visibility = "hidden";
    playerCard5.style.visibility = "hidden";
    playerCard6.style.visibility = "hidden";

    playerCard1Value.style.visibility = "hidden";
    playerCard2Value.style.visibility = "hidden";
    playerCard3Value.style.visibility = "hidden";
    playerCard4Value.style.visibility = "hidden";
    playerCard5Value.style.visibility = "hidden";
    playerCard6Value.style.visibility = "hidden";

    // let playerCard1ScoreValue = 0;
    // let playerCard2ScoreValue = 0;
    // let playerCard3ScoreValue = 0;
    // let playerCard4ScoreValue = 0;
    // let playerCard5ScoreValue = 0;
    // let playerCard6ScoreValue = 0;

    playerHand = 0;
    playerTotalScore = 0;
});

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
        currentBankroll += cashValue;
        cashBalance = currentBankroll;
        console.log("currentBankroll after Buy-in = " + currentBankroll);
        btnBuyin.style.visibility = "hidden";
        inputMoney.style.visibility = "hidden";

        displayCurrentBankroll.textContent = `${currentBankroll} $`;

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

    if (currentBankroll == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = "you have zero token";
    } else if (currentBankroll < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${currentBankroll} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 10;
        totalBet += displayBet;

        displayTokenPlace.textContent = "10";
        displayTokenPlace.style.border = "solid 15px #1d1da7";
        displayTokenPlace.style.borderStyle = "dashed";
        displayTokenPlace.style.backgroundColor = "#6b6bd8";
        displayTokenPlace.style.padding = "18px";
        displayTokenPlace.style.fontSize = "28px";
        displayTokenPlace.style.fontWeight = "bold";
        displayTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

token20.addEventListener("click", function() {
    if (currentBankroll == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `You have zero token`;
    } else if (currentBankroll < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayPlayerMsg.textContent = ``;
        displayBetValue.textContent = `${currentBankroll} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 20;
        totalBet += displayBet;

        displayTokenPlace.textContent = "20";
        displayTokenPlace.style.border = "solid 15px #07341e";
        displayTokenPlace.style.borderStyle = "dashed";
        displayTokenPlace.style.backgroundColor = "#3ea268";
        displayTokenPlace.style.padding = "18px";
        displayTokenPlace.style.fontSize = "28px";
        displayTokenPlace.style.fontWeight = "bold";
        displayTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

token50.addEventListener("click", function() {
    if (currentBankroll == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `You must buy-in first`;
    } else if (currentBankroll < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${currentBankroll} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 50;
        totalBet += displayBet;

        displayTokenPlace.textContent = "50";
        displayTokenPlace.style.border = "solid 15px #5a121c";
        displayTokenPlace.style.borderStyle = "dashed";
        displayTokenPlace.style.backgroundColor = "#ff3869";
        displayTokenPlace.style.padding = "18px";
        displayTokenPlace.style.fontSize = "28px";
        displayTokenPlace.style.fontWeight = "bold";
        displayTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

token100.addEventListener("click", function() {
    if (currentBankroll == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `You must buy-in first`;
    } else if (currentBankroll < totalBet) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayBetValue.textContent = `${currentBankroll} $`;
    } else {
        playerDisplay_OFF();
        displayBet = 100;
        totalBet += displayBet;

        displayTokenPlace.textContent = "100";
        displayTokenPlace.style.border = "solid 15px #664c09";
        displayTokenPlace.style.borderStyle = "dashed";
        displayTokenPlace.style.backgroundColor = "#c3985c";
        displayTokenPlace.style.borderRadius = "65%";
        displayTokenPlace.style.padding = "10px";
        displayTokenPlace.style.paddingTop = "18px";
        displayTokenPlace.style.paddingBottom = "18px";
        displayTokenPlace.style.fontSize = "28px";
        displayTokenPlace.style.fontWeight = "bold";
        displayTokenPlace.style.color = "white";

        displayBetValue.textContent = `$${totalBet}`;
    }
});

////////////////////// DEAL ////////////////////////
btnDeal.addEventListener("click", function() {
    countHit = 0;
    console.log("hit count after btnDeal = " + countHit);
    playerDisplay_OFF();

    if (totalBet == 0) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `place your bet first`;
        return;
    }

    playerCard1.style.visibility = "visible";
    playerCard1Value.style.visibility = "visible";
    playerCard2.style.visibility = "visible";
    playerCard2Value.style.visibility = "visible";
    dealerCard1.style.visibility = "visible";
    dealerCard1Value.style.visibility = "visible";
    dealerCard2.style.visibility = "visible";

    //////////// X2 providing cash balance //////////////////
    if (currentBankroll !== totalBet && currentBankroll >= totalBet * 2) {
        placeBetMsg_OFF();
        btnDouble.style.display = "flex";
    }

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

    displayDealerScore.textContent = `${dealerCard1ScoreValue}`;
    displayPlayerScore.textContent = `${playerHand}`;

    if (playerHand == 21) {
        playerDisplay_ON();
        displayPlayerMsg.textContent = `BLACK JACK !`;
        dealerDisplay_ON();
        displayDealerMsg.textContent = `Player Wins !`;
        currentBankroll = cashBalance + totalBet * 1.5;
    }

    btnDeal_OFF();
    btnHold.style.visibility = "visible";
    btnHit.style.visibility = "visible";

    /* /////////********* DOUBLE *************/ ///////////  */

    btnDouble.addEventListener("click", function() {
        let doubleBet = totalBet * 2;
        console.log("total bet after double = " + totalBet);

        if (doubleBet > currentBankroll) {
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
        console.log("hit count after btnHit = " + countHit);

        if (countHit == 0) {
            playerCard3.style.visibility = "visible";
            playerCard3Value.style.visibility = "visible";
            playerTotalScore = playerHand + playerCard3ScoreValue;
            displayPlayerScore.textContent = `${playerTotalScore}`;
            countHit = 1;
        }

        console.log("hit1 playerTotalScore = " + playerTotalScore);

        if (playerTotalScore == 21) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `BLACK JACK !`;
            dealerDisplay_ON();
            displayDealerMsg.textContent = `Player Wins !`;
            currentBankroll = cashBalance + totalBet * 1.5;
        }

        if (playerTotalScore > 21) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `BUSTED`;
            dealerDisplay_ON();
            displayDealerMsg.textContent = `Dealer Wins !`;
            currentBankroll = cashBalance - totalBet;
        }

        if (countHit == 1) {
            playerCard4.style.visibility = "visible";
            playerCard4Value.style.visibility = "visible";
            playerTotalScore =
                playerHand + playerCard3ScoreValue + playerCard4ScoreValue;
            displayPlayerScore.textContent = `${playerTotalScore}`;
            countHit = 2;
        }

        if (countHit == 3) {
            playerCard5.style.visibility = "visible";
            playerCard5Value.style.visibility = "visible";
            playerTotalScore =
                playerHand +
                playerCard3ScoreValue +
                playerCard4ScoreValue +
                playerCard5ScoreValue;
            displayPlayerScore.textContent = `${playerTotalScore}`;
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
            displayPlayerScore.textContent = `${playerTotalScore}`;
        }

        if (playerTotalScore > 21) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `Busted`;
            currentBankroll = cashBalance - totalBet;
            displayCurrentBankroll.textContent = `${currentBankroll}`;
        }

        if (playerTotalScore == 21) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `Black Jack!`;
            currentBankroll = cashBalance + totalBet * 1.5;
        }
    }); //End Hit Fx

    /* ///////*********HOLD (Stand) *********/ /////////////  */
    btnHold.addEventListener("click", function() {
        /* //////////DEALER HAND //////////////// */
        dealerCard2Value.style.visibility = "visible";
        // dealerTotalScore = dealerHand;
        displayDealerScore.textContent = `${dealerHand}`;

        /////// DEALER HAND >= 17 ///Must Stay //////////////
        if (dealerHand >= playerTotalScore) {
            dealerWins();
        } else if (dealerHand > 16 && dealerHand < playerTotalScore) {
            playerWins();
        } else if (dealerHand > 16 && dealerHand > playerTotalScore) {
            dealerWins();
        }

        /////// DEALER HAND < 17 ///Must Draw //////////////
        if (dealerHand < 17) {
            dealerCard3.style.visibility = "visible";
            dealerCard3Value.style.visibility = "visible";
            dealerTotalScore = dealerHand + dealerCard3ScoreValue;
            displayDealerScore.textContent = `${dealerTotalScore}`;
        }

        console.log("dealerTotalScore after 1st draw = " + dealerTotalScore);
        if (dealerTotalScore > playerTotalScore && dealerTotalScore <= 21) {
            dealerWins();
        } else {
            playerWins();
        }
    }); // End Hold Fx
}); // End Deal Fx