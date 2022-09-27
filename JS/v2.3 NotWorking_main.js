"use strict";

console.log("Hello Dud");

// let cashInput = 0;
let betValue = 0;
let dealerHand = 0;
let dealerTotalScore = 0;
let playerHand = 0;
let playerTotalScore = 0;

let hitArray = [];
let hitCount = 0;
let drawCount = 0;
// let cashBalance = 0; //to compute bankroll after a round (+/- totalBet)
let currentBankroll = 0; //bankroll

let totalBet = 0; //$ amount beside token at displayTokenBetPlace

/////////////  GAME BUTTONS  ////////////////////////////////
const btnBuyin = document.querySelector(".btn-buyin-convert");
const inputMoney = document.querySelector(".input-buyin-value");
const btnDeal = document.querySelector(".deal");
const btnDouble = document.querySelector(".btn-double");
const btnHit = document.querySelector(".btn-hit");
const btnHold = document.querySelector(".btn-hold");
const btnReset = document.querySelector(".btn-reset");

///////////////  DISPLAY ////////////////////////////////////
const displayBuyinBtn = document.querySelector(".btn-show-buyin-msg");
const displayCurrentBankroll = document.querySelector(".value");
const displayPlaceBetMsg = document.querySelector(".msg-place-bet");
const displayTokenPlace = document.querySelector(".btn-token-place");
const displayTotalBetAmount = document.querySelector(".bet-amount"); //equals to totalBet
const displayPlayerMsg = document.querySelector(".msg-player");
const displayDealerMsg = document.querySelector(".msg-dealer");
const displayPlayerScore = document.querySelector(".player-score-value");
const displayDealerScore = document.querySelector(".dealer-score-value");

///////////////// TOKENS  ///////////////////////////////////
const token10 = document.querySelector(".btn-token-10");
const token20 = document.querySelector(".btn-token-20");
const token50 = document.querySelector(".btn-token-50");
const token100 = document.querySelector(".btn-token-100");

//////////////  DEALER CARDS  ///////////////////////////////
const dealerCard1 = document.querySelector(".draw2");
const dealerCard2 = document.querySelector(".draw4");
const dealerDraw1 = document.querySelector(".random1");
const dealerDraw2 = document.querySelector(".random2");
const dealerDraw3 = document.querySelector(".random3");
const dealerDraw4 = document.querySelector(".random4");
const dealerCard1Value = document.querySelector(".value-draw2");
const dealerCard2Value = document.querySelector(".value-draw4");
const dealerDraw1Value = document.querySelector(".value-random1");
const dealerDraw2Value = document.querySelector(".value-random2");
const dealerDraw3Value = document.querySelector(".value-random3");
const dealerDraw4Value = document.querySelector(".value-random4");

//////////////  PLAYER CARDS  /////////////////////////////
const playerCard1 = document.querySelector(".draw1");
const playerCard2 = document.querySelector(".draw3");
const playerHit1 = document.querySelector(".hit1");
const playerHit2 = document.querySelector(".hit2");
const playerHit3 = document.querySelector(".hit3");
const playerHit4 = document.querySelector(".hit4");
const playerCard1Value = document.querySelector(".value-draw1");
const playerCard2Value = document.querySelector(".value-draw3");
const playerHit1Value = document.querySelector(".value-hit1");
const playerHit2Value = document.querySelector(".value-hit2");
const playerHit3Value = document.querySelector(".value-hit3");
const playerHit4Value = document.querySelector(".value-hit4");

