import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ErrorPopup from './ErrorPopup'
import Checkout from './Checkout'

interface StoreProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const Store: React.FC<StoreProps> = ({user, setUser}) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

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
        <div>
            <ErrorPopup error={isError} setError={setIsError} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            <h1>HELLO STORE</h1>
            <button onClick={() => addTokens(100000)}>Add 100,000 tokens</button>
            <Checkout user={user} setUser={setUser} />
        </div>
    )
}

export default Store