import React, {useState, useEffect} from 'react'
import cardGen from '../services/cardGen'

interface EditEditCardPopupProps {
    front: string
    back: string
    setFront: React.Dispatch<React.SetStateAction<string>>
    setBack: React.Dispatch<React.SetStateAction<string>>
    deck: any
    setDeck: React.Dispatch<React.SetStateAction<any>>
    editDeck: boolean
    setEditDeck: React.Dispatch<React.SetStateAction<boolean>>
    editIndex: number

}

const EditEditCardPopup: React.FC<EditEditCardPopupProps> = ({front, setFront, back, setBack, deck, setDeck, editDeck, setEditDeck, editIndex}) => {
    const [newFront, setNewFront] = useState(front)
    const [newBack, setNewBack] = useState(back)

    useEffect(()=>{
        setNewBack(back)
        setNewFront(front)
    },[editDeck])

    const handleFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewFront(event.target.value)
    }

    const handleBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewBack(event.target.value)
    }

    const handleSave = () => {
        const left = deck.slice(0,editIndex)
        const right = deck.slice(editIndex + 1)
        const newCard = cardGen(newFront, newBack)
        const newDeck = [...left, newCard, ...right]

        setDeck(newDeck)
        setFront('')
        setBack('')
        setNewFront('')
        setNewBack('')
        setEditDeck(false)
    }

    const handleBack = () => {
        setFront('')
        setBack('')
        setNewBack('')
        setNewFront('')
        setEditDeck(false)
    }

    if (!editDeck){
        return null
    }
    return (
        <div className='edit-card-popup-background' style={{border: '2px solid black'}}>
            <div className='edit-card-popup-container'>
                <h3 className='edit-card-popup-h3'>Edit Card</h3>
                <div className='edit-card-popup-flexbox'>
                    <div className='edit-card-popup-front'>
                        <h4 className='edit-card-popup-h4'>Front:</h4>
                        <textarea className='edit-card-pupup-textarea' id='edit-card-text-front' value={newFront} onChange={handleFrontChange}></textarea>
                    </div>
                    <div className='edit-card-popup-back'>
                        <h4 className='edit-card-popup-h4'>Back:</h4>
                        <textarea className='edit-card-pupup-textarea' id='edit-card-text-back' value={newBack} onChange={handleBackChange}></textarea>
                    </div>
                </div>
                <div className='edit-card-popup-buttons'>
                    <button className='add-deck-button' onClick={handleSave}>Save</button>
                    <button className='add-deck-button' onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default EditEditCardPopup