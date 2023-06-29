import Deck from "../classes/Deck";
import Card from "../classes/Card";
import { useState } from 'react';
import SimpleDeckView from "./SimpleDeckView";
import SuccessAndFailPopUp from "./SuccessAndFailPopUp";
import ErrorPopup from "./ErrorPopup";
import LoadingCircle from "./LoadingCircle";
import axios from 'axios'

import '../styles/AddCardsFromAI.css'

interface AddCardsFromAIProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  deck: Deck;
  isEdit: boolean
}

let numbers = [5, 10, 15, 20];

const AddCardsFromAI: React.FC<AddCardsFromAIProps> = ({ user, setUser, deck, isEdit }) => {
  const [topic, setTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const [num, setNum] = useState(5);
  const [errorPopup, setErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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
    if (isEdit === false){
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
    } else {
      try {
        const response = await axios.put(`${process.env.REACT_APP_URL}api/addcards`, {"_id": _id, "name": name, "cards": saveCards})
        if (response.data.user){
            setUser(response.data.user)
            setMessage(`Added ${cards.length} cards to ${name}`)
            setSuccess(true)
        } else {
            setFail(true)
            setMessage(`Unable to save ${deck.name} with updated cards`)
        }
      } catch (error) {
          console.error(error)
          setFail(true)
      }
    }
}

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true)
    const submitHelper = async () => {
      if (user.ai_tokens < num * 100){
        setErrorMessage(`This request will cost ${num * 100} tokens. Please visit the shop to buy more`)
        setErrorPopup(true)
        setIsLoading(false)
        return null
      }
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
    <div className="addCardsFromAI-background">
          <div className="add-cards-from-ai-main">
      {isLoading && (
        <LoadingCircle />
      )}
      <ErrorPopup error={errorPopup} setError={setErrorPopup} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
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
        <div className="add-cards-from-ai-button-container">
          <button type="submit" className="add-deck-button wide-button">Make Cards</button>
          {cards.length > 0 && (<button className="add-deck-button wide-button" type='button' onClick={handleSave}> Save Deck</button>)}
        </div>
      </form>
    </div>
    {cards.length > 0 && (
        <div className="add-cards-from-ai-deck-preview">
          <SimpleDeckView deck={cards} setDeck={setCards} />
        </div>
    )}
    </div>
  );
};

export default AddCardsFromAI;