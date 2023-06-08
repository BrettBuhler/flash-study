interface Card {
    question: string
    answer: string
    tries: number[]
    easy: () => void;
    medium: () => void
    hard: () => void
}

class Deck {
    name: string
    deck: Card[]

    constructor (name: string, deck: Card[]){
        this.name = name
        this.deck = deck
    }

    
}

export default Deck