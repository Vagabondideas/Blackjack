"use strict";

console.log("Running v2.6 AceChallenge.js");

let cashInput = 0;
let dealerHand = 0;
let dealerTotalScore = 0;
let playerHand = 0;
let playerTotalScore = 0;

let playerRandomScoreArray = [];
let dealerRandomScoreArray = [];

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
    dealerRandomScoreArray = [];
    displayDealerScore.textContent = "00";
    playerHand = 0;
    playerTotalScore = 0;
    displayPlayerScore.textContent = "00";
    playerRandomScoreArray = [];

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

function convertCardValue(card) {
    if (card == 1) {
        return 11;
    } else if (card >= 10) {
        return 10;
    } else {
        return card;
    }
}

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

/************************************************************ */
//  DEAL        DEAL       DEAL              DEAL
/*************************************************************** */
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

    ////  SET and SAVE SCORE VALUE of Hand Cards in an Array   //
    playerRandomScoreArray.push(convertCardValue(card1FaceValue));
    playerRandomScoreArray.push(convertCardValue(card3FaceValue));
    playerHand = playerRandomScoreArray[0] + playerRandomScoreArray[1];
    playerTotalScore = playerHand;
    dealerRandomScoreArray.push(convertCardValue(card2FaceValue));
    dealerRandomScoreArray.push(convertCardValue(card4FaceValue));
    dealerHand = dealerRandomScoreArray[0] + dealerRandomScoreArray[1];
    dealerTotalScore = dealerHand;

    ////  CHECK FOR PAIR of ACE, Any Pairs, + DISPLAY HAND SCORE  //
    if (playerHand > 21) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Sorry No Split Allowed";
        playerHand = 12;
        // playerTotalScore == 12;
        displayPlayerScore.textContent = `${playerHand}`;
    } else if (card1FaceValue == card3FaceValue) {
        displayPlayerMsg.style.visibility = "visible";
        displayPlayerMsg.textContent = "Sorry No Split Allowed";
        displayPlayerScore.textContent = `${playerHand}`;
    } else {
        displayPlayerScore.textContent = `${playerHand}`;
    }

    // dealerHand = dealerCard1ScoreValue + dealerCard2ScoreValue;
    // playerHand = playerCard1ScoreValue + playerCard2ScoreValue;
    // playerTotalScore = playerHand;
    // dealerTotalScore = dealerHand;
    displayDealerScore.textContent = `${dealerRandomScoreArray[0]}`;
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

