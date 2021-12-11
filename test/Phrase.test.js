import Phrase from '../docs/javascripts/Phrase.js'

test('phrase should be splitted into words by spaces', () => {
    const phrase = new Phrase("This is a regular phrase")
    expect(phrase.words).toStrictEqual([
        "This", "is", "a", "regular", "phrase"
    ])
})

test('a phrase that splits into words consumes consecutive spaces and ignore blanks', () => {
    const phrase = new Phrase("  This is    a       regular phrase   ")
    expect(phrase.words).toStrictEqual([
        "This", "is", "a", "regular", "phrase"
    ])
})
