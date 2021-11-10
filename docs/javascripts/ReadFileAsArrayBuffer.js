export default class ReadFileAsArrayBuffer {
    /**
     * Parses file as ArrayBuffer
     * @param {File} file File data 
     * @returns {Promise<ArrayBuffer>} File data
     */
    apply(file) {
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