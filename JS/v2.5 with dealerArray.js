"use strict";

console.log("Running v2.5 with drawArray.js");

let cashInput = 0;
let dealerHand = 0;
let dealerTotalScore = 0;
let playerHand = 0;
let playerTotalScore = 0;

let hitCount = 0;
let hitRandom = 0;
let hit1ScoreValue = 0;
let hit2ScoreValue = 0;
let hit3ScoreValue = 0;
let hit4ScoreValue = 0;
// let hitArray = [];
let drawCount = 0;
let dealerArray = [];

let cashBalance = 0; //to compute bankroll after a round (+/- totalBet)
let currentBankroll = 0; //bankroll
let betValue = 0; // to compute totalBet by adding value of individual tokens
let totalBet = 0; //$ amount beside token at displayTokenBetPlace

/////////////GAME BUTTONS /////////////////////////////////
const btnBuyin = document.querySelector(".btn-buyin-convert");
const inputMoney = document.querySelector(".input-buyin-value");

const btnDeal = document.querySelector(".deal");
const btnDouble = document.querySelector(".btn-double");
const btnHit = document.querySelector(".btn-hit");
const btnHold = document.querySelector(".btn-hold");
const btnReset = document.querySelector(".btn-reset");

//////////////////// DISPLAY ////////////////////////////////////
const displayBuyinBtn = document.querySelector(".btn-show-buyin-msg");
const displayCurrentBankroll = document.querySelector(".value");
const displayPlaceBetMsg = document.querySelector(".msg-place-bet");
const displayTokenPlace = document.querySelector(".btn-token-place");
const displayTotalBetAmount = document.querySelector(".bet-amount"); //equals to totalBet
const displayPlayerMsg = document.querySelector(".msg-player");
const displayDealerMsg = document.querySelector(".msg-dealer");
const displayPlayerScore = document.querySelector(".player-score-value");
const displayDealerScore = document.querySelector(".dealer-score-value");

//////////////// TOKENS/////////////////// //
const token10 = document.querySelector(".btn-token-10");
const token20 = document.querySelector(".btn-token-20");
const token50 = document.querySelector(".btn-token-50");
const token100 = document.querySelector(".btn-token-100");

/*****************DEALER CARDS*******************/
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

/*****************PLAYER CARDS*******************/
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
    ///After HOLD

    // cashInput = 0;
    // inputMoney.style.textContent = "";
    // inputMoney.value = "";
    totalBet = 0;
    displayTotalBetAmount.textContent = "";
    dealerHand = 0;
    dealerTotalScore = 0;
    displayDealerScore.textContent = "00";
    playerHand = 0;
    playerTotalScore = 0;
    displayPlayerScore.textContent = "00";

    hitCount = 0;
    hit1ScoreValue = 0;
    hit2ScoreValue = 0;
    hit3ScoreValue = 0;
    hit4ScoreValue = 0;
    // hitArray = [];
    dealerArray = [];
    drawCount = 0;

    btnHit.style.visibility = "hidden";
    btnHold.style.visibility = "hidden";
    btnDeal.style.visibility = "visible";
    btnDouble.style.display = "none";

    btnBuyin.style.visibility = "hidden";
    inputMoney.style.visibility = "hidden";
    displayPlaceBetMsg.style.visibility = "visible";
    displayTotalBetAmount.textContent = `$ 00`;

    displayDealerMsg.style.visibility = "hidden";
    displayPlayerMsg.style.visibility = "hidden";

    /////Reformating Token Place to initial style (otherwise it keeps the last token)
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

    ///Hidding ALL CARDS and VALUES ///////////////
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

/***************UTILITY FUNCTIONS ******************** */

//************************************************************ */
//                    THE ACE PUZZLE - TRY WITH ACE ARRAY PUSH..
//************************************************************ */
function convertCardValue(card) {
    if (card == 1) {
        return 11;
    } else if (card >= 10) {
        return 10;
    } else {
        return card;
    }
}

//************************************************************ */

function trackBankroll(winner) {
    console.log("trackBankroll is called");
    if (winner == dealerWins) {
        currentBankroll = currentBankroll - totalBet;
        displayCurrentBankroll.textContent = `${currentBankroll}`;
        return;
    } else if (winner == blackjack) {
        currentBankroll = currentBankroll + totalBet * 1.5;
        displayCurrentBankroll.textContent = `${currentBankroll}`;
        return;
    } else if (winner == playerWins) {
        currentBankroll = currentBankroll + totalBet;
        displayCurrentBankroll.textContent = `${currentBankroll}`;
        return;
    }
    return;
}

function isPlayerBust() {
    console.log("playerBust is called");
    if (playerTotalScore > 21) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Bust!";
        displayDealerMsg.style.visibility = "visible";
        displayDealerMsg.textContent = "Dealer Wins";
        trackBankroll(dealerWins);
    }
}

function isDealerBust() {
    console.log("dealerBust is called");
    if (dealerTotalScore > 21) {
        displayDealerMsg.style.visibility = "visible";
        displayDealerMsg.textContent = "Bust!";
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "You Win";
        trackBankroll(playerWins);
    }
}

function dealerWins() {
    console.log("dealerWins is called");

    displayDealerMsg.style.visibility = "visible";
    displayDealerMsg.textContent = "Dealer Wins";
    displayPlayerMsg.style.visibility = "visible";
    displayPlayerMsg.textContent = "Dealer Wins";
    trackBankroll(dealerWins);
    return;
}

function blackjack() {
    // if (playerHand == 21) {
    console.log("blackjack is called");
    displayPlayerMsg.style.visibility = "visible";
    displayPlayerMsg.textContent = "Black Jack!";
    displayDealerMsg.style.visibility = "visible";
    displayDealerMsg.textContent = "Player Wins";
    trackBankroll(blackjack);
    return;
    // }
}

function playerWins() {
    console.log("playerWins is called");
    displayPlayerMsg.style.visibility = "visible";
    displayPlayerMsg.textContent = "You Win";
    displayDealerMsg.style.visibility = "visible";
    displayDealerMsg.textContent = "Player Wins";
    trackBankroll(playerWins);
    return;
}

// ////////CASH MODAL ////////////////
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
        // cashBalance = currentBankroll;
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
        totalBet = currentBankroll;
        // displayTotalBetAmount.textContent = `$ ${currentBankroll}`;
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
    }
    displayTotalBetAmount.textContent = `$ ${totalBet}`;
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
        totalBet = currentBankroll;
        // displayTotalBetAmount.textContent = `$ ${currentBankroll}`;
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
    }
    displayTotalBetAmount.textContent = `$ ${totalBet}`;
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
        totalBet = currentBankroll;
        // displayTotalBetAmount.textContent = `${currentBankroll} $`;
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
    }
    displayTotalBetAmount.textContent = `$ ${totalBet}`;
});

