import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import ErrorPopup from './ErrorPopup'
import StoreItems from './StoreItems'
import Deck from '../classes/Deck'
import TopBar from './TopBar'
import StorePurchase from './StorePurchase'

import Item from '../classes/Item'
import getDecks from '../services/getDecks'
import storeGen from '../services/storeGen'
import tokenImage from '../images/icons8-coin-100.png'

import '../styles/Store.css'

interface StoreProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const Store: React.FC<StoreProps> = ({user, setUser}) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [store, setStore] = useState<undefined | Deck[]>(undefined)
    const [selectedItem, setSelectedItem] = useState<undefined | Item>(undefined)
    const [selectedDeck, setSelectedDeck] = useState<Deck | undefined>(undefined)

    const isMounted = useRef(true)

    useEffect(()=>{

        const getStore = async () => {
            try{
                const response:any = await axios.post(`${process.env.REACT_APP_URL}api/getuserbyid`, {_id: process.env.REACT_APP_STORE_ID})
                if (response.data.user){
                    setStore(getDecks(response.data.user))
                } else {
                    throw new Error('Failed to get store')
                }
            } catch (error){
                console.error(error)
            }
        }
        if (isMounted.current) {
            isMounted.current = false
            getStore()
        }

    },[])

    useEffect(()=>{
        if (selectedItem !== undefined && store){
            for (let i = 0; i < store.length; i++){
                if (store[i].name === selectedItem.name){
                    setSelectedDeck(store[i])
                    break
                }
            }
        }
    },[selectedItem])

    const navigate = useNavigate()

    const handleTokenClick = () => {
        navigate('/store/buytokens')
    }

    /*
    WebHook from Stripe currently adds tokens, Use the function below to add tokens from front end if required in futrue updates
        const addTokens = async (tokens: number) => {
        try {
            const _id = user._id
            const number = tokens
            const response = await axios.post(`${process.env.REACT_APP_URL}api/addtokens`, {_id, number})
            if (response.data.user) {
                setUser(response.data.user)
                setErrorMessage(`Added ${tokens} tokens`)
                setIsError(true)
            } else {
                setErrorMessage('Unable to add tokens')
                setIsError(true)
            }
        } catch (error) {
            console.error(error)
        }
    }
    */
    return (
        <div className='store-main'>
            <TopBar user={user} setUser={setUser} />
            <ErrorPopup error={isError} setError={setIsError} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            <StorePurchase user={user} setUser={setUser} setItem={setSelectedItem} item={selectedItem} deck={selectedDeck}/>
            <div className='store-top-section'>
                <div className='store-text'>
                    <h1 className='store-h1'>Flash Study Store</h1>
                    <p className='store-p'>
Supercharge your learning with our AI tokens! Build decks effortlessly and extract flashcards from text with ease. Each 100K tokens unlocks approximately 1000 flashcards, saving you valuable time and effort. Purchase our AI tokens now and unlock a world of smarter studying.</p>
                </div>
                <div className="store-item-token store-items-item wiggle-animation" onClick={handleTokenClick}>
                    <img
                    className="store-items-item-img"
                    src={tokenImage}
                    alt={'tokens'}
                    />
                    <div className="store-items-item-text-container store-item-token-text-container">
                        <div className="store-items-item-name store-item-100k">100k Tokens</div>
                        <div className="store-items-item-price store-item-price">$5.00 CAD</div>
                    </div>
                </div>
            </div>
            {store !== undefined && (<StoreItems items={storeGen(store)} setSelectedItem={setSelectedItem} />)}
            <div className='store-buttons-container'>
                <button className='add-deck-button wide-button' onClick={()=>navigate('/dashboard')}>Dashboard</button>
            </div>
        </div>
    )
}

export default Store