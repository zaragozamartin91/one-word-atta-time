export default class PdfReader {
  ignoreBlanks = false

  constructor({ ignoreBlanks } = {ignoreBlanks: false}) {
    this.ignoreBlanks = ignoreBlanks
  }

  /**
   * Parses a pdf file
   * @param {File} file Input file
   * @returns {Promise<{numpages:number, lines:Array<String>}>} File data
   */
  parsePdfFile(file) {
    return this.readFileAsArrayBuffer(file).then(fileBuffer => {
      const loadingTask = pdfjsLib.getDocument(fileBuffer)

      return loadingTask.promise.then(pdf => { 
        const maxPages = pdf._pdfInfo.numPages
        const pagePromises = this.parsePages(pdf)

        return Promise.all(pagePromises).then(pageLines => {
          const lines = pageLines.flatMap(a => a).map(a => a.trim()).filter(a => a.length > 0 || !this.ignoreBlanks)
          const numpages = maxPages
          return { numpages, lines }
        })
      })
    })
  }

  /**
   * Parses a Pdf's text content into promises which will resolve into the pages' text lines
   * @param {*} pdf Pdf file reference
   * @param {number} pageNumber Page number to start from 
   * @param {Array<Promise<Array<String>>>} promises Cumulative page promises 
   * @returns {Array<Promise<Array<String>>>} Promises for pdf pages which would return the page text lines
   */
  parsePages(pdf, pageNumber = 1, promises = []) {
    const maxPages = pdf._pdfInfo.numPages
    if (pageNumber > maxPages) { return promises }
    promises.push(pdf.getPage(pageNumber).then(p => p.getTextContent()).then(node => node.items.map(text => text.str)))
    return this.parsePages(pdf, pageNumber + 1, promises)
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
