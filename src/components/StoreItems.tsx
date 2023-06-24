import Item from "../classes/Item"

import '../styles/StoreItems.css'

interface StoreItemsProps {
    items: Item[]
}

const StoreItems: React.FC<StoreItemsProps> = ({items}) => {
    return (
        <div className="store-items-container">
            {items.map(item => (<div className="store-items-item wiggle-animation" key={`key.${item.name}`}>
                <img
                className="store-items-item-img"
                src={item.image}
                alt={item.name}
                />
                <div className="store-items-item-text-container">
                    <div className="store-items-item-name">{item.name}</div>
                    <div className="store-items-item-price">{item.price === 0 ? 'Price: Free' : `Price: ${item.price} Tokens`}</div>
                </div>
            </div>))}
        </div>
    )
}

export default StoreItems