/////////////   RESET  //////////////////////////
btnReset.addEventListener("click", function() {
    hitArray = [];
    hitCount = 0;

    totalBet = 0;
    displayTotalBetAmount.textContent = "";
    dealerHand = 0;
    dealerTotalScore = 0;
    displayDealerScore.textContent = "";
    playerHand = 0;
    playerTotalScore = 0;
    displayPlayerScore.textContent = "";

    ///  INITIALIZE TO FRAME 1, BANKROLL + PLACE BET //////////////
    btnHit.style.visibility = "hidden";
    btnHold.style.visibility = "hidden";
    btnDeal.style.visibility = "visible";
    btnDouble.style.display = "none";
    // btnBuyin.style.visibility = "hidden";
    // inputMoney.style.visibility = "hidden";
    displayPlaceBetMsg.style.visibility = "visible";
    displayTotalBetAmount.textContent = `$ 00`;
    displayDealerMsg.style.visibility = "hidden";
    displayPlayerMsg.style.visibility = "hidden";
    displayDealerScore.textContent = "00";
    displayPlayerScore.textContent = "00";

    ///  Reformating Token Place to initial style (otherwise it keeps the last token)
    displayTokenPlace.style.visibility = "visible";
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

    ///  CLEAR TABLE (Hide all cards and values) /////////////
    dealerCard1.style.visibility = "hidden";
    dealerCard2.style.visibility = "hidden";
    dealerDraw1.style.visibility = "hidden";
    dealerDraw2.style.visibility = "hidden";
    dealerDraw3.style.visibility = "hidden";
    dealerDraw4.style.visibility = "hidden";
    dealerCard1Value.style.visibility = "hidden";
    dealerCard2Value.style.visibility = "hidden";
    dealerDraw1Value.style.visibility = "hidden";
    dealerDraw2Value.style.visibility = "hidden";
    dealerDraw3Value.style.visibility = "hidden";
    dealerDraw4Value.style.visibility = "hidden";

    playerCard1.style.visibility = "hidden";
    playerCard2.style.visibility = "hidden";
    playerHit1.style.visibility = "hidden";
    playerHit2.style.visibility = "hidden";
    playerHit3.style.visibility = "hidden";
    playerHit4.style.visibility = "hidden";
    playerCard1Value.style.visibility = "hidden";
    playerCard2Value.style.visibility = "hidden";
    playerHit1Value.style.visibility = "hidden";
    playerHit2Value.style.visibility = "hidden";
    playerHit3Value.style.visibility = "hidden";
    playerHit4Value.style.visibility = "hidden";
});

///////////  UTILITY FUNCTIONS  /////////////////////////
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

function isPlayerBust() {
    console.log("playerBust is Called");
    console.log("playerTotalScore = " + playerTotalScore);
    if (playerTotalScore > 21) {
        dealerWins();
        return;
    }
    return;
}

function isDealerBust() {
    console.log("dealerBust is Called");
    console.log("dealerTotalScore = dealerTotalScore");
    if (dealerTotalScore > 21) {
        playerWins();
        return;
    }
    return;
}

function dealerWins() {
    console.log("dealerWins is called");
    if (playerTotalScore > 21) {
        displayDealerMsg.style.visibility = "visible";
        displayDealerMsg.textContent = "Dealer Wins";
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Bust!";
        trackBankroll(dealerWins);
        return;
    } else {
        displayDealerMsg.style.visibility = "visible";
        displayDealerMsg.textContent = "Dealer Wins";
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Dealer Wins";
        // currentBankroll = cashBalance - totalBet;
        // currentBankroll -= totalBet;
        trackBankroll(dealerWins);
        return;
    }
    return;
}

function playerWins() {
    console.log("playerWins is called");
    if (dealerTotalScore > 21) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "You Win";
        displayDealerMsg.style.visibility = "visible";
        displayDealerMsg.textContent = "Bust!";
        trackBankroll(playerWins);
        return;
    } else if (playerHand == 21) {
        let blackjack = blackjack;
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Black Jack!";
        displayDealerMsg.style.visibility = "visible";
        displayDealerMsg.textContent = "Player Wins";
        trackBankroll(blackjack);
        return;
    } else {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "You Win";
        displayDealerMsg.style.visibility = "visible";
        displayDealerMsg.textContent = "Player Wins";
        // currentBankroll = cashBalance + totalBet;
        // currentBankroll += totalBet;
        trackBankroll(playerWins);
        return;
    }
    return;
}

function trackBankroll(winner) {
    // let abc = winner;
    console.log("Bankroll when fx is called = " + currentBankroll);

    if (winner === dealerWins) {
        currentBankroll = currentBankroll - totalBet;
        console.log("dealerWins currentBankroll - totalBet = " + currentBankroll);
        displayCurrentBankroll.textContent = `${currentBankroll}`;
        // } else if (winner === blackjack) {
        //     currentBankroll = currentBankroll + totalBet * 1.5;
        //     return currentBankroll;
    } else if (winner === playerWins) {
        currentBankroll = currentBankroll + totalBet;
        console.log("playerWins currentBankroll + totalBet = " + currentBankroll);
        displayCurrentBankroll.textContent = `${currentBankroll}`;
    }
}

