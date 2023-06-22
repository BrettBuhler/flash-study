import React, { useState } from 'react';
import '../styles/SimpleDeckView.css';
import EditEditCardPopup from './EditEditCardPopup';
import DeleteConfirm from './DeleteConfirm';
import Deck from '../classes/Deck';
import SuccessAndFailPopUp from './SuccessAndFailPopUp';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

interface EditSimpleDeckViewProps {
    deck: Deck
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    setRoute: React.Dispatch<React.SetStateAction<number>>
}


const EditSimpleDeckView: React.FC<EditSimpleDeckViewProps> = ({ user, setUser, deck, setRoute }) => {
    const [flipedArr, setFlipedArr] = useState(deck.deck.map(x=>true))
    const [copyDeck, setCopyDeck] = useState(deck.deck.map(item=>item))
    const [editFront, setEditFront] = useState('')
    const [editBack, setEditBack] = useState('')
    const [editDeck, setEditDeck] = useState(false)
    const [editIndex, setEditIndex] = useState(0)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleEdit = (front: string, back: string, index: number) => {
        console.log(flipedArr)
        setEditFront(front)
        setEditBack(back)
        setEditIndex(index)
        setEditDeck(true)
    }

    const handleDelete = (index: number) => {
        setEditIndex(index)
        const item = `Front: ${copyDeck[index].question}\n\nBack: ${copyDeck[index].answer}`
        setItemToDelete(item)
        setDeleteConfirm(true)
    }

    const deleteItem = (index: number) => {
        const left = copyDeck.slice(0,index)
        const right = copyDeck.slice(index + 1)
        const newDeck = left.concat(right)
        const flipedLeft = flipedArr.slice(0, index)
        const flipedRight = flipedArr.slice(index + 1)
        const newFliped = flipedLeft.concat(flipedRight)
        setFlipedArr(newFliped)
        setCopyDeck(newDeck)
    }

    const handleFlip = (num: number) => {
        const newBool = !flipedArr[num]
        let tempArr = [...flipedArr]
        tempArr = tempArr.slice(0,num)
        tempArr.push(newBool)
        tempArr = tempArr.concat(flipedArr.slice(num+1))
        setFlipedArr(tempArr)
        console.log(flipedArr)
    }
    //TODO UPDATE DECK
    const updateDeck = async () => {
        try{
            const _id = user._id
            const name = deck.name
            const cards = copyDeck
            //change to /api/updatedeck before production build: http://localhost:5000/api/updatedeck
            const response = await axios.put(`${process.env.REACT_APP_URL}api/updatedeck`, {_id, name, cards})
            if (response.data.user){
                setUser(response.data.user)
                setMessage(`Successfully Edited ${deck.name}`)
                setSuccess(true)
            } else {
                setMessage(`Server Error: unable to edit ${deck.name}`)
                setFail(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (deck.deck.length === 0){
        return (
            <div className='deck-length-0-container'>
                <h3 className='deck-length-0-h3'>No cards in {deck.name}</h3>
                <p className='deck-length-0-p'>Return to the Dashboard, or add cards to {deck.name} from the Edit Deck menu.</p>
                <div className='deck-length-0-button-container'>
                    <button className='deck-length-0-button' onClick={()=>navigate('/dashboard')}>Dashboard</button>
                    <button className='deck-length-0-button' onClick={()=>setRoute(0)}>Edit Deck</button>
                </div>
            </div>
        )
    }

    return (
    <div>
        <div className='simple-deck-container'>
            <EditEditCardPopup front={editFront} back={editBack} setFront={setEditFront} setBack={setEditBack} deck={copyDeck} setDeck={setCopyDeck} editDeck={editDeck} setEditDeck={setEditDeck} editIndex={editIndex}/>
            <DeleteConfirm display={deleteConfirm} setDisplay={setDeleteConfirm} onDelete={deleteItem} indexToDelete={editIndex} itemToDelete={itemToDelete}/>
            <SuccessAndFailPopUp success={success} setSuccess={setSuccess} fail={fail} setFail={setFail} message={message} name={deck.name}/>
            {copyDeck.map((x, i)=>{
                return(
                    <div className='simple-deck-item-container' key={`simple-deck-item-${i}`}>
                        <div className='simple-card'>
                            <div className='simple-text'>{flipedArr[i] === true ? x.question : x.answer}</div>
                            <div className='red-line'></div>
                            <div className='blue-line-1'></div>
                            <div className='blue-line-2'></div>
                            <div className='blue-line-3'></div>
                            <div className='blue-line-4'></div>
                            <div className='blue-line-5'></div>
                        </div>
                        <div className='simple-deck-item-button-container'>
                            <button className='simple-deck-button' onClick={()=>handleEdit(x.question, x.answer, i)}>Edit</button>
                            <button className='simple-deck-button' onClick={()=>handleDelete(i)}>Delete</button>
                            <button className='simple-deck-button' onClick={()=>handleFlip(i)}>Flip</button>
                        </div>
                    </div>
                )
            })}
    </div>
    <button onClick={updateDeck}>Save Changes</button>
    <button onClick={()=>console.log(deck.deck.length)}>HI</button>
    </div>
)
  }


export default EditSimpleDeckView;