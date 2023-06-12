import TopBar from "./TopBar"
import SimpleDeckView from "./SimpleDeckView"
import { useEffect, useState } from 'react'
import EditDeckSelect from "./EditDeckSelect"
import EditSelectedDeck from "./EditSelectedDeck"
import Deck from "../classes/Deck"
import Card from "../classes/Card"
import cardGen from "../services/cardGen"
import deckGen from "../services/deckGen"
import { useNavigate } from "react-router-dom"

interface EditDecksProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const EditDecks: React.FC<EditDecksProps> = ({user, setUser}) => {
    const [selectedIndex, setSelectedIndex] = useState<boolean | number>(false)
    const [decks, setDecks] = useState<Deck[]>([])
    const navigate = useNavigate()


    useEffect(()=> {
        if (Object.keys(user).length === 0){
            navigate('/dashboard')
        }
        const userDecks = user.decks
        let resArray = []
        for (let i = 0; i < userDecks.length; i++){
            let newDeck = []
            for (let j = 0; j < userDecks[i].cards.length; j++){
                let newCard = new Card(userDecks[i].cards[j].question, userDecks[i].cards[j].answer, userDecks[i].cards[j].tries, userDecks[i].cards[j].lastTry)
                newDeck.push(newCard)
            }
            let resDeck = deckGen(userDecks[i].name, newDeck)
            resArray.push(resDeck)
        }
        setDecks(resArray)
    },[])


    return (
        <div className="edit-decks-main">
            <TopBar user={user} setUser={setUser} />
            {selectedIndex === false && (
                <div>
                    <EditDeckSelect selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} decks={decks}/>
                    <p>Hello World</p>
                    <button onClick={()=>console.log(decks)}>HERE</button>
                </div>
            )}
            {selectedIndex !== false &&(
                <div>
                    <EditSelectedDeck user={user} setUser={setUser} deck={decks[typeof selectedIndex == 'number' ? selectedIndex : 0]} />
                </div>
            )}
        </div>
    )
}

export default EditDecks