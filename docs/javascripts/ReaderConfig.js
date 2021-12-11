const TEXT_SIZE_OPTIONS = {
    "VERY SMALL": "14px",
    "SMALL": "18px",
    "REGULAR": "22px",
    "BIG": "26px",
    "VERY BIG": "30px",
    "LARGE": "34px",
    "EXTRA LARGE": "38px",
}

export default class ReaderConfig {
    wordsPerMinute = 200
    fontSize = "REGULAR"

    constructor({ wordsPerMinute, fontSize }) {
        this.wordsPerMinute = wordsPerMinute
        this.fontSize = fontSize
    }

    asObject() {
        const { wordsPerMinute, fontSize } = this
        return { wordsPerMinute, fontSize }
    }

    /**
     * Generates Default Reader configuration
     * @returns Default Reader configuration
     */
    static getDefault() {
        return new ReaderConfig({ wordsPerMinute: 200, fontSize: "REGULAR" })
    }

    /**
     * Gets delay to apply on every word before printing
     */
    get delayMs() {
        return 1000 * 60 / this.wordsPerMinute
    }

    /**
     * Gets font size of word in PIXELs
     */
    get fontSizePx() {
        return ReaderConfig.getFontSizePx(this.fontSize)
    }

    /**
     * Parses font size config in pixels given a font size key
     * @param {string} fs Font size key. E.g.: "REGULAR"
     * @returns Font size configuration in PIXELs
     */
    static getFontSizePx(fs) {
        return TEXT_SIZE_OPTIONS[fs]
    }

    /**
     * Gets font size keys
     * @returns Font size keys
     */
    static getFontSizeKeys() {
        return Object.keys(TEXT_SIZE_OPTIONS)
    }
}