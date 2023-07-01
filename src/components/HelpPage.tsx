import TopBar from "./TopBar";
import '../styles/HelpPage.css'

import { useNavigate } from "react-router-dom";

interface HelpPageProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const HelpPage: React.FC<HelpPageProps> = ({user, setUser}) => {
    const navigate = useNavigate()
  return (
    <div className="help-page">
        <TopBar user={user} setUser={setUser} />
        <div className="wf-outer">
            <div className="wf-content">
                <h1 className="wf-h1">Welcome to Flash Study!</h1>
                <h2 className="wf-h2">Creating Flashcards:</h2>

                <ol className="help-section">
                <li>
                    <strong>AI-generated Decks:</strong> To create flashcards using AI, click on the "AI Decks" option in the navigation menu.
                    Enter a block of text, and the AI will generate flashcards based on the content. You can customize the number of cards generated
                    and review/edit them before saving the deck.
                </li>
                <li>
                    <strong>Text-based Decks:</strong> If you have specific study material in mind, choose the "Text Decks" option. Here, you can
                    manually enter your content and divide it into individual flashcards. Customize each card with a front-side question and a
                    back-side answer.
                </li>
                <li>
                    <strong>Manual Creation:</strong> For a more hands-on approach, select the "Manual Creation" option. This allows you to create
                    flashcards one by one, adding questions and answers directly. You can organize these cards into decks for easier management.
                </li>
                </ol>

                <h2>Editing Decks:</h2>

                <ol className="help-section">
                <li>
                    <strong>Adding Cards:</strong> To add new cards to an existing deck, navigate to the deck you wish to edit. Click on the
                    "Add Cards" button and follow the prompts to input your new flashcards.
                </li>
                <li>
                    <strong>Merging Decks:</strong> If you have multiple decks and want to consolidate them, use the "Merge Decks" feature. Select
                    the decks you wish to merge, and Flash Study will combine them into a single deck while retaining all the flashcards.
                </li>
                <li>
                    <strong>Editing Card Content:</strong> To make changes to the content of a flashcard, go to the deck and click on the card you
                    want to edit. Modify the question or answer as needed, and remember to save your changes.
                </li>
                </ol>

                <h2>Store and AI Tokens:</h2>

                <ol className="help-section">
                <li>
                    <strong>Store:</strong> Flash Study provides a store where you can browse and purchase prebuilt decks created by experts in
                    various subjects. Explore the store to find decks that align with your learning goals and add them to your collection.
                </li>
                <li>
                    <strong>AI Tokens:</strong> AI Tokens unlock the advanced AI features of Flash Study, allowing you to create flashcards from
                    blocks of text using the AI capabilities. Visit the store and purchase AI Tokens to enhance your studying experience.
                </li>
                </ol>

                <p>
                We hope this guide helps you navigate Flash Study effectively. If you have any further questions or encounter any issues, please
                don't hesitate to contact our support team. Happy studying!
                </p>
            </div>
            <div className="wf-content">
            <button className="add-deck-button wide-button" onClick={()=>navigate('/dashboard')}>Return to Dashboard</button>
            </div>
        </div>
    </div>
  );
}

export default HelpPage;