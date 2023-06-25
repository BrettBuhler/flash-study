import { useState } from 'react'

import '../styles/StorePurchase.css'
import axios from 'axios'

import Card from '../classes/Card'
import Deck from '../classes/Deck'

import SuccessAndFailPopUp from './SuccessAndFailPopUp'

interface StorePurchaseProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    item: any
    setItem: React.Dispatch<React.SetStateAction<any>>
    deck: Deck | undefined
}

const StorePurchase: React.FC<StorePurchaseProps> = ({user, setUser, item, setItem, deck}) => {
    const [success, setSuccess] = useState<boolean>(false)
    const [fail, setFail] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')


    const handleNo = () => {
        setItem(undefined)
    }

    const handleYes = () => {

        const name = checkName(item.name)
        const nameFlag = name === item.name
        const handleYesHelper = async () => {
            try {
                const _id = user._id
                if (deck?.deck){
                    const tempCards = deck.deck.map(card => new Card(card.question, card.answer))
                    const response = await axios.post(`${process.env.REACT_APP_URL}api/add`, {_id: _id, name: name, cards: tempCards})
                    console.log(deck)
                    console.log(name, _id)
                    console.log(response.data)
                    if (response.data.user){
                        setUser(response.data.user)
                        setSuccess(true)
                        console.log('nameflag', nameFlag)
                        if (!nameFlag) {
                            setMessage(`${item.name} was already saved under your decks so your new deck was saved under ${name}. Returning to Dashboard`)
                        } else {
                            setMessage(`Successfully added ${name} to your decks. Returning to Dashboard`)
                        }
                    } else {
                        throw new Error('Internal Server Error')
                    }
                } else {
                    throw new Error('deck is undefined')
                }
            } catch (error) {
                console.error(error)
                setMessage(`${error}`)
                setFail(true)
            }
        }
        handleYesHelper()
    }

    const checkName = (name: string, index: number = 0): string=> {
        let copy = name
        if (index > 0){
            for (let i = 0; i < user.decks.length; i++){
                if (`${copy}${index}` === user.decks[i].name){
                    return checkName(`${copy}`, index+1)
                }
            }
        } else {
            for (let i = 0; i < user.decks.length; i++){
                if (copy === user.decks[i].name){
                    return checkName(`${copy}`, index+1)
                }
            }
        }
        for (let i = 0; i < user.decks.length; i++){
            if (copy === user.decks[i].name){
                return checkName(`${copy}${index}`, index+1)
            }
        }
        return copy
    }

    if (item === undefined){
        return null
    } else if (success === false && fail === false) {
        return (
            <div className="store-purchase-background">
                <div className="store-purchase-popup">
                    <div className="store-purchase-text">Are you sure you want to purchase {item.name} for {item.price} tokens? You have {user.ai_tokens} remaining Tokens.</div>
                    <div className="store-purchase-buttons">
                        <button className="store-purchase-button" onClick={handleYes}>Yes</button>
                        <button className="store-purchase-button" onClick={handleNo}>No</button>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <SuccessAndFailPopUp success={success} setSuccess={setSuccess} fail={fail} setFail={setFail} name={item.name} message={message}/>
        )
    }
}

export default StorePurchase