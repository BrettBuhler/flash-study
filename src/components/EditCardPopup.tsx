import React, {useState, useEffect} from 'react'

interface EditCardPopupProps {
    front: string
    back: string
    setFront: React.Dispatch<React.SetStateAction<string>>
    setBack: React.Dispatch<React.SetStateAction<string>>
    deck: string[][]
    setDeck: React.Dispatch<React.SetStateAction<string[][]>>
    editDeck: boolean
    setEditDeck: React.Dispatch<React.SetStateAction<boolean>>
    editIndex: number

}

const EditCardPopup: React.FC<EditCardPopupProps> = ({front, setFront, back, setBack, deck, setDeck, editDeck, setEditDeck, editIndex}) => {
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
        console.log('edit index', editIndex)
        const left = deck.slice(0,editIndex)
        const right = deck.slice(editIndex + 1)
        let newDeck = left.concat([[newFront, newBack]]).concat(right)
        console.log('old', deck)
        console.log('new',newDeck)

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
                        <h4 className='edit-card-popup-h4'>Front</h4>
                        <textarea className='edit-card-pupup-textarea' id='edit-card-text-front' value={newFront} onChange={handleFrontChange}></textarea>
                    </div>
                    <div className='edit-card-popup-back'>
                        <h4 className='edit-card-popup-h4'>Back</h4>
                        <textarea className='edit-card-pupup-textarea' id='edit-card-text-back' value={newBack} onChange={handleBackChange}></textarea>
                    </div>
                </div>
                <div className='edit-card-popup-buttons'>
                    <button className='edit-card-popup-button' onClick={handleSave}>Save</button>
                    <button className='edit-card-popup-button' onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default EditCardPopup