import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import AddDeck from './AddDeck'
import TopBar from './TopBar'

interface DashboardProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<{}>>
}


const Dashboard: React.FC<DashboardProps> = ({ user, setUser}) => {

    useEffect(()=>{
        if (Object.keys(user).length === 0){
            getAuth()
        }
    },[])

    const getAuth = async () => {
        try {
            const response = await axios.post('/api/getauth')
            if (response.data.user){
                setUser(response.data.user)
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const testLogout = async () => {
            try {
                const response = await axios.get('/api/logout')
                console.log(response.status)
                setUser({})
                window.location.href = '/'
            } catch (error) {
                console.error(error)
            }
    }
    return (
        <div>
            <TopBar user={user} setUser={setUser}/>
            <button onClick={testLogout}>Logout</button>
            <div>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

export default Dashboard