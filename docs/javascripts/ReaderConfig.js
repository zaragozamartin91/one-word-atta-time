export default class ReaderConfig {
    wordsPerMinute = 200

    constructor({ wordsPerMinute }) {
        this.wordsPerMinute = wordsPerMinute
    }

    asObject() {
        const { wordsPerMinute } = this
        return { wordsPerMinute }
    }

    static getDefault() {
        return new ReaderConfig({ wordsPerMinute: 200 })
    }

    static fromObject(obj) {
        const { wordsPerMinute } = obj
        return new ReaderConfig({ wordsPerMinute })
    }

    get delayMs() {
        return 1000 * 60 / this.wordsPerMinute
    }
}