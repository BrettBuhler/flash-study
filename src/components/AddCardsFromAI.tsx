import Deck from "../classes/Deck"

interface AddCardsFromAIProps {
    user: any,
    setUser: React.Dispatch<React.SetStateAction<any>>
    deck: Deck
}

let numbers = [5, 10, 15, 20, 25, 30]

const AddCardsFromAI: React.FC<AddCardsFromAIProps> = ({user, setUser, deck}) => {
    return (
        <div className="add-cards-from-ai-main">
            <h2>Add cards to {deck.name}</h2>
            <form>
                <label>Topic:</label>
                <input type="text" id="topic"></input>
                <label>Sub Topic:</label>
                <input type="text" id="sub-topic"></input>
                <label>Select a number between 5 and 20</label>
                <select id="numberSelect" name="numberSelect">
                    {numbers.map(x => <option value={x}>{x}</option>)}
                </select>
                <button type="submit">Make Cards</button>
            </form>
        </div>
    )
}

export default AddCardsFromAI