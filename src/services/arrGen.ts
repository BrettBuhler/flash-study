const arrGen = (str: string): string[] => {
    const sentences = str.split(/(?<=[.!?])\s+/)

    let chunks = [];
    let currentChunk = ''
    let wordCount = 0

    for (let i = 0; i < sentences.length; i++){
        const sentence = sentences[i]
        const sentenceWordCount = sentence.split(' ').length

        if (wordCount + sentenceWordCount <= 1000) {
            currentChunk += sentence + ' '
            wordCount += sentenceWordCount
        } else {
            chunks.push(currentChunk.trim())
            currentChunk = sentence + ' '
            wordCount = sentenceWordCount
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim())
    }

    return chunks
}

export default arrGen