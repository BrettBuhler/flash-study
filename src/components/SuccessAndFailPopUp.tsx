import { useNavigate } from "react-router-dom"

import '../styles/SuccessAndFailPopUp.css'

interface SuccessAndFailPopUpProps {
    success: boolean
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    fail: boolean
    setFail: React.Dispatch<React.SetStateAction<boolean>>
    name: string
    message?: string
}

const SuccessAndFailPopUp: React.FC<SuccessAndFailPopUpProps> = ({success, setSuccess, fail, setFail, name, message}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/dashboard')
    }

    if (!success && ! fail){
        return null
    } else if (success){
        return (
            <div className="saf-background">
                <div className="saf-container">
                    <p className="saf-message">{message ? `${message}`: `Successfully added a new Deck under ${name}. Click continue to return to the Dashboard`}</p>
                    <button className="saf-button" onClick={handleClick}>Continue</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="saf-background">
                <div className="saf-container">
                    <p className="saf-message">{`Unable to add deck due to server issue. Please try again later`}</p>
                    <button className="saf-button" onClick={handleClick}>Continue</button>
                </div>
            </div>
        )
    }
}

export default SuccessAndFailPopUp