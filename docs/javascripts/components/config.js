import SessionStorage from "../SessionStorage.js"
import ReaderConfig from '../ReaderConfig.js'

const WordsPerMinuteSelector = props => {
    const optionValues = [50, 100, 200, 300, 400]
    const options = optionValues.map(v => {
        return (<option value={v} selected={props.selected == v}>{v}</option>)
    })

    return (
        <div>
            <label for="wordsPerMinute">Words per minute: </label>

            <select name="wordsPerMinute" id="wordsPerMinute" onChange={props.onChange}>
                {options}
            </select>
        </div>)
}


const TextSizeSelector = props => {
    const optionValues = ReaderConfig.getFontSizeKeys()
    const options = optionValues.map(v => <option value={v} selected={props.selected == v}>{v}</option>)
    const fontSizePx = ReaderConfig.getFontSizePx(props.selected)

    return (
        <div>
            <label for="fontSize">Text size: </label>
            <select name="fontSize" id="fontSize" onChange={props.onChange}>
                {options}
            </select>
            <p style={{ fontSize: fontSizePx }}>Sample text</p>
        </div>
    )
}


class Configuration extends React.Component {
    sessionStorage = new SessionStorage()

    constructor(props) {
        super(props)
        const sessionAppConfig = this.sessionStorage.readAppConfig() || ReaderConfig.getDefault().asObject()
        const appConfig = new ReaderConfig(sessionAppConfig)
        this.state = { wordsPerMinute: appConfig.wordsPerMinute, fontSize: appConfig.fontSize }
    }

    render() {
        return (
            <form action="word_player.html" onSubmit={this.saveAppConfig.bind(this)}>
                <div class="container">
                    <WordsPerMinuteSelector selected={this.state.wordsPerMinute} onChange={this.onWordsPerMinuteChange.bind(this)} />
                    <TextSizeSelector selected={this.state.fontSize} onChange={this.onTextSizeChange.bind(this)} />
                    <button id="saveButton">Save</button>
                </div>
            </form>
        )
    }

    onWordsPerMinuteChange(e) {
        const wordsPerMinute = parseInt(e.target.value)
        const newState = { ...this.state, wordsPerMinute }
        this.setState(newState)
    }

    onTextSizeChange(e) {
        const fontSize = e.target.value
        const newState = { ...this.state, fontSize }
        this.setState(newState)
    }

    saveAppConfig(_e) {
        console.log('storing configuration')
        this.sessionStorage.storeAppConfig(this.state)
        return true
    }
}


ReactDOM.render(<Configuration />, document.querySelector('#root'));
