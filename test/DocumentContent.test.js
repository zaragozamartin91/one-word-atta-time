import DocumentPage from '../docs/javascripts/DocumentPage.js'
import DocumentContent from '../docs/javascripts/DocumentContent.js'

test('text should return the whole text within the pages lines', () => {
    const page = 1
    const lines = ['this is one line.', 'this is another line. This is within the same line.']
    const documentPage = DocumentPage.fromObject({ page, lines })
    const documentContent = new DocumentContent([documentPage])
    

    let allText = documentContent.text
    // lines.forEach(line => expect(allText).toContain(line))
    expect(allText).toContain('this is one line.')
    expect(allText).toContain('this is another line. This is within the same line.')
})
