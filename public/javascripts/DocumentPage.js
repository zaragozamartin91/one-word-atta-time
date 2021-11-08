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
}