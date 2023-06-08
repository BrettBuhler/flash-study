class Card {
    question: string
    answer: string
    tries: number[]
    lastTry: Date

    constructor(question: string, answer: string, tries: number[] = [0,0,0]){
        this.question = question
        this.answer = answer
        this.tries = tries
        this.lastTry = new Date ()
    }

    private setTrys (difficulty: number): void {
        let newTries = [...this.tries]
        newTries.push(difficulty)
        this.tries = newTries.slice(1)
        this.lastSolved()
    }

    private lastSolved (): void {
        this.lastTry = new Date()
    }

    easy(): void {
        this.setTrys(2)
    }
    medium(): void {
        this.setTrys(1)
    }
    hard(): void {
        this.setTrys(0)
    }
    
}

export default Card