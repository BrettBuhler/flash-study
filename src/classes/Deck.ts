import Card from "./Card"

class Deck {
    name: string
    deck: Card[]

    constructor (name: string, deck: Card[]){
        this.name = name
        this.deck = deck
    }

    addCard (card: Card) {
        this.deck.push(card)
    }
}

export default Deck