export default class Phrase {
    content = ""

    constructor(content) {
        this.content = content
    }

    get words() {
        return this.content
            .split(/ +/)                // split content by spaces
            .map(w => w.trim())         // trim each word
            .filter(w => w.length > 0)  // remove blanks
    }
}