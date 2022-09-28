// @ts-check

import Phrase from './Phrase.js'

/**
 * Generates a phrase's word navigator 
 * @param {Phrase} phrase Phrase to iterate
 */
function* wordNavigator(phrase) {
    const words = phrase?.words || []
    for (let index = 0; index < words.length; index++) {
        yield words[index]
    }
}

export default class PhraseNavigator {
    /** @type {Array<Phrase>} */    phrases = []
    /** @type {Number} */           phraseIdx = 0
    /** @type {Generator} */        wordIterator

    /**
     * Creates a phrase navigator instance based on a list of phrases
     * @param {Array<Phrase>} p List of Phrases to navigate 
     */
    constructor(p) {
        this.phrases = p
        this.reset()
    }

    reset() {
        this.phraseIdx = 0
        return this.initWordIterator()
    }

    nextPhrase() {
        const newPhraseIdx = this.phraseIdx + 1
        this.phraseIdx = Math.min(newPhraseIdx, this.phrases.length)
        return this.initWordIterator()
    }

    prevPhrase() {
        const newPhraseIdx = this.phraseIdx - 1
        this.phraseIdx = Math.max(newPhraseIdx, 0)
        return this.initWordIterator()
    }

    initWordIterator() {
        const phrase = this.phrases[this.phraseIdx]
        this.wordIterator = wordNavigator(phrase)
        return this
    }

    /**
     * Retrieves next word within all navigator phrases
     * @returns {{value:String, done:Boolean}}
     */
    nextWord() {
        // if ALL phrase navigation should end -> return DONE object
        if (this.allDone()) {
            return { value: '', done: true }
        }

        // if the CURRENT phrase is done, then goto next phrase and return next word
        const { value, done } = this.wordIterator.next()
        if (done) {
            return this.nextPhrase().nextWord()
        }

        // else return next word within this phrase
        return { value, done }
    }

    /**
     * Returns True if all phrases were exhausted ; False otherwise
     * @returns True if all phrases were exhausted ; False otherwise
     */
    allDone() { return this.phraseIdx == this.phrases.length }
}