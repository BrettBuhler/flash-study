import Deck from "../classes/Deck"
import Card from "../classes/Card"
import { useState, useEffect } from 'react'
import SuccessAndFailPopUp from "./SuccessAndFailPopUp"
import axios from "axios"

import '../styles/MergeDecks.css'

interface MergeDeckProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    deck: Deck
    setRoute: React.Dispatch<React.SetStateAction<any>>
}

const MergeDeck: React.FC<MergeDeckProps> = ({user, setUser, deck, setRoute}) => {
    const [secondDeck, setSecondDeck] = useState<Deck | undefined>(undefined)
    const [deckChoices, setDeckChoices] = useState<Deck[]>([])
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(()=>{
        if (deckChoices.length === 0){
            let tempDecks = []
            for (let i = 0; i < user.decks.length; i++){
                if (deck.name !== user.decks[i].name){
                    let cards = []
                    for (let j = 0; j < user.decks[i].cards.length; j++){
                        let newCard = new Card(user.decks[i].cards[j].question, user.decks[i].cards[j].answer, user.decks[i].cards[j].tries, user.decks[i].cards[j].lastTry)
                        cards.push(newCard)
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
            let newDeck = deck.deck
            if (secondDeck){
                newDeck = newDeck.concat(secondDeck.deck)
                const _id = user._id
                let name = deck.name
                const cards = newDeck
                let updateResponse = await axios.put(`${process.env.REACT_APP_URL}api/updatedeck`,{ _id, name, cards })
                if (updateResponse.data.user){
                    name = secondDeck.name
                    let deleteResponse = await axios.delete(`${process.env.REACT_APP_URL}api/deletedeck`, {data: {_id, name}})
                    if (deleteResponse.data.user){
                        setUser(deleteResponse.data.user)
                        setSuccess(true)
                        setMessage(`${secondDeck.name} successfully merged into ${deck.name}`)
                    } else {
                        throw new Error (`Unable to delete ${name}`)
                    }
                } else {
                    throw new Error (`Unable to update ${name}`)
                }
            }
        } catch (error) {
            setFail(true)
            setMessage(`${error}`)
            console.error(error)
        }
    }
    return (
        <div className="merge-decks-main">
            <SuccessAndFailPopUp success={success} setSuccess={setSuccess} fail={fail} setFail={setFail} message={message} name={deck.name} />
            <div className="select-deck-to-merge">
                <h2 className="merge-decks-h2">Select a second deck to merge into {deck.name}</h2>
                <div className="merge-decks-button-container">
                {deckChoices.map((deck1, index)=>(
                    <button key={`deck${deck1.name}${index}`} onClick={()=>handleClick(index)} className={`add-deck-button merge-decks-button ${((index) === deckChoices.length - 1 && deckChoices.length % 2 === 1) ? 'long-button' : 'short-button'}`}>{deck1.name}</button>
                ))}
                {deckChoices.length === 0 && (<div className="merge-decks-confirm-p">
                    You need at least two decks before you can merge them.
                </div>)}
                <div className="merge-deck-spacer"></div>
                <button className="add-deck-button long-button merge-decks-back-button" onClick={()=>setRoute(0)}>Back</button>
                </div>
            </div>
            {secondDeck ? <div className="merge-decks-confirm-delete-background">
                <div className="merge-decks-confirm-container">
                    <h3 className="merge-decks-confirm-h3">Merge <div className="merge-em">{secondDeck.name}</div> into <div className="merge-em">{deck.name}</div>?</h3>
                    <div className="merge-decks-confirm-p">note: All cards from <div className="merge-em">{secondDeck.name}</div> will be moved into <div className="merge-em">{deck.name}</div> and <div className="merge-em">{secondDeck.name}</div> will be deleted</div>
                    <div className="merge-decks-confirm-button-container">
                        <button className="add-deck-button" onClick={handleMerge}>Merge</button>
                        <button onClick={()=>setSecondDeck(undefined)} className="add-deck-button">Cancel</button>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default MergeDeck