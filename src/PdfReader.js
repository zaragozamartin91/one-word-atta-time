const arrayBufferToBuffer = require('arraybuffer-to-buffer');
const pdf = require('./pdf-parse');

module.exports = class PdfReader {
    /**
     * Parses a pdf file
     * @param {File} file Input file
     * @returns {Promise<{numpages:number, text:string}>} File data
     */
    parsePdfFile(file) {
        return this.readFileAsArrayBuffer(file)
            .then(fileArrayBuffer => arrayBufferToBuffer(fileArrayBuffer))
            .then(fileBuffer => pdf(fileBuffer))
            .then(data => this.peekPdf(data))
            .then(data => {
                const { numpages, text } = data
                return { numpages, text }
            })
            .catch(reason => {
                console.error("Error while processing file:", reason)
            })
    }

    /**
     * Parses file as ArrayBuffer
     * @param {File} file File data 
     * @returns {Promise<ArrayBuffer>} File data
     */
    readFileAsArrayBuffer(file) {
        console.log("Reading file")

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                /** @type {ArrayBuffer} */ const buffer = event.target.result;
                console.log("Successfully read file into array buffer")
                console.log(buffer);
                console.log(buffer.byteLength);
                resolve(buffer);
            };

            reader.onerror = function (event) {
                reject(event.target.error);
            }

            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Peeks
     *  pdf file data
     * @param {pdf.Result} data Pdf file data
     * @returns {pdf.Result} Pdf param
     */
    peekPdf(data) {
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text);

        return data;
    }
}
