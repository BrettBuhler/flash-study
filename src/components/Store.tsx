import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import ErrorPopup from './ErrorPopup'
import StoreItems from './StoreItems'
import Deck from '../classes/Deck'
import TopBar from './TopBar'
import Checkout from './Checkout'

import getDecks from '../services/getDecks'
import storeGen from '../services/storeGen'

import '../styles/Store.css'

interface StoreProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const Store: React.FC<StoreProps> = ({user, setUser}) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [store, setStore] = useState<undefined | Deck[]>(undefined)
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

    const navigate = useNavigate()

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

    return (
        <div className='store-main'>
            <TopBar user={user} setUser={setUser} />
            <ErrorPopup error={isError} setError={setIsError} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            <h1 className='store-h1'>HELLO STORE</h1>
            {store !== undefined && (<StoreItems items={storeGen(store)}/>)}
            <button onClick={() => addTokens(100000)}>Add 100,000 tokens</button>
            <button onClick={()=>console.log(store)}>GET STORE</button>
            
        </div>
    )
}

export default Store