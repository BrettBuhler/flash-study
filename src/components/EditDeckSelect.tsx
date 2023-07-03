import Deck from "../classes/Deck"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import ErrorPopup from "./ErrorPopup"

import '../styles/EditDeckSelect.css'

interface EditDeckSelectProps {
  decks: Deck[];
  selectedIndex: boolean | number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<boolean | number>>;
}

const EditDeckSelect: React.FC<EditDeckSelectProps> = ({ decks, selectedIndex, setSelectedIndex }) => {
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    const handleEditClick = () => { 
        const selectElement = document.querySelector('.deck-select') as HTMLSelectElement | null
        if (selectElement) {
            const selectedDeckIndex = selectElement.value
            if (selectElement.value === ''){
                setError(true)
                setErrorMessage('Please Select a Deck to Edit')
            } else {
                setSelectedIndex(Number(selectedDeckIndex))
            }
        } else {
            setError(true)
            setErrorMessage('Please Select a Deck to eddit')
        }
    };

    if (selectedIndex !== false) {
        return null;
    }

    return (
        <div className="edit-deck-select-main">
            <ErrorPopup error={error} errorMessage={errorMessage} setError={setError} setErrorMessage={setErrorMessage}/>
            <div className="edit-deck-select-container">
                <h2 className="edit-deck-select-title">Select a Deck to Edit</h2>
                <div className="edit-deck-select-deck-item-container">
                    {decks.length === 0 && (<div className="merge-decks-confirm-p eds-p">
                        First You need to add a deck
                    </div>)}
                    <select className="deck-select">
                    <option value="">Select a deck</option>
                    {decks.map((deck, index) => (
                        <option key={`${index}KEY`} value={index}>
                        {deck.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="edit-deck-select-buttons">
                    <button onClick={handleEditClick} className="add-deck-button">Edit</button>
                    <button onClick={()=>navigate('/dashboard')} className="add-deck-button wide-button">Back</button>
                </div>
            </div>
        </div>
    );
    };

    export default EditDeckSelect;