import DocumentPage from '../docs/javascripts/DocumentPage.js'

test('lines getter should split phrases by dot&Space', () => {
    const page = 1
    const lines = ['this is one line.', 'this is another line. This is within the same line.']
    const documentPage = DocumentPage.fromObject({ page, lines })
    expect(documentPage.phrases).toStrictEqual([
        'this is one line.',
        'this is another line.',
        'This is within the same line.'
    ])
})

test('lines getter should not treat ellipsis as a phrase end', () => {
    const lines = ['First phrase... ', 'continuation of first phrase. Second phrase']
    const documentPage = new DocumentPage(1, lines)
    expect(documentPage.phrases).toStrictEqual([
        'First phrase... continuation of first phrase.',
        'Second phrase.'
    ])
})


test('words getter should parse phrases and flat map its contents', () => {
    const page = 1
    const lines = ['this is one line.', 'this is another line. This is within the same line.']
    const documentPage = DocumentPage.fromObject({ page, lines })
    const expectedWords = lines.flatMap(s => s.split(' '))
    expect(documentPage.words).toStrictEqual(expectedWords)
})


test('Phrases should be split by dotAndSpace or spaceAndDot', () => {
    const page = 1
    const lines = ['first phrase. second phrase .Third phrase . fourth phrase']
    const documentPage = DocumentPage.fromObject({ page, lines })
    expect(documentPage.phrases).toStrictEqual([
        'first phrase.', 'second phrase.', 'Third phrase.', 'fourth phrase.'
    ])
})

test('Empty phrases should be removed', () => {
    const page = 1
    const lines = ['first phrase. second phrase .Third phrase . . After empty phrase']
    const documentPage = DocumentPage.fromObject({ page, lines })
    expect(documentPage.phrases).toStrictEqual([
        'first phrase.', 'second phrase.', 'Third phrase.', 'After empty phrase.'
    ])
})