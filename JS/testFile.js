"use strict";

let bankroll = 50;
let bet = 50;
// let currentBankroll = 0;

function currentBankroll() {
    let currentBankroll = bankroll + bet;
    console.log("inside fx = " + currentBankroll);
    return currentBankroll;
}

// trakIT();
console.log("currentBankroll = " + currentBankroll());