//DEAL//////// DEAL /////////DEAL ////////DEAL///////////////
btnDeal.addEventListener("click", function() {
    displayPlayerMsg.style.visibility = "hidden";

    ////  CHECK IF THERE IS A BET  /////////////
    if (totalBet == 0) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = `place your bet first`;
        return;
    }

    ////  SHOW EMPTY CARDS  /////////
    playerCard1.style.visibility = "visible";
    playerCard2.style.visibility = "visible";
    dealerCard1.style.visibility = "visible";
    dealerCard2.style.visibility = "visible";

    ////  DRAW HAND CARDS  ///////////
    let dealArray = [];
    for (let i = 0; i < 4; i++) {
        dealArray.push(Math.floor(Math.random() * 13) + 1);
    }

    let card1FaceValue = dealArray[0];
    let card2FaceValue = dealArray[1];
    let card3FaceValue = dealArray[2];
    let card4FaceValue = dealArray[3];

    ////  SET HAND CARDS FACE VALUE ////////////
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

    ////  SHOW HAND CARDS FACE VALUE /////////////////
    playerCard1Value.style.visibility = "visible";
    dealerCard1Value.style.visibility = "visible";
    playerCard2Value.style.visibility = "visible";
    dealerCard2Value.style.visibility = "hidden";

    ////  SET HAND CARDS SCORE VALUE /////////////////
    let playerCard1ScoreValue = convertCardValue(card1FaceValue);
    let dealerCard1ScoreValue = convertCardValue(card2FaceValue);
    let playerCard2ScoreValue = convertCardValue(card3FaceValue);
    let dealerCard2ScoreValue = convertCardValue(card4FaceValue);

    ////  COMPUTE AND DISPLAY(HAND) SCORE  ///////////
    playerHand = playerCard1ScoreValue + playerCard2ScoreValue;
    playerTotalScore = playerHand; // Need to use total Score to compare with dealer draws when HOLD on handScore (i.e no hits)
    if (playerHand > 21) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Sorry No Split Allowed";
        playerHand == 12;
        playerTotalScore == 12;
        displayPlayerScore.textContent = `${playerTotalScore}`;
    } else if (card1FaceValue == card3FaceValue) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Sorry No Split Allowed";
        displayPlayerScore.textContent = `${playerTotalScore}`;
    } else {
        displayPlayerScore.textContent = `${playerTotalScore}`;
    }

    dealerHand = dealerCard1ScoreValue + dealerCard2ScoreValue;
    // playerHand = playerCard1ScoreValue + playerCard2ScoreValue;
    // playerTotalScore = playerHand;
    // dealerTotalScore = dealerHand;
    displayDealerScore.textContent = `${dealerCard1ScoreValue}`;
    // displayPlayerScore.textContent = `${playerTotalScore}`;

    ////  CHECK FOR NATURAL BLACKJACK (INSTANT WIN) //////////
    if (playerHand == 21) {
        blackjack();
    }

    ////  SWITCH FRAME (HIT and HOLD) ////////////
    btnDeal.style.visibility = "hidden";
    btnHold.style.visibility = "visible";
    btnHit.style.visibility = "visible";

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
    ////  TURN OFF x2 (Double Option)  //////////
    btnDouble.style.display = "none";

    ////  DRAW RANDOM CARD ON CLICK AND COUNT  //////////////////
    hitRandom = Math.floor(Math.random() * 13) + 1;
    hitCount++;
    console.log("hitRandom = " + hitRandom);
    console.log("hitCount = " + hitCount);

    ///////  HIT 1 (click)  //////////////
    if (hitCount == 1) {
        //  CHECK IF ACE  ///////////
        hitRandom == 1 ?
            (playerHit1Value.textContent = `Ace`) :
            (playerHit1Value.textContent = `${hitRandom}`);

        //  CONVERT FACE VALUE TO SCORE VALUE  /////////
        hit1ScoreValue = convertCardValue(hitRandom);

        //  DISPLAY CARDS and PLAYER SCORE  ///////////
        playerHit1.style.visibility = "visible"; //display card
        playerHit1Value.style.visibility = "visible"; //display value
        playerTotalScore = playerHand + hit1ScoreValue;
        displayPlayerScore.textContent = `${playerTotalScore}`;
        isPlayerBust();

        ///////  HIT 2 (click)  //////////////
    } else if (hitCount == 2) {
        //  CHECK IF ACE  ///////////
        hitRandom == 1 ?
            (playerHit2Value.textContent = `Ace`) :
            (playerHit2Value.textContent = `${hitRandom}`);

        //  CONVERT FACE VALUE TO SCORE VALUE  /////////
        hit2ScoreValue = convertCardValue(hitRandom);

        //  DISPLAY CARDS and PLAYER SCORE  ///////////
        playerHit2.style.visibility = "visible"; //display card
        playerHit2Value.style.visibility = "visible"; //display value
        playerTotalScore = playerHand + hit1ScoreValue + hit2ScoreValue;
        displayPlayerScore.textContent = `${playerTotalScore}`;
        isPlayerBust();
    }
    ///////  HIT 3 (click)  //////////////
    else if (hitCount == 3) {
        //  CHECK IF ACE  ///////////
        hitRandom == 1 ?
            (playerHit3Value.textContent = `Ace`) :
            (playerHit3Value.textContent = `${hitRandom}`);

        //  CONVERT FACE VALUE TO SCORE VALUE  /////////
        hit3ScoreValue = convertCardValue(hitRandom);

        //  DISPLAY CARDS and PLAYER SCORE  ///////////
        playerHit3.style.visibility = "visible"; //display card
        playerHit3Value.style.visibility = "visible"; //display value
        playerTotalScore =
            playerHand + hit1ScoreValue + hit2ScoreValue + hit3ScoreValue;
        displayPlayerScore.textContent = `${playerTotalScore}`;
        isPlayerBust();
    }

    ///////  HIT 4 (click)  //////////////
    else if (hitCount == 4) {
        //  CHECK IF ACE  ///////////
        hitRandom == 1 ?
            (playerHit4Value.textContent = `Ace`) :
            (playerHit4Value.textContent = `${hitRandom}`);

        //  CONVERT FACE VALUE TO SCORE VALUE  /////////
        hit4ScoreValue = convertCardValue(hitRandom);

        //  DISPLAY CARDS and PLAYER SCORE  ///////////
        playerHit4.style.visibility = "visible"; //display card
        playerHit4Value.style.visibility = "visible"; //display value
        playerTotalScore =
            playerHand +
            hit1ScoreValue +
            hit2ScoreValue +
            hit3ScoreValue +
            hit4ScoreValue;
        displayPlayerScore.textContent = `${playerTotalScore}`;
        isPlayerBust();
    }
}); //End Hit Fx

