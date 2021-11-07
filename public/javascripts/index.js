import PdfReader from './PdfReader.js'
import SessionStorage from './SessionStorage.js'

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        console.log('DOM is ready.')
        const fileInput = document.getElementById('input')
        fileInput.onchange = () => {
            const selectedFile = fileInput.files[0]
            console.log({ selectedFile })

            const pdfReader = new PdfReader({ ignoreBlanks: true })
            pdfReader.parsePdfFile(selectedFile)
                .then(texts => {
                    console.log(texts)
                    const { numpages, lines } = texts
                    console.log("Saving text data into session storage")
                    const ss = new SessionStorage()
                    ss.storeNumber("numpages", numpages)
                    ss.storeArray("lines", lines)
                }).catch(reason => {
                    console.error("Error occurred while processing text file")
                    console.error(reason)
                })
        }
    }
}