/************************************************************** */
//HIT       HIT          HIT            HIT           HIT       //
/**************************************************************** */
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
        ////  Display Card and Face-Value
        playerHit1.style.visibility = "visible"; //display card
        hitRandom == 1 ?
            (playerHit1Value.textContent = `Ace`) :
            (playerHit1Value.textContent = `${hitRandom}`);
        playerHit1Value.style.visibility = "visible"; //display face-value

        // Convert hitFaceValue to hitScoreValue and push into player score Array
        playerRandomScoreArray.push(convertCardValue(hitRandom));

        // Compute player total score
        playerTotalScore = playerRandomScoreArray.reduce(function(
                accumulator,
                hitScoreValue
            ) {
                return accumulator + hitScoreValue;
            },
            0);

        // Check for Ace
        playerRandomScoreArray.forEach(function(scoreValue) {
            if (scoreValue == 11 && playerTotalScore > 21) {
                playerTotalScore = playerTotalScore - 10;
            } else {
                playerTotalScore = playerTotalScore;
            }
        });

        // Check for Bust
        isPlayerBust();

        // Display playerTotalScore
        displayPlayerScore.textContent = `${playerTotalScore}`;

        ///////  HIT 2 (click)  //////////////
    } else if (hitCount == 2) {
        //  Display Card and Face-Value
        playerHit2.style.visibility = "visible"; //display card
        hitRandom == 1 ?
            (playerHit2Value.textContent = `Ace`) :
            (playerHit2Value.textContent = `${hitRandom}`);
        playerHit2Value.style.visibility = "visible"; //display face-value

        // Convert hitFaceValue to hitScoreValue and push into player score Array
        playerRandomScoreArray.push(convertCardValue(hitRandom));

        // Compute player total score
        playerTotalScore = playerRandomScoreArray.reduce(function(
                accumulator,
                hitScoreValue
            ) {
                return accumulator + hitScoreValue;
            },
            0);

        // Check for Ace
        playerRandomScoreArray.forEach(function(scoreValue) {
            if (scoreValue == 11 && playerTotalScore > 21) {
                playerTotalScore = playerTotalScore - 10;
            } else {
                playerTotalScore = playerTotalScore;
            }
        });

        //  Check for Bust
        isPlayerBust();

        //  Display player total score
        displayPlayerScore.textContent = `${playerTotalScore}`;
    }

    ///////  HIT 3 (click)  //////////////
    else if (hitCount == 3) {
        //  Display Card and Face-Value
        playerHit3.style.visibility = "visible"; //display card
        hitRandom == 1 ?
            (playerHit3Value.textContent = `Ace`) :
            (playerHit3Value.textContent = `${hitRandom}`);
        playerHit3Value.style.visibility = "visible"; //display face-value

        // Convert hitFaceValue to hitScoreValue and push into player score Array
        playerRandomScoreArray.push(convertCardValue(hitRandom));

        // Compute player total score
        playerTotalScore = playerRandomScoreArray.reduce(function(
                accumulator,
                hitScoreValue
            ) {
                return accumulator + hitScoreValue;
            },
            0);

        // Check for Ace
        playerRandomScoreArray.forEach(function(scoreValue) {
            if (scoreValue == 11 && playerTotalScore > 21) {
                playerTotalScore = playerTotalScore - 10;
            } else {
                playerTotalScore = playerTotalScore;
            }
        });

        //  Check for Bust
        isPlayerBust();

        //  Display player total score
        displayPlayerScore.textContent = `${playerTotalScore}`;
    }

    ///////  HIT 4 (click)  //////////////
    else if (hitCount == 4) {
        //  Display Card and Face-Value
        playerHit4.style.visibility = "visible"; //display card
        hitRandom == 1 ?
            (playerHit4Value.textContent = `Ace`) :
            (playerHit4Value.textContent = `${hitRandom}`);
        playerHit4Value.style.visibility = "visible"; //display face-value

        // Convert hitFaceValue to hitScoreValue and push into player score Array
        playerRandomScoreArray.push(convertCardValue(hitRandom));

        // Compute player total score
        playerTotalScore = playerRandomScoreArray.reduce(function(
                accumulator,
                hitScoreValue
            ) {
                return accumulator + hitScoreValue;
            },
            0);

        // Check for Ace
        playerRandomScoreArray.forEach(function(scoreValue) {
            if (scoreValue == 11 && playerTotalScore > 21) {
                playerTotalScore = playerTotalScore - 10;
            } else {
                playerTotalScore = playerTotalScore;
            }
        });

        //  Check for Bust
        isPlayerBust();

        //  Display player total score
        displayPlayerScore.textContent = `${playerTotalScore}`;
    }
}); //End Hit Fx

