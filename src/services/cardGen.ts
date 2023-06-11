import Card from "../classes/Card";

const cardGen = (q: string, a: string):Card => {
    let newCard = new Card(q, a)
    return newCard
}

export default cardGen