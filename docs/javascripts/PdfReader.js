import DocumentContent from "./DocumentContent.js"
import DocumentPage from "./DocumentPage.js"
import ReadFileAsArrayBuffer from "./ReadFileAsArrayBuffer.js"

export default class PdfReader {
  ignoreBlanks = false

  constructor({ ignoreBlanks } = { ignoreBlanks: false }) {
    this.ignoreBlanks = ignoreBlanks
    this.readFileAsArrayBuffer = new ReadFileAsArrayBuffer().apply.bind(this)
  }

  /**
   * Parses a pdf file
   * @param {File} file Input file
   * @returns {Promise<DocumentContent>} File content
   */
  async parsePdfFile(file) {
    if (file) {
      const fileBuffer = await this.readFileAsArrayBuffer(file)
      const pdf = await pdfjsLib.getDocument(fileBuffer).promise
      const docPages = await this.parsePages(pdf)
      return new DocumentContent(docPages)
    } else {
      throw new Error('NO file selected!')
    }
  }

  /**
   * Parses a Pdf's text content into promises which will resolve into the pages' text lines
   * @param {*} pdf Pdf file reference
   * @returns {Promise<Array<DocumentPage>>} Promises for pdf pages which would return the page text lines
   */
  async parsePages(pdf) {
    const maxPages = pdf._pdfInfo.numPages
    const documentPages = []

    for (let i = 1; i <= maxPages; i++) { // pages start as 1
      const pageNumber = i
      const page = await pdf.getPage(pageNumber)
      const textContent = await page.getTextContent()
      const lines = await textContent.items.map(text => text.str)
      const documentPage = new DocumentPage(pageNumber, lines, this.ignoreBlanks)
      documentPages.push({ pageNumber, documentPage })
    }

    // sorting results by page number
    return documentPages.sort((a, b) => a.pageNumber - b.pageNumber).map(x => x.documentPage)
  }
}
