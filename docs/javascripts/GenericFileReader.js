import DocumentContent from "./DocumentContent.js"
import PdfReader from "./PdfReader.js"
import TxtReader from "./TxtReader.js"

export default class GenericFileReader {
    /**
     * Parses a file
     * @param {File} file File to parse
     * @returns {Promise<DocumentContent>} File content
     */
    parseFile(file) {
        if (file) {
            const fileNameSplit = file.name.split('.')

            // early return for no file extension
            if (fileNameSplit.length <= 1) { return Promise.reject(`File ${file.name} has no extension!`) }

            const fileExtension = fileNameSplit[fileNameSplit.length - 1].trim().toLowerCase()

            switch (fileExtension) {
                case 'pdf':
                    return new PdfReader().parsePdfFile(file)

                case 'txt':
                    return new TxtReader().parseTxtFile(file)

                default:
                    return Promise.reject(`File ${file.name} has unsupported extension ${fileExtension}!`)
            }
        } else {
            return Promise.reject("No file selected!")
        }
    }
}