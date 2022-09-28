// @ts-check

import DocumentContent from "./DocumentContent.js"
import PhraseNavigator from './PhraseNavigator.js'

export default class DocumentNavigator {
    /** @type{DocumentContent} */   documentContent
    /** @type{PhraseNavigator} */   phraseNavigator
    
    /**
     * Creates a new Document navigator reference
     * @param {DocumentContent} dc Document content to navigate
     */
    constructor(dc) {
        this.documentContent = dc
        this.restart()
    }

    /**
     * Restarts document navigator pointer
     */
    restart() {
        this.phraseNavigator = new PhraseNavigator(this.documentContent.phrases)
        return this
    }

    get done() {
        return this.phraseNavigator.allDone()
    }

    nextWord() {
        return this.phraseNavigator.nextWord().value
    }

    nextPhrase() {
        this.phraseNavigator.nextPhrase()
    }

    prevPhrase() {
        this.phraseNavigator.prevPhrase()
    }
}