import PdfReader from './PdfReader.js'

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        console.log('DOM is ready.')
        const fileInput = document.getElementById('input');
        fileInput.onchange = () => {
            const selectedFile = fileInput.files[0];
            console.log({ selectedFile });

            const pdfReader = new PdfReader({ignoreBlanks: true})
            pdfReader.parsePdfFile(selectedFile).then(texts => console.log(texts))
        }
    }
};