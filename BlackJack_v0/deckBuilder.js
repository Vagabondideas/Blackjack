const cardGame = {
    values: ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Joker", "Queen", "King"],
    suits: ["Clubs", "Spades", "Hearts", "Diamonds"],
    deck: [],
    discard: [],
    pick(arr) {
        const idx = Math.floor(Math.random() * arr.length);
        return arr[idx];
    },
    buildDeck() {
        const { deck, discard, values, suits } = this;

        //clear deck and discard pile
        deck.splice(0, 52);
        discard.splice(0, 52);

        //regenerate/build deck
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ value, suit });
            }
        }
    },
    getCard() {
        const { pick, deck } = this;
        return pick(deck);
    },
    drawCard(numCards = 1) {
        const { deck, discard } = this;
        const drawnCards = [];

        //draw cards
        while (drawnCards.length < numCards) {
            let card = this.getCard();
            //check if card has been drawn
            for (let drawnCard of drawnCards) {
                let matchSuit = card.suit === drawnCard.suit;
                let matchValue = card.value === drawnCard.value;
                if (matchSuit && matchValue) {
                    card = this.getCard();
                }
            }
            console.log(card);
            drawnCards.push(card);
        }

        //discard drawn cards from deck
        for (let drawnCard of drawnCards) {
            for (let i = 0; i < deck.length; i++) {
                let card = deck[i];
                let matchSuit = card.suit === drawnCard.suit;
                let matchValue = card.value === drawnCard.value;
                if (matchSuit && matchValue) {
                    deck.splice(i, 1);
                    discard.push(card);
                }
            }
        }
        console.log(deck.length);
    },
};
cardGame.buildDeck();