//////////////  CASH MODAL  ////////////////////////////////
displayBuyinBtn.addEventListener("click", function() {
    btnBuyin.style.visibility = "visible";
    inputMoney.style.visibility = "visible";
    inputMoney.value = "";
    displayPlaceBetMsg.style.visibility = "hidden";
});

btnBuyin.addEventListener("click", function() {
    let cashInput = Number(inputMoney.value);
    if (cashInput === 0) {
        displayPlayerMsg.textContent = `enter your cash amount`;
    } else {
        currentBankroll += cashInput;
        btnBuyin.style.visibility = "hidden";
        inputMoney.style.visibility = "hidden";
        displayCurrentBankroll.textContent = `${currentBankroll} $`;
        displayPlaceBetMsg.style.visibility = "visible";
        displayPlayerMsg.style.visibility = "hidden";
    }
});

//////////////PLACE TOKEN (bet via btn-token)
token10.addEventListener("click", function() {
    betValue = 10;
    totalBet += betValue;

    if (currentBankroll == 0) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "you're out of cash";
    } else if (currentBankroll < betValue || currentBankroll < totalBet) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayTotalBetAmount.textContent = `$ ${currentBankroll}`;
        totalBet = currentBankroll;
    } else {
        displayPlayerMsg.style.visibility = "hidden";
        displayTokenPlace.textContent = "10";
        displayTokenPlace.style.border = "solid 15px #1d1da7";
        displayTokenPlace.style.borderStyle = "dashed";
        displayTokenPlace.style.backgroundColor = "#6b6bd8";
        displayTokenPlace.style.padding = "18px";
        displayTokenPlace.style.fontSize = "28px";
        displayTokenPlace.style.fontWeight = "bold";
        displayTokenPlace.style.color = "white";

        displayTotalBetAmount.textContent = `$ ${totalBet}`;
    }
});

token20.addEventListener("click", function() {
    betValue = 20;
    totalBet += betValue;

    if (currentBankroll == 0) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `you're out of cash`;
    } else if (currentBankroll < betValue || currentBankroll < totalBet) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayPlayerMsg.textContent = ``;
        displayTotalBetAmount.textContent = `$ ${currentBankroll}`;
        totalBet = currentBankroll;
    } else {
        displayPlayerMsg.style.visibility = "hidden";
        displayTokenPlace.textContent = "20";
        displayTokenPlace.style.border = "solid 15px #07341e";
        displayTokenPlace.style.borderStyle = "dashed";
        displayTokenPlace.style.backgroundColor = "#3ea268";
        displayTokenPlace.style.padding = "18px";
        displayTokenPlace.style.fontSize = "28px";
        displayTokenPlace.style.fontWeight = "bold";
        displayTokenPlace.style.color = "white";

        displayTotalBetAmount.textContent = `$ ${totalBet}`;
    }
});

token50.addEventListener("click", function() {
    betValue = 50;
    totalBet += betValue;

    if (currentBankroll == 0) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `you're out of cash`;
    } else if (currentBankroll < betValue || currentBankroll < totalBet) {
        totalBet = currentBankroll;
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayTotalBetAmount.textContent = `${currentBankroll} $`;
        totalBet = currentBankroll;
    } else {
        displayPlayerMsg.style.visibility = "hidden";
        displayTokenPlace.textContent = "50";
        displayTokenPlace.style.border = "solid 15px #5a121c";
        displayTokenPlace.style.borderStyle = "dashed";
        displayTokenPlace.style.backgroundColor = "#ff3869";
        displayTokenPlace.style.padding = "18px";
        displayTokenPlace.style.fontSize = "28px";
        displayTokenPlace.style.fontWeight = "bold";
        displayTokenPlace.style.color = "white";
    }
    displayTotalBetAmount.textContent = `$ ${totalBet}`;
});

token100.addEventListener("click", function() {
    betValue = 100;
    totalBet += betValue;
    if (currentBankroll == 0) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `you're out of cash`;
    } else if (currentBankroll < betValue || currentBankroll < totalBet) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `Not enough tokens / ALL IN`;
        displayTotalBetAmount.textContent = `$ ${currentBankroll}`;
        totalBet = currentBankroll;
    } else {
        displayPlayerMsg.style.visibility = "hidden";
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

        displayTotalBetAmount.textContent = `$ ${totalBet}`;
    }
});

