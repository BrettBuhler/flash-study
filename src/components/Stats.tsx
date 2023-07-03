import Deck from "../classes/Deck"
import Card from "../classes/Card"
import TopBar from "./TopBar"
import StatsItem from "./StatsItem"
import StatsItemHeader from "./StatsItemsHeader"
import getDeckMastery from "../services/getDeckMastery"

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import '../styles/Stats.css'

interface StatsProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const Stats: React.FC<StatsProps> = ({user, setUser}) => {
    const [decks, setDecks] = useState<Deck[]>([])
    const [lastStudied, setLastStudied] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if (decks.length === 0){
            let tempDecks = []
            for (let i = 0; i < user.decks.length; i++){
                let tempCards = []
                for (let j = 0; j < user.decks[i].cards.length; j++){
                    tempCards.push(new Card(user.decks[i].cards[j].question, user.decks[i].cards[j].answer, user.decks[i].cards[j].tries, user.decks[i].cards[j].lastTry))
                }
                tempDecks.push(new Deck(user.decks[i].name, tempCards))
            }
            setDecks(tempDecks)
        }
    },[])

    if (user.decks.length === 0){
        return (
            <div>
                <h1>No Stats To Display</h1>
            </div>
        )
    }

    return (
        <div className="stats-main">
            <TopBar user={user} setUser={setUser} />
            <div className="stats-main-stats">
                <h2 className="stats-main-h2">My Statistics</h2>
                <StatsItemHeader/>
                {decks.map((deck: Deck) => {
                    return (
                        <div key = {`someKey${deck.name}`}>
                            <StatsItem name={deck.name} progress={getDeckMastery(deck)} lastTry={new Date()} keyProp={`KEY_${deck.name}`}/>
                        </div>
                    )
                })}
                <div className="stats-footer"></div>
            </div>
            <button onClick={()=>navigate('/dashboard')} className="stats-main-button">Dashboard</button>
            <div className="stats-main-bottom-spacer"></div>
        </div>
    )
}

export default Stats