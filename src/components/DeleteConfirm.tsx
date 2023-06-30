import '../styles/DeleteConfirm.css'

interface DeleteConfirmProps {
    display: boolean
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>
    onDelete: (num: number) => void
    indexToDelete: number
    itemToDelete: string
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({display, setDisplay, onDelete, itemToDelete, indexToDelete}) => {
    
    const handleYes = () => {
        onDelete(indexToDelete)
        setDisplay(false)
    }

    const handleNo = () => {
        setDisplay(false)
    }
    
    
    if(!display){
        return null
    }

    const itemLines = itemToDelete.split("Back:").map((line, index) => {
        return line
    })
    
    return (
        <div className="delete-confirm-background">
            <div className="edit-card-popup-container">
                <h3 className="delete-confirm-title">Are you sure you want to delete:</h3>
                <div className='delete-confirm-items'>
                    <div className='edit-card-popup-h4'>Front:</div>
                    <textarea value={itemLines[0].slice(7)} className='edit-card-pupup-textarea' onChange={()=>null}></textarea>
                    <div className='edit-card-popup-h4'>Back:</div>
                    <textarea value={itemLines[1]} className='edit-card-pupup-textarea' onChange={()=>null}></textarea>
                </div>
                <div className="delete-confirm-button-container">
                    <button className="add-deck-button" onClick={handleYes}>Yes</button>
                    <button className="add-deck-button" onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm