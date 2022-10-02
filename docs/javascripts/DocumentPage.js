import Prhase from './Phrase.js'

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
        return this.phrases.flatMap(p => p.words)
    }

    /**
     * @returns {Array<Prhase>} This page's phrases
     */
    get phrases() {
        const pageText = this.lines.reduce((accum, curr) => accum.concat(' ', curr), '')
        const eliRex = /\.{2,}/
        const eliStub = '__3ll1p__'
        const curatedText = pageText.replace(eliRex, eliStub)
        return curatedText.split(/(\. +| +\.| +\. +)/)      // dot&space = sentence end
            .map(p => p.trim())                             // trim phrase
            .filter(p => p.length > 0)                      // remove empty phrases
            .filter(p => p !== '.')                         // remove 'JUST DOTS' phrases
            .map(p => p.replace(eliStub, '...'))            // restore ellipsis for proper content
            .map(p => p.endsWith('.') ? p : p.concat('.'))  // end prhases with dots
            .map(p => new Prhase(p))
    }
}