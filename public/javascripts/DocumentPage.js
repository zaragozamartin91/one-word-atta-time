export default class DocumentPage {
    /** @type{number} */        page = 0
    /** @type{Array<String>} */ lines = []

    /**
     * Creates a document page with text content
     * @param {number} page Page number
     * @param {Array<String>} lines Page lines
     * @param {Boolean} ignoreBlanks True if blank lines should be ignored
     */
    constructor(page, lines, ignoreBlanks = false) {
        this.page = page
        this.lines = lines.map(a => a.trim()).filter(a => a.length > 0 || !ignoreBlanks)
    }

    /**
     * Returns an object representation of a Document Page
     * @returns {{page: number, lines: Array<String>}}
     */
    asObject() {
        return { page: this.page, lines: this.lines }
    }

    static fromObject({ page, lines }) {
        return new DocumentPage(page, lines)
    }

    get words() {
        return this.phrases.flatMap(a => a).map(s => s.trim()).filter(s => s.length > 0)
    }

    get phrases() {
        const words = this.lines.flatMap(ln => ln.split(' '))
        const phrases = []

        const ellipsisMatch = w => { return (w?.match(/\./g) || []).length > 1 }
        const lastWordIndex = words.length - 1

        for (let phraseStart = 0, phraseEnd = 0; phraseStart < words.length; phraseEnd = phraseEnd + 1) {
            const currWord = words[phraseEnd]?.trim() || ''

            const pageDone = phraseEnd >= lastWordIndex // last word reached
            const ignoreWord = ellipsisMatch(currWord) || currWord.length == 0
            const acknowledgeWord = !ignoreWord
            const endOfPhraseFound = currWord.endsWith('.')

            if (pageDone || acknowledgeWord && endOfPhraseFound) {
                // page done or full phrase detected , push phrase into array
                const phrase = words.slice(phraseStart, phraseEnd)
                phrase.push(currWord)
                phrases.push(phrase)
                phraseStart = phraseEnd + 1
            }
        }

        return phrases
    }
}