/************************************************************* */
//HOLD         HOLD          HOLD                 HOLD         //
/************************************************************** */
btnHold.addEventListener("click", function() {
    ////  RETRIEVE PLAYER TOTAL SCORE  ////
    playerTotalScore = playerRandomScoreArray.reduce(function(
            accumulator,
            playerScores
        ) {
            return accumulator + playerScores;
        },
        0);

    //// SHOW DEALER HAND and DISPLAY SCORE
    dealerCard2Value.style.visibility = "visible";
    displayDealerScore.textContent = `${dealerHand}`;

    ////  MUST STAY (Hand Score >= 17)  /////
    if (dealerTotalScore >= 17 && dealerTotalScore >= playerTotalScore) {
        dealerWins();
    } else if (dealerTotalScore >= 17 && dealerTotalScore < playerTotalScore) {
        playerWins();
    } // end of "IF Dealer Must Stay (>= 17) "

    ////  MUST DRAW (Hand Score < 17  //////////
    if (dealerHand < 17) {
        // DRAW -
        let draw1Value = Math.floor(Math.random() * 13) + 1;
        drawCount++;

        // Display mandatory draw and face-value
        dealerDraw1.style.visibility = "visible";
        dealerDraw1Value.style.visibility = "visible";
        draw1Value == 1 ?
            (dealerDraw1Value.textContent = "Ace") :
            (dealerDraw1Value.textContent = `${draw1Value}`);

        // Convert FaceValue to ScoreValue and push in scoreArray
        dealerRandomScoreArray.push(convertCardValue(draw1Value));

        //  Compute dealer total score
        dealerTotalScore = dealerRandomScoreArray.reduce(function(
                accumulator,
                randomDraw
            ) {
                return accumulator + randomDraw;
            },
            0);

        // Check for Ace
        dealerRandomScoreArray.forEach(function(scoreValue) {
            if (scoreValue == 11 && dealerTotalScore > 21) {
                dealerTotalScore = dealerTotalScore - 10;
            } else {
                dealerTotalScore = dealerTotalScore;
            }
        });

        // Display dealer total score
        displayDealerScore.textContent = `${dealerTotalScore}`;

        // CHECK IF DEALER WINS or BUST on 1st DRAW  /////////
        if (dealerTotalScore >= playerTotalScore && dealerTotalScore <= 21) {
            dealerWins();
        } else {
            isDealerBust();
            drawCount = 1; //If not bust drawCount =1 and Fx resume
        }

        ////  DRAW AGAIN IF NOT BUST and DEALER < PLAYER  //////
        if (drawCount == 1 && dealerTotalScore < playerTotalScore) {
            // DRAW (2nd Draw) -
            let draw2Value = Math.floor(Math.random() * 13) + 1;
            drawCount++;

            // Display 2nd Draw and face-value
            dealerDraw2.style.visibility = "visible";
            dealerDraw2Value.style.visibility = "visible";
            draw2Value == 1 ?
                (dealerDraw2Value.textContent = "Ace") :
                (dealerDraw2Value.textContent = `${draw2Value}`);

            // Convert FaceValue to ScoreValue and push in scoreArray
            dealerRandomScoreArray.push(convertCardValue(draw2Value));

            // Update dealer total score
            dealerTotalScore = dealerRandomScoreArray.reduce(function(
                    accumulator,
                    randomDraw
                ) {
                    return accumulator + randomDraw;
                },
                0);

            // Check for Ace
            dealerRandomScoreArray.forEach(function(scoreValue) {
                if (scoreValue == 11 && dealerTotalScore > 21) {
                    dealerTotalScore = dealerTotalScore - 10;
                } else {
                    dealerTotalScore = dealerTotalScore;
                }
            });

            // Display dealer total score
            displayDealerScore.textContent = `${dealerTotalScore}`;

            ///  CHECK IF DEALER WINS or BUST on 2nd DRAW  /////////
            if (dealerTotalScore >= playerTotalScore && dealerTotalScore <= 21) {
                dealerWins();
            } else {
                isDealerBust();
                drawCount = 2;
                console.log("3rd draw is req draw = " + drawCount);
            }

            if (drawCount == 2 && dealerTotalScore < playerTotalScore) {
                // DRAW (3rd Draw) -
                let draw3Value = Math.floor(Math.random() * 13) + 1;
                drawCount++;

                // Display 3rd Draw and face-value
                dealerDraw3.style.visibility = "visible";
                dealerDraw3Value.style.visibility = "visible";
                draw2Value == 1 ?
                    (dealerDraw3Value.textContent = "Ace") :
                    (dealerDraw3Value.textContent = `${draw3Value}`);

                // Convert FaceValue to ScoreValue and push in scoreArray
                dealerRandomScoreArray.push(convertCardValue(draw3Value));

                // Update dealer total score
                dealerTotalScore = dealerRandomScoreArray.reduce(function(
                        accumulator,
                        randomDraw
                    ) {
                        return accumulator + randomDraw;
                    },
                    0);

                // Check for Ace
                dealerRandomScoreArray.forEach(function(scoreValue) {
                    if (scoreValue == 11 && dealerTotalScore > 21) {
                        dealerTotalScore = dealerTotalScore - 10;
                    } else {
                        dealerTotalScore = dealerTotalScore;
                    }
                });

                // Display dealer total score
                displayDealerScore.textContent = `${dealerTotalScore}`;

                ///  CHECK IF DEALER WINS or BUST on 2nd DRAW  /////////
                if (dealerTotalScore >= playerTotalScore && dealerTotalScore <= 21) {
                    dealerWins();
                } else {
                    isDealerBust();
                    drawCount = 3;
                    console.log("4th draw is req draw = " + drawCount);
                }
                //  DRAW AGAIN IF NOT BUST and DEALER < PLAYER  ////

                //     ////  IMPLEMENT 4TH DRAW HERE IF NEEDED /////
                //     // if (drawCount == 4 && dealerTotalScore < playerTotalScore)
            } // end of "IF Draw = 3"
        } // end of "IF Draw = 2"
    } // end of "IF Dealer Must Draw (< 17) "
}); // end of call back fx on HOLD