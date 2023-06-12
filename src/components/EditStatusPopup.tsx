import { useNavigate } from "react-router-dom"
import '../styles/EditStatusPopup.css'


interface EditStatusPopupProps {
    popup: boolean
    setPopup: React.Dispatch<React.SetStateAction<boolean>>
    message: string
    home: boolean
}

const EditStatusPopup: React.FC<EditStatusPopupProps> = ({popup, setPopup, message, home}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        if (home) {
            navigate('/dashboard')
        } else {
            setPopup(false)
        }
    }

    if(!popup) {
        return null
    } else {
        return (
            <div className="edit-status-popup-background">
                <div className="edit-status-popup-container">
                    <p className="edit-status-popup-message">{message}</p>
                    <button className="edit-status-popup-button" onClick={handleClick}>Ok</button>
                </div>

            </div>
        )
    }
}

export default EditStatusPopup