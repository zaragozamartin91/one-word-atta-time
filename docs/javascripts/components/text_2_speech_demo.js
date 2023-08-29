import SessionStorage from '../SessionStorage.js'
import DocumentContent from '../DocumentContent.js'
import DocumentNavigator from '../DocumentNavigator.js'
import ReaderConfig from '../ReaderConfig.js'

/**
 * Demo based on https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
 */
class TextToSpeechDemo extends React.Component {
    /** @type{DocumentContent} */   documentContent
    /** @type{DocumentNavigator} */ documentNavigator
    /** @type{Boolean} */           documentReady = false // document is ready to be navigated
    /** @type{ReaderConfig} */      appConfig

    constructor(props) {
        super(props)

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

                <form>
                    <input type="text" className="txt" />
                    <div>
                        <label for="rate">Rate</label>
                        <input type="range" min="0.5" max="2" value="1" step="0.1" id="rate" />

                        <div className="rate-value">1</div>
                        <div className="clearfix"></div>
                    </div>
                    <div>
                        <label for="pitch">Pitch</label>
                        <input type="range" min="0" max="2" value="1" step="0.1" id="pitch" />
                        <div className="pitch-value">1</div>
                        <div className="clearfix"></div>
                    </div>
                    <select></select>
                    <div className="controls">
                        <button id="play" type="submit">Play</button>
                    </div>
                </form>
            </div>
        )
    }

    runDemo() {
        const synth = window.speechSynthesis

        const utterThis = new SpeechSynthesisUtterance('Hello world!');
        synth.speak(utterThis);
    }


    componentDidMount() {
        /* If we got null document session data, redirect to main site */
        if (!this.documentReady) {
            window.location.href = '/'
        }

        const documentContent = this.documentContent

        this.mounted = true

        const synth = window.speechSynthesis;

        const inputForm = document.querySelector("form");
        const inputTxt = document.querySelector(".txt");
        const voiceSelect = document.querySelector("select");

        const pitch = document.querySelector("#pitch");
        const pitchValue = document.querySelector(".pitch-value");
        const rate = document.querySelector("#rate");
        const rateValue = document.querySelector(".rate-value");

        let voices = [];

        function populateVoiceList() {
            voices = synth.getVoices().sort(function (a, b) {
                const aname = a.name.toUpperCase();
                const bname = b.name.toUpperCase();

                if (aname < bname) {
                    return -1;
                } else if (aname == bname) {
                    return 0;
                } else {
                    return +1;
                }
            });
            const selectedIndex =
                voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
            voiceSelect.innerHTML = "";

            for (let i = 0; i < voices.length; i++) {
                const option = document.createElement("option");
                option.textContent = `${voices[i].name} (${voices[i].lang})`;

                if (voices[i].default) {
                    option.textContent += " -- DEFAULT";
                }

                option.setAttribute("data-lang", voices[i].lang);
                option.setAttribute("data-name", voices[i].name);
                voiceSelect.appendChild(option);
            }
            voiceSelect.selectedIndex = selectedIndex;
        }

        populateVoiceList();

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }

        function speak() {
            if (synth.speaking) {
                console.error("speechSynthesis.speaking");
                return;
            }

            // const text = inputTxt.value
            const text = documentContent.text
            const utterThis = new SpeechSynthesisUtterance(text);

            utterThis.onend = function (event) {
                console.log("SpeechSynthesisUtterance.onend");
            };

            utterThis.onerror = function (event) {
                console.error("SpeechSynthesisUtterance.onerror");
            };

            const selectedOption =
                voiceSelect.selectedOptions[0].getAttribute("data-name");

            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name === selectedOption) {
                    utterThis.voice = voices[i];
                    break;
                }
            }
            utterThis.pitch = pitch.value;
            utterThis.rate = rate.value;
            synth.speak(utterThis);

        }

        inputForm.onsubmit = function (event) {
            event.preventDefault();

            speak();

            inputTxt.blur();
        };

        pitch.onchange = function () {
            pitchValue.textContent = pitch.value;
        };

        rate.onchange = function () {
            rateValue.textContent = rate.value;
        };

        voiceSelect.onchange = function () {
            speak();
        };
    }
}


ReactDOM.render(<TextToSpeechDemo />, document.querySelector('#root'));
