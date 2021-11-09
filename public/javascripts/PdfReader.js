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
  parsePdfFile(file) {
    return file ? this.readFileAsArrayBuffer(file).then(fileBuffer => {
      const loadingTask = pdfjsLib.getDocument(fileBuffer)

      return loadingTask.promise.then(pdf => {
        const pagePromises = this.parsePages(pdf)

        return Promise.all(pagePromises).then(docPages => {
          return new DocumentContent(docPages)
        })
      })
    }) : Promise.reject("NO file selected!")
  }

  /**
   * Parses a Pdf's text content into promises which will resolve into the pages' text lines
   * @param {*} pdf Pdf file reference
   * @returns {Array<Promise<DocumentPage>>} Promises for pdf pages which would return the page text lines
   */
  parsePages(pdf) {
    const maxPages = pdf._pdfInfo.numPages
    const promises = []

    for (let i = 1; i <= maxPages; i++) { // pages start as 1
      const pageNumber = i
      promises.push(pdf.getPage(pageNumber)
        .then(p => p.getTextContent())
        .then(node => node.items.map(text => text.str))
        .then(lines => new DocumentPage(pageNumber, lines, this.ignoreBlanks))
      )
    }

    return promises
  }
}