//DEAL//////// DEAL /////////DEAL ////////DEAL///////////////
btnDeal.addEventListener("click", function() {
    displayPlayerMsg.style.visibility = "hidden";
    //////  CHECK IF BET PLACED /////////////////
    if (totalBet == 0) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `place your bet first`;
        return;
    }
    //////  SHOW EMPTY CARDS  /////////////////
    playerCard1.style.visibility = "visible";
    playerCard2.style.visibility = "visible";
    dealerCard1.style.visibility = "visible";
    dealerCard2.style.visibility = "visible";

    //////////  DRAW HAND CARDS  /////////////////
    let dealArray = [];
    for (let i = 0; i < 4; i++) {
        dealArray.push(Math.floor(Math.random() * 13) + 1);
    }

    let card1FaceValue = dealArray[0];
    let card2FaceValue = dealArray[1];
    let card3FaceValue = dealArray[2];
    let card4FaceValue = dealArray[3];

    ////////  ACE ? SET CARDS FACE VALUE /////////////////
    card1FaceValue == 1 ?
        (playerCard1Value.textContent = `Ace`) :
        (playerCard1Value.textContent = `${card1FaceValue}`);

    card2FaceValue == 1 ?
        (dealerCard1Value.textContent = `Ace`) :
        (dealerCard1Value.textContent = `${card2FaceValue}`);

    card3FaceValue == 1 ?
        (playerCard2Value.textContent = `Ace`) :
        (playerCard2Value.textContent = `${card3FaceValue}`);

    card4FaceValue == 1 ?
        (dealerCard2Value.textContent = `Ace`) :
        (dealerCard2Value.textContent = `${card4FaceValue}`);

    ///////  SHOW CARDS FACE VALUE ///////////////////
    playerCard1Value.style.visibility = "visible";
    dealerCard1Value.style.visibility = "visible";
    playerCard2Value.style.visibility = "visible";
    dealerCard2Value.style.visibility = "hidden";

    ////////  SET CARDS SCORE VALUE /////////////////
    let playerCard1ScoreValue = convertCardValue(card1FaceValue);
    let dealerCard1ScoreValue = convertCardValue(card2FaceValue);
    let playerCard2ScoreValue = convertCardValue(card3FaceValue);
    let dealerCard2ScoreValue = convertCardValue(card4FaceValue);

    //////////  DISPLAY(HAND) SCORE VALUE ///////////
    dealerHand = dealerCard1ScoreValue + dealerCard2ScoreValue;
    playerHand = playerCard1ScoreValue + playerCard2ScoreValue;
    playerTotalScore = playerHand;
    displayDealerScore.textContent = `${dealerCard1ScoreValue}`;
    displayPlayerScore.textContent = `${playerTotalScore}`;

    ////// CHECK FOR NATURAL BLACKJACK (INSTANT WIN) //////////
    if (playerHand == 21) {
        playerWins();
        displayCurrentBankroll.textContent = `${currentBankroll}`;
    }
    ////////// SWITCH FRAME (HIT and HOLD) ////////////
    btnDeal.style.visibility = "hidden";
    btnHold.style.visibility = "visible";
    btnHit.style.visibility = "visible";

    /* /////////********* DOUBLE *************/ ///////////  */

    //////////// X2 providing cash balance //////////////////
    /*******CHECK THE RULE think hands must >= 9? ******** */
    if (currentBankroll !== totalBet && currentBankroll >= totalBet * 2) {
        displayPlaceBetMsg.style.visibility = "hidden";
        btnDouble.style.display = "flex";
    }

    btnDouble.addEventListener("click", function() {
        let doubleBet = totalBet * 2;
        console.log("total bet after double = " + totalBet);

        if (doubleBet > currentBankroll) {
            playerDisplay_ON();
            displayPlayerMsg.textContent = `Insufficient Funds`;
            /*TO DO
        add Timer - then playerDisplay_OFF */
        } else {
            displayTotalBetAmount.textContent = `$ ${doubleBet}`;
        }
        btnDouble.style.visibility = "hidden";
    }); //End Double Fx
}); // End Deal Fx

