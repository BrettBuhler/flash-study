import Card from "../classes/Card";
import Deck from "../classes/Deck";

const deckGen = (name: string, arr: Card[]):Deck => {
    return new Deck(name, arr)
}

export default deckGen