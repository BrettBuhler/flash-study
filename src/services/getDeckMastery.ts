import Deck from "../classes/Deck";
import Card from "../classes/Card";

const getDeckMastery = (deck: Deck) => {
    const total = deck.deck.reduce((accumulator: number, card: Card) => {
        return accumulator + card.tries.reduce((a,b) => a + b)
    }, 0)
    return total / (deck.deck.length * 6)
}

export default getDeckMastery