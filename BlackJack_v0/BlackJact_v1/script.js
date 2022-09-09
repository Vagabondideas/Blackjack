let x = Math.floor(Math.random() * 13) + 1;
console.log(x);

let random;

function deal() {
    random = Math.floor(Math.random() * 13) + 1;
    return random;
}

console.log("this is the fx call: " + deal());

document.querySelector("#btnDraw").textContent = random;

document.querySelector("#btnDeal").addEventListener("click", deal);

console.log("this is random after click " + random);