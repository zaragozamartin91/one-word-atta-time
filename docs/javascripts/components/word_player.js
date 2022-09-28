import SessionStorage from '../SessionStorage.js'
import DocumentContent from '../DocumentContent.js'
import DocumentNavigator from '../DocumentNavigator.js'
import ReaderConfig from '../ReaderConfig.js'

const WordPlayerControls = props => {
    const playSymbol = "▶"
    const pauseSymbol = "||"
    const rewindSymbol = "<<"
    const forwardSymbol = ">>"

    const rewindButton = <button onClick={props.onRewind}>{rewindSymbol}</button>
    const forwardButton = <button onClick={props.onForward}>{forwardSymbol}</button>

    return props.paused ?
        // paused scenario
        (<div id="playerControls">
            {rewindButton}
            <button onClick={props.onPlay}>{playSymbol}</button>
            {forwardButton}
        </div>) :
        // playing scenario
        (<div id="playerControls">
            {rewindButton}
            <button onClick={props.onPause}>{pauseSymbol}</button>
            {forwardButton}
        </div>)
}

const WordPlayerDisplay = props => {
    return (<p style={{ fontSize: props.fontSizePx }}>{props.word}</p>)
}

const ConfigButton = _props => {
    return (<div className="configButtons">
        <a href="config.html">
            <button>
                <i class="fa fa-cog" aria-hidden="true"></i>
            </button>
        </a>
    </div>)
}

const GoBackButton = _props => {
    return (<div className="configButtons">
        <a href="index.html">
            <button>
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
        </a>
    </div>)
}

class WordPlayer extends React.Component {
    /** @type{DocumentContent} */   documentContent
    /** @type{DocumentNavigator} */ documentNavigator
    /** @type{Boolean} */           documentReady = false // document is ready to be navigated
    /** @type{ReaderConfig} */      appConfig

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
                <WordPlayerDisplay word={this.state.word} fontSizePx={this.appConfig.fontSizePx} />
                <WordPlayerControls
                    paused={this.state.paused}
                    onPlay={this.play.bind(this)}
                    onPause={this.pause.bind(this)}
                    onRewind={this.rewind.bind(this)}
                    onForward={this.forward.bind(this)}
                />
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
            if(dn.done) {
                console.log('Document exhausted')
                this.setState({...this.state, word: '★Document exhausted★'})
                this.pause()
            } else {
                const nextWord = dn.nextWord() || ''
                this.setState({ paused: false, word: nextWord })
            }
        }, delayMs)
    }

    pause() {
        console.log('Pausing!')
        window.clearInterval(this.intervalId)
        const newState = { ...this.state, paused: true }
        this.setState(newState)
    }

    rewind() {
        console.log('Rewinding!')
        this.documentNavigator.prevPhrase()
        const newState = { ...this.state, word: '<<' }
        this.setState(newState)
    }

    forward() {
        console.log('Forwarding!')
        this.documentNavigator.nextPhrase()
        const newState = { ...this.state, word: '>>' }
        this.setState(newState)
    }

    componentDidMount() {
        /* If we got null document session data, redirect to main site */
        if (!this.documentReady) {
            window.location.href = '/'
        }
    }
}


ReactDOM.render(<WordPlayer />, document.querySelector('#root'));
