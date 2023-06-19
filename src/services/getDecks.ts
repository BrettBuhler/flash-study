import Deck from "../classes/Deck"
import Card from "../classes/Card"

const getDecks = (user: any) => {
    let tempDecks = user.decks
    let resDecks = []
    for (let i = 0; i < tempDecks.length; i++){
        let newDeck = []
        for (let j = 0; j < tempDecks[i].cards.length; j++){
            newDeck.push(new Card(tempDecks[i].cards[j].question, tempDecks[i].cards[j].answer, tempDecks[i].cards[j].tries, tempDecks[i].cards[j].lastTry))
        }
        resDecks.push(new Deck(tempDecks[i].name, newDeck))
    }
    return resDecks
}

export default getDecks