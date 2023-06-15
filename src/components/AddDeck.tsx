import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar'

interface AddDeckProps {
  setUser: React.Dispatch<React.SetStateAction<{}>>
  user: any
}

enum AddDeckOption {
  AI = 'AI',
  Text = 'Text',
  Manual = 'Manual',
}

const AddDeck: React.FC<AddDeckProps> = ({ user, setUser }) => {
  const [selectedOption, setSelectedOption] = useState<AddDeckOption | null>(null);

  const navigate = useNavigate()

  const handleOptionSelect = (option: AddDeckOption) => {
    setSelectedOption(option);
  };

  const handleAddDeck = () => {
    // Handle adding the deck based on the selected option
    if (selectedOption === AddDeckOption.AI) {
      navigate('/add-deck/ai')
    } else if (selectedOption === AddDeckOption.Text) {
      navigate('/add-deck/text')
    } else if (selectedOption === AddDeckOption.Manual) {
      navigate('/add-deck/manual')
    } else {
      console.error(`selectedOption: ${selectedOption} should equal AI, TEXT, or MANUAL`)
    }
  };

  return (
    <div>
        <TopBar user={user} setUser={setUser}/>
        <h2>Add Deck</h2>
        <div>
            <p>Select how you want to add a deck:</p>
            <ul>
                <li>
                    <button onClick={() => handleOptionSelect(AddDeckOption.AI)}>Add with AI</button>
                </li>
                <li>
                    <button onClick={() => handleOptionSelect(AddDeckOption.Text)}>Add from Text</button>
                </li>
                <li>
                    <button onClick={() => handleOptionSelect(AddDeckOption.Manual)}>Add Manually</button>
                </li>
            </ul>
        </div>
        {selectedOption && (
            <div>
            {/* Render additional form/input fields based on the selected option */}
            {selectedOption === AddDeckOption.AI && <p>AI Option Selected</p>}
            {selectedOption === AddDeckOption.Text && <p>Text Option Selected</p>}
            {selectedOption === AddDeckOption.Manual && <p>Manual Option Selected</p>}
            <button onClick={handleAddDeck}>Add Deck</button>
            </div>
        )}
    </div>
  );
};

export default AddDeck;