

class TextToSpeechDemo extends React.Component {

    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div class="container">
                <button onClick={e => this.runDemo()}>Run demo</button>
            </div>
        )
    }

    runDemo() {
        const synth = window.speechSynthesis

        const utterThis = new SpeechSynthesisUtterance('Hello world!');
        synth.speak(utterThis);
    }


    componentDidMount() {
        console.log('Text to speech demo ready')
    }
}


ReactDOM.render(<TextToSpeechDemo />, document.querySelector('#root'));
