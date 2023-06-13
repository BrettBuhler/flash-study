import Deck from "../classes/Deck"
import Card from "../classes/Card"
import { useState, useEffect } from 'react'
import axios from "axios"

interface MergeDeckProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    deck: Deck
}

const MergeDeck: React.FC<MergeDeckProps> = ({user, setUser, deck}) => {
    const [secondDeck, setSecondDeck] = useState<Deck | undefined>(undefined)
    const [deckChoices, setDeckChoices] = useState<Deck[]>([])

    useEffect(()=>{
        if (deckChoices.length === 0){
            let tempDecks = []
            for (let i = 0; i < user.decks.length; i++){
                if (deck.name !== user.decks[i].name){
                    let cards = []
                    for (let j = 0; j < user.decks[i]; j++){
                        cards.push(new Card(user.decks[i].cards[j].question, user.decks[i].cards[j].answer, user.decks[i].cards[j].tries, user.decks[i].cards[j].lastTry))
                    }
                    let newDeck = new Deck (user.decks[i].name, cards)
                    tempDecks.push(newDeck)
                }
            }
            setDeckChoices(tempDecks)
        }
    },[])

    const handleClick = (index: number) => {
        setSecondDeck(deckChoices[index])
    }

    const handleMerge = async () => {
        try{
            console.log('see todo')
            //TODO handle Merge logic (update deck with deck.cards.concat(secondDeck.cards)) then delete secondDeck.name
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="merge-decks-main">
            <h2 className="merge-decks-h2">Select a second deck to merge into {deck.name}</h2>
            {deckChoices.map((deck1, index)=>(<div>
                <button onClick={()=>handleClick(index)} className="merge-decks-button">{deck1.name}</button>
            </div>))}
            {secondDeck ? <div className="merge-decks-confirm-delete-background">
                <div className="merge-decks-confirm-container">
                    <h3 className="merge-decks-confirm-h3">Merge {secondDeck.name} into {deck.name}</h3>
                    <p className="merge-decks-confirm-p">note: All cards from {secondDeck.name} will be moved into {deck.name} and {secondDeck.name} will be deleted</p>
                    <div className="merge-decks-confirm-button-container">
                        <button className="merge-decks-confirm-button" onClick={handleMerge}>Merge</button>
                        <button onClick={()=>setSecondDeck(undefined)} className="merge-decks-confirm-button">Cancel</button>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default MergeDeck