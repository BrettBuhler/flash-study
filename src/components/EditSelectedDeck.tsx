import Deck from "../classes/Deck"
import React, { useState } from 'react'

interface EditSelectedDeckProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    deck: Deck
}

const EditSelectedDeck: React.FC<EditSelectedDeckProps> = ({user, setUser, deck}) => {
    const [tempDeck, setTempDeck] = useState(deck)
    const [route, setRoute] = useState(0)

    const handleClick = (n: number) => {
        setRoute(n)
    }

    return (
        <div className="edit-selected-deck-0">
            <h2 className="edit-selected-deck-h2">Edit: {deck.name}</h2>
            <div className="edit-selected-deck-button-container">
                <button className="edit-selected-deck-button">Add Cards Manually</button>
                <button className="edit-selected-deck-button">Add Cards with AI</button>
                <button className="edit-selected-deck-button">Add Cards from text</button>
                <button className="edit-selected-deck-button">Edit Cards</button>
            </div>
        </div>
    )
}

export default EditSelectedDeck