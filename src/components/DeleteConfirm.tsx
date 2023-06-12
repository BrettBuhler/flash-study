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

    const itemLines = itemToDelete.split("\n").map((line, index) => (
        <p key={`lineItem${index}`} className="item-line">
          {line}
        </p>
    ))
    
    return (
        <div className="delete-confirm-background">
            <div className="delete-confirm-container">
                <h3 className="delete-confrim-title">Are you sure you want to delete:</h3>
                <div className="item-to-delete">{itemLines}</div>
                <div className="delete-confirm-button-container">
                    <button className="delete-confirm-button" onClick={handleYes}>Yes</button>
                    <button className="delete-confirm-button" onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm