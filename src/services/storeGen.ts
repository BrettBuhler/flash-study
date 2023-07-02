import Item from "../classes/Item"
import Deck from "../classes/Deck"
import reactImg from '../images/icons8-react-100.png'
import nodeImg from '../images/icons8-node-js-100.png'
import jsImg from '../images/icons8-javascript-1001.png'
import bioImg from '../images/icons8-biology-96.png'
import physicsImg from '../images/icons8-physics-100.png'
import oneHundredDevsImg from '../images/icons8-100-100.png'

const stash = [reactImg, nodeImg, jsImg, bioImg, physicsImg, oneHundredDevsImg]

const storeGen = (items: Deck[]):Item[] => {
    let j = 0
    let storeArr = []
    for (let i = 0; i < items.length; i++){
        let newItem = new Item(items[i].name, stash[j], 0)
        storeArr.push(newItem)
        if (j < stash.length - 1){
            j++
        } else {
            j = 0
        }
    }
    return storeArr
}

export default storeGen

