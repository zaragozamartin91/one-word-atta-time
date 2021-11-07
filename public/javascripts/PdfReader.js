import DocumentContent from "./DocumentContent.js"
import DocumentPage from "./DocumentPage.js"

export default class PdfReader {
  ignoreBlanks = false

  constructor({ ignoreBlanks } = { ignoreBlanks: false }) {
    this.ignoreBlanks = ignoreBlanks
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

  /**
   * Parses file as ArrayBuffer
   * @param {File} file File data 
   * @returns {Promise<ArrayBuffer>} File data
   */
  readFileAsArrayBuffer(file) {
    console.log("Reading file")

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (event) {
        /** @type {ArrayBuffer} */ const buffer = event.target.result
        console.log("Successfully read file into array buffer")
        console.log(buffer)
        console.log(buffer.byteLength)
        resolve(buffer)
      }

      reader.onerror = function (event) {
        reject(event.target.error)
      }

      reader.readAsArrayBuffer(file)
    })
  }
}
