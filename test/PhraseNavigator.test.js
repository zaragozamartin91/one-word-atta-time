import Phrase from '../docs/javascripts/Phrase.js'
import PhraseNavigator from '../docs/javascripts/PhraseNavigator.js'

test('navigator with empty phrases should be treated as DONE', () => {
    const phrases = []
    const phraseNavigator = new PhraseNavigator(phrases)

    // Phrase navigator holding empty data is exhausted from the get go
    expect(phraseNavigator.allDone()).toBe(true)
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: '', done: true })
    expect(phraseNavigator.allDone()).toBe(true)
})

test('navigator should iterate words until phrase completion', () => {
    const phrase = new Phrase("This is a phrase")
    const phrases = [phrase]
    const phraseNavigator = new PhraseNavigator(phrases)

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "This", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "a", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "phrase", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: '', done: true })
    expect(phraseNavigator.allDone()).toBe(true)
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: '', done: true }) // extra calls to nextWord issue no new words
    expect(phraseNavigator.allDone()).toBe(true)
})


test('navigator should iterate words and phrases until all phrases & words are exhausted', () => {
    const phrase0 = new Phrase("This is a phrase")
    const phrase1 = new Phrase("Second phrase is here")
    const phrases = [phrase0, phrase1]
    const phraseNavigator = new PhraseNavigator(phrases)

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "This", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "a", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "phrase", done: false })

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "Second", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "phrase", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "here", done: false })

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: '', done: true })
})

test('navigator should move through words and phrases back and forth', () => {
    const phrase0 = new Phrase("This is a phrase")
    const phrase1 = new Phrase("Second phrase is here")
    const phrases = [phrase0, phrase1]
    const phraseNavigator = new PhraseNavigator(phrases)

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "This", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "a", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "phrase", done: false })

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "Second", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "phrase", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "here", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: '', done: true })
    expect(phraseNavigator.allDone()).toBe(true)

    // rewind to previous phrase
    phraseNavigator.prevPhrase()
    expect(phraseNavigator.allDone()).toBe(false)
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "Second", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "phrase", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "here", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: '', done: true })
    expect(phraseNavigator.allDone()).toBe(true)
})


test('rewind till beginning does nothing', () => {
    const phrase0 = new Phrase("This is a phrase")
    const phrase1 = new Phrase("Second phrase is here")
    const phrases = [phrase0, phrase1]
    const phraseNavigator = new PhraseNavigator(phrases)

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "This", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "a", done: false })

    // rewind to previous phrase multiple times
    phraseNavigator.prevPhrase()
    phraseNavigator.prevPhrase()
    phraseNavigator.prevPhrase()
    phraseNavigator.prevPhrase()
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "This", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "a", done: false })
})

test('forward should move to the next phrase', () => {
    const phrase0 = new Phrase("This is a phrase")
    const phrase1 = new Phrase("Second phrase is here")
    const phrases = [phrase0, phrase1]
    const phraseNavigator = new PhraseNavigator(phrases)

    phraseNavigator.nextPhrase()

    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "Second", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "phrase", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "is", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: "here", done: false })
    expect(phraseNavigator.nextWord()).toStrictEqual({ value: '', done: true })
    expect(phraseNavigator.allDone()).toBe(true)

    // forwarding should have no effect when phrases are exhausted
    phraseNavigator.nextPhrase()
    phraseNavigator.nextPhrase()
    expect(phraseNavigator.allDone()).toBe(true)
})