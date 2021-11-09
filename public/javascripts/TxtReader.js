import DocumentContent from "./DocumentContent.js"
import DocumentPage from "./DocumentPage.js"

export default class TxtReader {
    /**
     * Reads a txt file
     * @param {File} file File to read
     * @returns {Promise<DocumentContent>} Txt file content
     */
    parseTxtFile(file) {
        if (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()

                reader.addEventListener("load", () => {
                    // this will then display a text file
                    const documentPage = new DocumentPage(1, [reader.result])
                    const documentContent = new DocumentContent([documentPage])
                    resolve(documentContent)
                }, false)

                reader.onerror = e => reject(e.target.error)

                reader.readAsText(file)
            })
        } else {
            return Promise.reject("No file selected!")
        }
    }
}