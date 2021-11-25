import DocumentPage from '../public/javascripts/DocumentPage.js'

// Happy scenarios
test('lines getter should split phrases by dot', () => {
    const page = 1
    const lines = ['this is one line.', 'this is another line. This is within the same line.']
    const documentPage = DocumentPage.fromObject({ page, lines })
    expect(documentPage.phrases.length).toBe(3) // lines have 3 dots in total hence 3 phrases
})

test('lines getter should not treat ellipsis as a phrase end', () => {
    const lines = ['this is one line...', 'this is not another phrase. but this is.']
    const documentPage = new DocumentPage(1, lines)
    expect(documentPage.phrases.length).toBe(2)
})

test('words getter should parse phrases and flat map its contents', () => {
    const page = 1
    const lines = ['this is one line.', 'this is another line. This is within the same line.']
    const documentPage = DocumentPage.fromObject({ page, lines })
    const expectedWords = lines.flatMap(s => s.split(' '))
    expect(documentPage.words).toStrictEqual(expectedWords)
})