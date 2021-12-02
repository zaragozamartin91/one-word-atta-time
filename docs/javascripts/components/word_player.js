import SessionStorage from '../SessionStorage.js'
import DocumentContent from '../DocumentContent.js'
import DocumentNavigator from '../DocumentNavigator.js'

class WordPlayerControls extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const playSymbol = "|>"
        const pauseSymbol = "||"
        const rewindSymbol = "<<"
        const forwardSymbol = ">>"

        return this.props.paused ?
            // paused scenario
            (<div id="playerControls">
                <button>{rewindSymbol}</button>
                <button onClick={this.props.onPlay}>{playSymbol}</button>
                <button>{forwardSymbol}</button>
            </div>) :
            // playing scenario
            (<div id="playerControls">
                <button>{rewindSymbol}</button>
                <button onClick={this.props.onPause}>{pauseSymbol}</button>
                <button>{forwardSymbol}</button>
            </div>)
    }
}

class WordPlayerDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (<p>{this.props.word}</p>)
    }
}

class WordPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { paused: true, word: 'Press play button to begin reading' }

        const ss = new SessionStorage()
        const appSessionData = ss.readAppSession()
        console.log('Got session data:')
        console.log(appSessionData)
        this.documentContent = DocumentContent.fromObject(appSessionData)
        this.documentNavigator = new DocumentNavigator(this.documentContent)
        this.documentNavigator.restart()
    }

    render() {
        return (
            <div class="container">
                <WordPlayerDisplay word={this.state.word} />
                <WordPlayerControls paused={this.state.paused} onPlay={this.play.bind(this)} onPause={this.pause.bind(this)} />
            </div>
        )
    }

    play() {
        console.log('Reading words!')
        const dn = this.documentNavigator

        this.intervalId = window.setInterval(() => {
            const nextWord = dn.currentWord
            dn.next()
            this.setState({ paused: false, word: nextWord })
        }, 300)
    }

    pause() {
        console.log('Pausing!')
        window.clearInterval(this.intervalId)
        const stat = this.state
        stat.paused = true
        this.setState(stat)
    }

    componentDidUpdate(_nextProps, _nextState) {
        if (this.documentNavigator.done) {
            this.pause()
        }
    }
}


ReactDOM.render(<WordPlayer />, document.querySelector('#root'));
