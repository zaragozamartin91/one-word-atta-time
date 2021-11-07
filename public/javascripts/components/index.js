import PdfReader from '../PdfReader.js'
import SessionStorage from '../SessionStorage.js'

const SuccessPrompt = props => {
    function redirectToWordPlayer() {
        window.location.href = '/word_player.html'
    }

    if (props.fileParseSuccess) {
        return (<div>
            <p id="fileParseSuccessMessage">{props.fileParseSuccess}</p>
            <button onClick={redirectToWordPlayer}>Read my file</button>
        </div>)
    } else if (props.fileParseError) {
        return (<div>
            <p id="fileParseErrorMessage">{props.fileParseError}</p>
        </div>)
    } else {
        return (<span></span>)
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = { fileParseSuccess: null, fileParseError: null }
    }

    render() {
        return (
            <div class="container">
                <h1>One Word atta time</h1>
                <p>Let me read that file for you</p>

                <input onChange={this.onFileInputChange.bind(this)} type="file" name="textFileInput" id="input" />
                <SuccessPrompt fileParseSuccess={this.state.fileParseSuccess} fileParseError={this.state.fileParseError} />
            </div>
        )
    }

    onFileInputChange(event) {
        const selectedFile = event.target.files[0]
        console.log({ selectedFile })
        const self = this

        const pdfReader = new PdfReader({ ignoreBlanks: true })
        pdfReader.parsePdfFile(selectedFile)
            .then(documentContent => {
                console.log(documentContent)
                console.log("Saving text data into session storage")
                const ss = new SessionStorage()
                ss.storeAppSession(documentContent.asObject())
                self.setState({ fileParseSuccess: "Successfully loaded file", fileParseError: null })
            }).catch(reason => {
                console.error("Error occurred while processing text file")
                console.error(reason)
                self.setState({ fileParseSuccess: null, fileParseError: reason })
            })
    }
}


ReactDOM.render(<Main />, document.querySelector('#root'));
