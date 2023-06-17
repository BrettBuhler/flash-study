import Deck from "../classes/Deck";
import Card from "../classes/Card";
import { useState } from 'react';
import SimpleDeckView from "./SimpleDeckView";
import SuccessAndFailPopUp from "./SuccessAndFailPopUp";
import LoadingCircle from "./LoadingCircle";
import axios from 'axios'

import '../styles/AddCardsFromAI.css'

interface AddCardsFromAIProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  deck: Deck;
}

let numbers = [5, 10, 15, 20];

const AddCardsFromAI: React.FC<AddCardsFromAIProps> = ({ user, setUser, deck }) => {
  const [aiTokens, setAiTokens] = useState(user.ai_tokens);
  const [topic, setTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const [num, setNum] = useState(5);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [cards, setCards] = useState<string[][]>([])
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleSubTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTopic(event.target.value);
  };

  const handleNumChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNum(Number(event.target.value));
  };

  const handleSave = async () => {
    const cardArr = []
    for (let i = 0; i < cards.length ; i++){
        cardArr.push(new Card(cards[i][0], cards[i][1]))
    }
    const saveCards = cardArr.map(item=>{
        return {question: item.question, answer: item.answer, tries: item.tries, lastTry: item.lastTry}
    })
    const _id = user._id
    const name = deck.name
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}api/add`, {"_id": _id, "name": name, "cards": saveCards})
        if (response.data.user){
            setUser(response.data.user)
            setSuccess(true)
            setMessage(`Saved ${deck.name} with ${saveCards.length} cards`)
        } else {
            setFail(true)
            setMessage(`Unable to save ${deck.name} to database, try again later`)
        }
    } catch (error){
        setFail(true)
        setMessage(`Unable to save ${deck.name} to database, try again later`)
        console.error(error)
    }
}

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true)
    const submitHelper = async () => {
      try{
        const _id = user._id
        const number = num
        const response = await axios.post(`${process.env.REACT_APP_URL}api/cardsfromai`, {_id, number, topic, subTopic})
        if (response.data.user){
          console.log(response.data.cards)
          if (response.data.cards){
            let tempCards = []
            for (let i = 0; i < response.data.cards.length; i++){
              tempCards.push([response.data.cards[i].question, response.data.cards[i].answer])
            }
            setCards(cards.concat(tempCards))
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    submitHelper()
  };

  return (
    <div className="add-cards-from-ai-main">
      {isLoading && (
        <LoadingCircle />
      )}
      <SuccessAndFailPopUp success={success} setSuccess={setSuccess} fail={fail} setFail={setFail} message={message} name={deck.name}/>
      <h2 className="add-cards-from-ai-h2">Add cards to {deck.name}</h2>
      <form onSubmit={handleSubmit} className="add-cards-from-ai-form">
        <label className="add-cards-from-ai-label">Topic:</label>
        <input
          type="text"
          id="topic"
          className="add-cards-from-ai-input"
          value={topic}
          onChange={handleTopicChange}
          required
        />
        <label className="add-cards-from-ai-label">Sub Topic:</label>
        <input
          type="text"
          id="sub-topic"
          className="add-cards-from-ai-input"
          value={subTopic}
          onChange={handleSubTopicChange}
          required
        />
        <label className="add-cards-from-ai-label">Select a number between 5 and 20</label>
        <select
          id="numberSelect"
          name="numberSelect"
          className="number-select"
          value={num}
          onChange={handleNumChange}
          required
        >
          {numbers.map((x) => (
            <option value={x} key={x}
              className="add-cards-from-ai-option"
            >
              {x}
            </option>
          ))}
        </select>
        <button type="submit" className="add-cards-from-ai-button">Make Cards</button>
      </form>
      <button onClick={()=>console.log(cards)}>CARDS</button>
      <button onClick={handleSave}>Save</button>
      <SimpleDeckView deck={cards} setDeck={setCards} />
    </div>
  );
};

export default AddCardsFromAI;