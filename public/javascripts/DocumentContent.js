import DocumentPage from "./DocumentPage.js"

export default class DocumentContent {
    /**
     * @type {Array<DocumentPage>}
     */
    documentPages = []

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
}