"use strict";
// const btnReset = document.querySelector(".btn-reset"); // TEMP to trigger FX Reset
// btnReset.addEventListener("click", function() {
//     ///After HOLD

//     cashInput = 0;
//     totalBet = 0;
//     displayTotalBetAmount.textContent = "";
//     dealerHand = 0;
//     dealerTotalScore = 0;
//     displayDealerScore.textContent = "";
//     playerHand = 0;
//     playerTotalScore = 0;
//     displayPlayerScore.textContent = "";

//     hitArray = [];
//     hitCount = 0;
//     drawCount = 0;

//     btnHit.style.visibility = "hidden";
//     btnHold.style.visibility = "hidden";
//     btnDeal.style.visibility = "visible";
//     btnDouble.style.display = "none";

//     btnBuyin.style.visibility = "hidden";
//     inputMoney.style.visibility = "hidden";
//     displayPlaceBetMsg.style.visibility = "visible";
//     displayTotalBetAmount.textContent = `$ 00`;

//     displayDealerMsg.style.visibility = "hidden";
//     displayPlayerMsg.style.visibility = "hidden";
//     // displayDealerScore.textContent = "";
//     // displayPlayerScore.textContent = "";

//     /////Reformating Token Place to initial style (otherwise it keeps the last token)
//     displayTokenPlace.style.visibility = "visible";
//     displayTokenPlace.textContent = `token`;
//     displayTokenPlace.style.textAlign = "center";
//     displayTokenPlace.style.fontSize = "20px";
//     displayTokenPlace.style.fontWeight = "bold";
//     displayTokenPlace.style.color = "purple";
//     displayTokenPlace.style.border = "solid 12px";
//     displayTokenPlace.style.borderStyle = "dashed";
//     displayTokenPlace.style.borderColor = "#80080";
//     displayTokenPlace.style.padding = "15px";
//     displayTokenPlace.style.paddingTop = "28px";
//     displayTokenPlace.style.paddingBottom = "28px";
//     displayTokenPlace.style.borderRadius = "50%";
//     displayTokenPlace.style.backgroundColor = "#e4cfb8";

//     ///Hidding ALL CARDS and VALUES ///////////////
//     dealerCard1.style.visibility = "hidden";
//     dealerCard2.style.visibility = "hidden";
//     dealerDraw1.style.visibility = "hidden";
//     dealerDraw2.style.visibility = "hidden";
//     dealerDraw3.style.visibility = "hidden";
//     dealerDraw4.style.visibility = "hidden";
//     dealerCard1Value.style.visibility = "hidden";
//     dealerCard2Value.style.visibility = "hidden";
//     dealerDraw1Value.style.visibility = "hidden";
//     dealerDraw2Value.style.visibility = "hidden";
//     dealerDraw3Value.style.visibility = "hidden";
//     dealerDraw4Value.style.visibility = "hidden";

//     playerCard1.style.visibility = "hidden";
//     playerCard2.style.visibility = "hidden";
//     playerHit1.style.visibility = "hidden";
//     playerHit2.style.visibility = "hidden";
//     playerHit3.style.visibility = "hidden";
//     playerHit4.style.visibility = "hidden";
//     playerCard1Value.style.visibility = "hidden";
//     playerCard2Value.style.visibility = "hidden";
//     playerHit1Value.style.visibility = "hidden";
//     playerHit2Value.style.visibility = "hidden";
//     playerHit3Value.style.visibility = "hidden";
//     playerHit4Value.style.visibility = "hidden";
// });