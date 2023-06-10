import React from 'react'
import axios from 'axios'

interface DashboardProps {
    user: object
    setUser: React.Dispatch<React.SetStateAction<{}>>
}


const Dashboard: React.FC<DashboardProps> = ({ user, setUser}) => {
    const testLogout = async () => {
            try {
                const response = await axios.get('/api/logout')
                window.location.href = '/'
            } catch (error) {
                console.error(error)
            }
    }
    return (
        <div>
            <button onClick={testLogout}>Logout</button>
        </div>
    )
}

export default Dashboard