import React, { useEffect, useState } from 'react';
import '../styles/SimpleDeckView.css';
import EditCardPopup from './EditCardPopup';
import DeleteConfirm from './DeleteConfirm';

interface SimpleDeckViewProps {
  deck: string[][];
  setDeck: React.Dispatch<React.SetStateAction<string[][]>>;
}

/*
TODO: Implement Delete logic
*/

const SimpleDeckView: React.FC<SimpleDeckViewProps> = ({ deck, setDeck }) => {
    const [flipedArr, setFlipedArr] = useState(deck.map(x=>true))
    const [editFront, setEditFront] = useState('')
    const [editBack, setEditBack] = useState('')
    const [editDeck, setEditDeck] = useState(false)
    const [editIndex, setEditIndex] = useState(0)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')

    useEffect(()=>{
        if (deck.length > flipedArr.length){
            let newArr = [...flipedArr]
            newArr.push(true)
            setFlipedArr(newArr)
        }
    },[deck])

    const handleEdit = (front: string, back: string, index: number) => {
        console.log(flipedArr)
        setEditFront(front)
        setEditBack(back)
        setEditIndex(index)
        setEditDeck(true)
    }

    const handleDelete = (index: number) => {
        setEditIndex(index)
        const item = `Front: ${deck[index][0]}\n\nBack: ${deck[index][1]}`
        setItemToDelete(item)
        setDeleteConfirm(true)
    }

    const deleteItem = (index: number) => {
        const left = deck.slice(0, index)
        const right = deck.slice(index + 1)
        const newDeck = left.concat(right)
        const flipedLeft = flipedArr.slice(0, index)
        const flipedRight = flipedArr.slice(index + 1)
        const newFliped = flipedLeft.concat(flipedRight)
        setFlipedArr(newFliped)
        setDeck(newDeck)
    }

    if (deck.length === 0) {
        return null
    } else {
        const handleFlip = (num: number) => {
            const newBool = !flipedArr[num]
            let tempArr = [...flipedArr]
            tempArr = tempArr.slice(0,num)
            tempArr.push(newBool)
            tempArr = tempArr.concat(flipedArr.slice(num+1))
            setFlipedArr(tempArr)
            console.log(flipedArr)
        }
        return (
        <div className='simple-deck-container'>
            <EditCardPopup front={editFront} back={editBack} setFront={setEditFront} setBack={setEditBack} deck={deck} setDeck={setDeck} editDeck={editDeck} setEditDeck={setEditDeck} editIndex={editIndex}/>
            <DeleteConfirm display={deleteConfirm} setDisplay={setDeleteConfirm} onDelete={deleteItem} indexToDelete={editIndex} itemToDelete={itemToDelete}/>
            {deck.map((x, i)=>{
                return(
                    <div className='simple-deck-item-container' key={`simple-deck-item-${i}`}>
                        <div className='simple-card'>
                            <div className='simple-text'>{flipedArr[i] === true ? x[0] : x[1]}</div>
                            <div className='red-line'></div>
                            <div className='blue-line-1'></div>
                            <div className='blue-line-2'></div>
                            <div className='blue-line-3'></div>
                            <div className='blue-line-4'></div>
                            <div className='blue-line-5'></div>
                        </div>
                        <div className='simple-deck-item-button-container'>
                            <button className='simple-deck-button' onClick={()=>handleEdit(x[0], x[1], i)}>Edit</button>
                            <button className='simple-deck-button' onClick={()=>handleDelete(i)}>Delete</button>
                            <button className='simple-deck-button' onClick={()=>handleFlip(i)}>Flip</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
  }
}

export default SimpleDeckView;