import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar'

import '../styles/Dashboard.css'

import getDecks from '../services/getDecks'

interface DashboardProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<{}>>
}


const Dashboard: React.FC<DashboardProps> = ({ user, setUser}) => {

    const navigate = useNavigate()

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
    return (
        <div className='dashboard-main'>
            <TopBar user={user} setUser={setUser}/>
            <div className='dashboard-welcome'>
                <h2 className='dashboard-welcome-h2'>Welcom to Flash Study</h2>
                <p className='dashboard-welcome-p'>Flash Study is a powerful learning tool that helps you track and master your decks of flashcards.</p>
                <p className='dashboard-welcome-p'>Create personalized decks for any subject or topic you want to learn, and Flash Study will assist you in monitoring your progress.
    As you study, the app keeps track of your performance and mastery levels for each deck.</p>
            </div>
            <div className='dashboard-menu'>
                <div className='dashboard-study dashboard-item wiggle-animation' onClick={()=>navigate('/study')}>Study</div>
                <div className='dashboard-store dashboard-item wiggle-animation' onClick={()=>navigate('/store')}>Store</div>
                <div className='dashboard-add dashboard-item wiggle-animation' onClick={()=>navigate('/add-deck')}>Add Deck</div>
                <div className='dashboard-edit dashboard-item wiggle-animation' onClick={()=>navigate('/edit-decks')}>Edit Decks</div>
                <div className='dashboard-stats dashboard-item wiggle-animation' onClick={()=>navigate('/stats')}>Stats</div>
                <div className='dashboard-help dashboard-item wiggle-animation' onClick={()=>navigate('/help')}>Help</div>
            </div>
        </div>
    )
}

export default Dashboard