//HIT/////HIT/////////HIT////////HIT ///////////// HIT //////////
btnHit.addEventListener("click", function() {
    btnDouble.style.display = "none";
    hitCount++;
    console.log("hitCount when Hit is called = " + hitCount);

    ////  RESET SCORE VALUES
    let playerHit1ScoreValue = 0;
    let playerHit2ScoreValue = 0;
    let playerHit3ScoreValue = 0;
    let playerHit4ScoreValue = 0;

    /////////////  FIRST HIT  ///////////////////////
    if ((hitCount = 1)) {
        let hit1FaceValue = Math.floor(Math.random() * 13) + 1;
        // hitCount = 1;
        ////  Display Card and CardValue
        playerHit1.style.visibility = "visible";
        playerHit1Value.style.visibility = "visible";
        hit1FaceValue == 1 ?
            (playerHit1Value.textContent = `Ace`) :
            (playerHit1Value.textContent = `${hit1FaceValue}`);
        //// Convert CardValue into CardScore
        playerHit1ScoreValue = convertCardValue(hit1FaceValue);
        //// Add Score Values and display in Player Score
        playerTotalScore = playerHand + playerHit1ScoreValue;
        displayPlayerScore.textContent = `${playerTotalScore}`;
        isPlayerBust();
        // return;
    }

    /////////////  SECOND HIT ///////////////////////
    else if ((hitCount = 2)) {
        let hit2FaceValue = Math.floor(Math.random() * 13) + 1;
        hitCount = 2;
        playerHit2.style.visibility = "visible";
        playerHit2Value.style.visibility = "visible";
        hit2FaceValue == 1 ?
            (playerHit2Value.textContent = `Ace`) :
            (playerHit2Value.textContent = `${hit2FaceValue}`);
        playerHit2ScoreValue = convertCardValue(hit2FaceValue);
        playerTotalScore = playerHand + playerHit1ScoreValue + playerHit2ScoreValue;
        displayPlayerScore.textContent = `${playerTotalScore}`;
        isPlayerBust();
        // return;
    }
    // for (let i = 0; i <= hitArray.length; i++) {
    //     hitArray.push(Math.floor(Math.random() * 13) + 1);
    // }
    // console.log("this is hitArray " + hitArray);
    // hitCount++;
    // console.log("hitCount = " + hitCount);

    // let hit1FaceValue = hitArray[0];
    // let hit2FaceValue = hitArray[1];
    // let hit3FaceValue = hitArray[2];
    // let hit4FaceValue = hitArray[3];

    //////  ACE ?  DIAPLAY CARDS FACE VALUE//////////////
    // hit1FaceValue == 1 ?
    //     (playerHit1Value.textContent = `Ace`) :
    //     (playerHit1Value.textContent = `${hit1FaceValue}`);

    // hit2FaceValue == 1 ?
    //     (playerHit2Value.textContent = `Ace`) :
    //     (playerHit2Value.textContent = `${hit2FaceValue}`);

    // hit3FaceValue == 1 ?
    //     (playerHit3Value.textContent = `Ace`) :
    //     (playerHit3Value.textContent = `${hit3FaceValue}`);

    // hit4FaceValue == 1 ?
    //     (playerHit4Value.textContent = `Ace`) :
    //     (playerHit4Value.textContent = `${hit4FaceValue}`);

    /////////  SET CARD SCORE VALUE /////////////

    // let hit1ScoreValue = convertCardValue(hit1FaceValue);
    // let hit2ScoreValue = convertCardValue(hit2FaceValue);
    // let hit3ScoreValue = convertCardValue(hit3FaceValue);
    // let hit4ScoreValue = convertCardValue(hit4FaceValue);

    ///////  DISPLAY CARDS and PLAYER SCORE  ///////////
    // if (hitCount == 1) {
    //     playerHit1.style.visibility = "visible"; //display card
    //     playerHit1Value.style.visibility = "visible"; //display value
    //     playerTotalScore = playerHand + hit1ScoreValue;
    //     displayPlayerScore.textContent = `${playerTotalScore}`;
    //     isPlayerBust();
    //     return;
    // }

    // if (hitCount == 2) {
    //     playerHit2.style.visibility = "visible";
    //     playerHit2Value.style.visibility = "visible";
    //     playerTotalScore = playerHand + hit1ScoreValue + hit2ScoreValue;
    //     displayPlayerScore.textContent = `${playerTotalScore}`;
    //     isPlayerBust();
    //     return;
    // }

    // if (hitCount == 3) {
    //     playerHit3.style.visibility = "visible";
    //     playerHit3Value.style.visibility = "visible";
    //     playerTotalScore =
    //         playerHand + hit1ScoreValue + hit2ScoreValue + hit3ScoreValue;
    //     displayPlayerScore.textContent = `${playerTotalScore}`;
    //     isPlayerBust();
    // }

    // if (hitCount == 4) {
    //     playerHit4.style.visibility = "visible";
    //     playerHit4Value.style.visibility = "visible";
    //     playerTotalScore =
    //         playerHand +
    //         hit1ScoreValue +
    //         hit2ScoreValue +
    //         hit3ScoreValue +
    //         hit4ScoreValue;
    //     displayPlayerScore.textContent = `${playerTotalScore}`;
    //     isPlayerBust();
    // }
}); //End Hit Fx