/////////////  HOLD (Stand)  ////////////////////////////
btnHold.addEventListener("click", function() {
    let drawCount = 0;
    console.log("dealerHand at HOLD = " + dealerHand);

    //// SHOW DEALER HAND and DISPLAY SCORE
    dealerCard2Value.style.visibility = "visible";
    displayDealerScore.textContent = `${dealerHand}`;

    ////  DEALER MUST STAY (Hand Score >= 17)  /////
    if (dealerHand >= 17 && dealerHand >= playerTotalScore) {
        dealerWins();
    } else if (dealerHand >= 17 && dealerHand < playerTotalScore) {
        playerWins();
    } // end of "IF Dealer Must Stay (>= 17) "

    ////  DEALER MUST DRAW (Hand Score < 17  //////////
    if (dealerHand < 17) {
        for (let i = 0; i < 4; i++) {
            dealerArray.push(Math.floor(Math.random() * 13) + 1);
        }
        console.log("dealerArray = " + dealerArray);

        /////  SET 4 DRAWS FACE-VALUE AND SCORE-VALUE  //////
        let draw1Value = dealerArray[0];
        draw1Value == 1 ?
            (dealerDraw1Value.textContent = "Ace") :
            (dealerDraw1Value.textContent = `${draw1Value}`);
        let draw1Score = convertCardValue(draw1Value);

        let draw2Value = dealerArray[1];
        draw2Value == 1 ?
            (dealerDraw2Value.textContent = "Ace") :
            (dealerDraw2Value.textContent = `${draw2Value}`);
        let draw2Score = convertCardValue(draw2Value);

        let draw3Value = dealerArray[2];
        draw3Value == 1 ?
            (dealerDraw3Value.textContent = "Ace") :
            (dealerDraw3Value.textContent = `${draw3Value}`);
        let draw3Score = convertCardValue(draw3Value);

        let draw4Value = dealerArray[3];
        draw4Value == 1 ?
            (dealerDraw4Value.textContent = "Ace") :
            (dealerDraw4Value.textContent = `${draw4Value}`);
        let draw4Score = convertCardValue(draw4Value);

        /////  DISPLAY MANDATORY 1ST DRAW  //////
        dealerDraw1.style.visibility = "visible";
        dealerDraw1Value.style.visibility = "visible";
        ////  Compute and Display Dealer Score after 1st Draw ////
        dealerTotalScore = dealerHand + draw1Score;
        displayDealerScore.textContent = `${dealerTotalScore}`;

        console.log("dealerTotalScore after draw1 = " + dealerTotalScore);

        ////  CHECK IF DEALER WINS or BUST on 1st DRAW  /////////
        if (dealerTotalScore >= playerTotalScore && dealerTotalScore <= 21) {
            dealerWins();
        } else {
            isDealerBust();
            drawCount = 2;
            console.log("2nd draw is req draw = " + drawCount);
        }
        ////  DRAW AGAIN IF NOT BUST and DEALER < PLAYER  //////
        if (drawCount == 2 && dealerTotalScore < playerTotalScore) {
            ////  DISPLAY 2nd DRAW  /////////
            dealerDraw2.style.visibility = "visible";
            dealerDraw2Value.style.visibility = "visible";
            ////  Compute and Display Dealer Score after 2nd Draw ////
            dealerTotalScore = dealerHand + draw1Score + draw2Score;
            displayDealerScore.textContent = `${dealerTotalScore}`;

            ///  CHECK IF DEALER WINS or BUST on 2nd DRAW  /////////
            if (dealerTotalScore >= playerTotalScore && dealerTotalScore <= 21) {
                dealerWins();
            } else {
                isDealerBust();
                drawCount = 3;
                console.log("3rd draw is req draw = " + drawCount);
            }
            ///  DRAW AGAIN IF NOT BUST and DEALER < PLAYER  ////
            if (drawCount == 3 && dealerTotalScore < playerTotalScore) {
                ///  DISPLAY 3rd DRAW  //////////////
                dealerDraw3.style.visibility = "visible";
                dealerDraw3Value.style.visibility = "visible";
                ///  Compute and Display Dealer Score after 3rd Draw ////
                dealerTotalScore = dealerHand + draw1Score + draw2Score + draw3Score;
                displayDealerScore.textContent = `${dealerTotalScore}`;

                //  CHECK IF DEALER WINS or BUST on 3rd DRAW  /////
                if (dealerTotalScore >= playerTotalScore && dealerTotalScore <= 21) {
                    dealerWins();
                } else {
                    isDealerBust();
                    let draw = 4;
                    console.log("4th draw is req draw = " + draw);
                    console.log("4th draw not implemented");
                }
                ////  IMPLEMENT 4TH DRAW HERE IF NEEDED /////
                // if (drawCount == 4 && dealerTotalScore < playerTotalScore)
            } // end of "IF Draw = 3"
        } // end of "IF Draw = 2"
    } // end of "IF Dealer Must Draw (< 17) "
}); // end of call back fx on HOLD