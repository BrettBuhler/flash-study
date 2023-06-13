import React, { useState } from 'react';
import '../styles/SimpleDeckView.css';
import EditEditCardPopup from './EditEditCardPopup';
import DeleteConfirm from './DeleteConfirm';
import Deck from '../classes/Deck';

interface EditSimpleDeckViewProps {
    deck: Deck
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}


const EditSimpleDeckView: React.FC<EditSimpleDeckViewProps> = ({ user, setUser, deck }) => {
    const [flipedArr, setFlipedArr] = useState(deck.deck.map(x=>true))
    const [copyDeck, setCopyDeck] = useState(deck.deck.map(item=>item))
    const [editFront, setEditFront] = useState('')
    const [editBack, setEditBack] = useState('')
    const [editDeck, setEditDeck] = useState(false)
    const [editIndex, setEditIndex] = useState(0)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')

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

    }
        return (
        <div>
                    <div className='simple-deck-container'>
            <EditEditCardPopup front={editFront} back={editBack} setFront={setEditFront} setBack={setEditBack} deck={copyDeck} setDeck={setCopyDeck} editDeck={editDeck} setEditDeck={setEditDeck} editIndex={editIndex}/>
            <DeleteConfirm display={deleteConfirm} setDisplay={setDeleteConfirm} onDelete={deleteItem} indexToDelete={editIndex} itemToDelete={itemToDelete}/>
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
        </div>
    )
  }


export default EditSimpleDeckView;