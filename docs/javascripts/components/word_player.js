import SessionStorage from '../SessionStorage.js'
import DocumentContent from '../DocumentContent.js'
import DocumentNavigator from '../DocumentNavigator.js'
import ReaderConfig from '../ReaderConfig.js'

const WordPlayerControls = props => {
    const playSymbol = "▶"
    const pauseSymbol = "||"
    const rewindSymbol = "<<"
    const forwardSymbol = ">>"

    return props.paused ?
        // paused scenario
        (<div id="playerControls">
            <button>{rewindSymbol}</button>
            <button onClick={props.onPlay}>{playSymbol}</button>
            <button>{forwardSymbol}</button>
        </div>) :
        // playing scenario
        (<div id="playerControls">
            <button>{rewindSymbol}</button>
            <button onClick={props.onPause}>{pauseSymbol}</button>
            <button>{forwardSymbol}</button>
        </div>)
}

const WordPlayerDisplay = props => {
    return (<p>{props.word}</p>)
}

const ConfigButton = props => {
    return (<div className="configButtons">
        <a href="config.html">
            <button>
                <i class="fa fa-cog" aria-hidden="true"></i>
            </button>
        </a>
    </div>)
}

const GoBackButton = props => {
    return (<div className="configButtons">
        <a href="index.html">
            <button>
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
        </a>
    </div>)
}

class WordPlayer extends React.Component {
    /** @type{DocumentContent} */ documentContent = null
    /** @type{DocumentNavigator} */ documentNavigator = null
    documentReady = false // document is ready to be navigated
    /** @type{ReaderConfig} */ appConfig = null

    constructor(props) {
        super(props)
        this.state = { paused: true, word: 'Press play button to begin reading' }

        const ss = new SessionStorage()
        const appSessionData = ss.readAppSession()
        console.log('Got session data:')
        console.log(appSessionData)

        const appConfig = ss.readAppConfig() || ReaderConfig.getDefault().asObject()
        this.appConfig = new ReaderConfig(appConfig)

        if (appSessionData) {
            this.documentContent = DocumentContent.fromObject(appSessionData)
            this.documentNavigator = new DocumentNavigator(this.documentContent)
            this.documentNavigator.restart()
            this.documentReady = true
        }
    }

    render() {
        return (
            <div class="container">
                <WordPlayerDisplay word={this.state.word} />
                <WordPlayerControls paused={this.state.paused} onPlay={this.play.bind(this)} onPause={this.pause.bind(this)} />
                <ConfigButton />
                <GoBackButton />
            </div>
        )
    }

    play() {
        console.log('Reading words!')
        const dn = this.documentNavigator

        const delayMs = this.appConfig.delayMs
        console.log('delayMs = ', delayMs)

        this.intervalId = window.setInterval(() => {
            const nextWord = dn.currentWord
            dn.next()
            this.setState({ paused: false, word: nextWord })
        }, delayMs)
    }

    pause() {
        console.log('Pausing!')
        window.clearInterval(this.intervalId)
        const newState = { ...this.state, paused: true }
        this.setState(newState)
    }

    componentDidUpdate(_nextProps, _nextState) {
        /* If document was completely processed , then pause navigation */
        if (this.documentNavigator.done) {
            this.pause()
        }
    }

    componentDidMount() {
        /* If we got null document session data, redirect to main site */
        if (!this.documentReady) {
            window.location.href = '/'
        }
    }
}


ReactDOM.render(<WordPlayer />, document.querySelector('#root'));
