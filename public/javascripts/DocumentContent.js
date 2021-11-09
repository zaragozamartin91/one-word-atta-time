import DocumentPage from "./DocumentPage.js"

export default class DocumentContent {
    /** @type {Array<DocumentPage>} */ documentPages = []

    /**
     * Creates a document content reference
     * @param {Array<DocumentPage>} dps Document pages 
     */
    constructor(dps) {
        this.documentPages = dps
    }

    get numpages() {
        return this.documentPages.length
    }

    /**
     * Returns an object representation of the document content
     * @returns {{numpages: number, documentPages: Array<DocumentPage>}}
     */
    asObject() {
        const dps = this.documentPages.map(dp => dp.asObject())
        return { numpages: this.numpages, documentPages: dps }
    }

    /**
     * Returns a new document content reference with the specified range
     * @param {number} startPage start page
     * @param {number} endPage end page (inclusive)
     * @returns New document content with specified page range
     */
    withPageRange(startPage = Number.MIN_SAFE_INTEGER, endPage = Number.MAX_SAFE_INTEGER) {
        const dps = this.documentPages.filter(dp => dp.page >= startPage && dp.page <= endPage)
        return new DocumentContent(dps)
    }

    get lines() {
        return this.documentPages.flatMap(dp => dp.lines)
    }

    get words() {
        return this.documentPages.flatMap(dp => dp.words)
    }

    /**
     * Creates a DocumentContent reference from a pure object
     * @param {{documentPages: Array<{page: number, lines: Array<String>}>}} param0 
     */
    static fromObject({ documentPages }) {
        const dps = documentPages.map(dp => DocumentPage.fromObject(dp))
        return new DocumentContent(dps)
    }
}