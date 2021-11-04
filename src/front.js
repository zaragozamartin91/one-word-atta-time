// IMPORTS ========================================================================

const pdf = require('./pdf-parse');
const arrayBufferToBuffer = require('arraybuffer-to-buffer');


// DOM LOGIC ========================================================================

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        console.log('DOM is ready.')
        const fileInput = document.getElementById('input');
        fileInput.onchange = () => {
            const selectedFile = fileInput.files[0];
            console.log({ selectedFile });

            readFileAsArrayBuffer(selectedFile)
                .then(fileArrayBuffer => arrayBufferToBuffer(fileArrayBuffer))
                .then(fileBuffer => pdf(fileBuffer))
                .then(data => handlePdfFileData(data))
                .catch(reason => {
                    console.error("Error while processing file:", reason)
                })
        }
    }
};


// API ========================================================================


function readFileAsArrayBuffer(file) {
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
 * Handles pdf file data
 * @param {pdf.Result} data Pdf file data
 */
function handlePdfFileData(data) {
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

    return true;
}