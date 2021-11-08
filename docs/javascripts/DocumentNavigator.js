import DocumentContent from "./DocumentContent.js"

export default class DocumentNavigator {
    /** @type{DocumentContent} */   documentContent = null
    /** @type{number} */            wordPointer = 0
    /** @type{Array<String>} */     words = []

    /**
     * Creates a new Document navigator reference
     * @param {DocumentContent} dc Document content to navigate
     */
    constructor(dc) {
        this.documentContent = dc
    }

    /**
     * Restarts document navigator pointer
     */
    restart() {
        this.wordPointer = 0
        this.words = this.documentContent.words
        return this
    }

    get done() {
        return this.wordPointer >= this.words.length
    }

    get currentWord() {
        return this.done ? null : this.words[this.wordPointer]
    }

    next() {
        this.wordPointer = Math.min(this.wordPointer + 1, this.words.length)
        return this
    }

    previous() {
        this.wordPointer = Math.max(this.wordPointer - 1, 0)
        return this
    }
}