//////////////  HOLD (Stand)   //////////////////////////////
btnHold.addEventListener("click", function() {
    console.log("dealerHand when Fx Hold is called = " + dealerHand);
    ////  RESET SCORE VALUES
    let dealerDraw1ScoreValue = 0;
    let dealerDraw2ScoreValue = 0;
    let dealerDraw3ScoreValue = 0;
    let dealerDraw4ScoreValue = 0;

    /////  DISPLAY DEALER HAND AND SCORE  ////////////////
    dealerCard2Value.style.visibility = "visible";
    displayDealerScore.textContent = `${dealerHand}`;

    ///// IF DEALER HAND >= 17 (Must Stay) //////////////
    if (dealerHand >= 17 && dealerHand > playerTotalScore) {
        dealerWins();
    } else if (dealerHand == playerTotalScore) {
        dealerWins();
    } else {
        playerWins();
    }

    ///// IF DEALER HAND < 17 (Must Draw) //////////////
    if (dealerHand < 17) {
        /////////////  FIRST DRAW  ///////////////////////
        let draw1FaceValue = Math.floor(Math.random() * 13) + 1;
        drawCount = 1;
        dealerDraw1.style.visibility = "visible";
        dealerDraw1Value.style.visibility = "visible";
        draw1FaceValue == 1 ?
            (dealerDraw1Value.textContent = `Ace`) :
            (dealerDraw1Value.textContent = `${draw1FaceValue}`);
        dealerDraw1ScoreValue = convertCardValue(draw1FaceValue);
        dealerTotalScore = dealerHand + dealerDraw1ScoreValue;
        displayDealerScore.textContent = `${dealerTotalScore}`;
        isDealerBust();
        // return;
    }

    /////////// DEALER SCORE < PLAYER SCORE AFTER DRAW
    //////////////  DRAW AGAIN (2nd DRAW) ///////////////////

    if (dealerHand < 17 && dealerTotalScore < playerTotalScore && drawCount == 1) {
        let draw2FaceValue = Math.floor(Math.random() * 13) + 1;
        drawCount = 2;
        dealerDraw2.style.visibility = "visible";
        dealerDraw2Value.style.visibility = "visible";
        draw2FaceValue == 1 ?
            (dealerDraw2Value.textContent = `Ace`) :
            (dealerDraw2Value.textContent = `${draw2FaceValue}`);
        dealerDraw2ScoreValue = convertCardValue(draw2FaceValue);
        dealerTotalScore = dealerHand + dealerDraw1ScoreValue + dealerDraw2ScoreValue;
        displayDealerScore.textContent = `${dealerTotalScore}`;
        isDealerBust();
    }

    //////////  RESULTS  WINNER-LOOSER
    /////////  DEALER SCORE > PLAYER SCORE  ///////////////
    if (dealerTotalScore > playerTotalScore) {
        dealerWins();
        // currentBankroll = currentBankroll;
        displayCurrentBankroll.textContent = `${currentBankroll}`;
    }

    //////////  EVEN SCORE (dealer wins)  //////////////
    if (dealerTotalScore == playerTotalScore) {
        dealerWins();
        displayCurrentBankroll.textContent = `${currentBankroll}`;
    }
});