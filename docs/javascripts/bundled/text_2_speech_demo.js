var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SessionStorage from '../SessionStorage.js';
import DocumentContent from '../DocumentContent.js';
import DocumentNavigator from '../DocumentNavigator.js';
import ReaderConfig from '../ReaderConfig.js';

/**
 * Demo based on https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
 */

var TextToSpeechDemo = function (_React$Component) {
    _inherits(TextToSpeechDemo, _React$Component);

    /** @type{Boolean} */
    /** @type{DocumentContent} */function TextToSpeechDemo(props) {
        _classCallCheck(this, TextToSpeechDemo);

        var _this = _possibleConstructorReturn(this, (TextToSpeechDemo.__proto__ || Object.getPrototypeOf(TextToSpeechDemo)).call(this, props));

        _this.documentReady = false;


        var ss = new SessionStorage();
        var appSessionData = ss.readAppSession();
        console.log('Got session data:');
        console.log(appSessionData);

        var appConfig = ss.readAppConfig() || ReaderConfig.getDefault().asObject();
        _this.appConfig = new ReaderConfig(appConfig);

        if (appSessionData) {
            _this.documentContent = DocumentContent.fromObject(appSessionData);
            _this.documentNavigator = new DocumentNavigator(_this.documentContent);
            _this.documentNavigator.restart();
            _this.documentReady = true;
        }
        return _this;
    } // document is ready to be navigated
    /** @type{ReaderConfig} */
    /** @type{DocumentNavigator} */

    _createClass(TextToSpeechDemo, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(
                    'form',
                    null,
                    React.createElement('input', { type: 'text', className: 'txt' }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            { 'for': 'rate' },
                            'Rate'
                        ),
                        React.createElement('input', { type: 'range', min: '0.5', max: '2', value: '1', step: '0.1', id: 'rate' }),
                        React.createElement(
                            'div',
                            { className: 'rate-value' },
                            '1'
                        ),
                        React.createElement('div', { className: 'clearfix' })
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'label',
                            { 'for': 'pitch' },
                            'Pitch'
                        ),
                        React.createElement('input', { type: 'range', min: '0', max: '2', value: '1', step: '0.1', id: 'pitch' }),
                        React.createElement(
                            'div',
                            { className: 'pitch-value' },
                            '1'
                        ),
                        React.createElement('div', { className: 'clearfix' })
                    ),
                    React.createElement('select', null),
                    React.createElement(
                        'div',
                        { className: 'controls' },
                        React.createElement(
                            'button',
                            { id: 'play', type: 'submit' },
                            'Play'
                        )
                    )
                )
            );
        }
    }, {
        key: 'runDemo',
        value: function runDemo() {
            var synth = window.speechSynthesis;

            var utterThis = new SpeechSynthesisUtterance('Hello world!');
            synth.speak(utterThis);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            /* If we got null document session data, redirect to main site */
            if (!this.documentReady) {
                window.location.href = '/';
            }

            var documentContent = this.documentContent;

            this.mounted = true;

            var synth = window.speechSynthesis;

            var inputForm = document.querySelector("form");
            var inputTxt = document.querySelector(".txt");
            var voiceSelect = document.querySelector("select");

            var pitch = document.querySelector("#pitch");
            var pitchValue = document.querySelector(".pitch-value");
            var rate = document.querySelector("#rate");
            var rateValue = document.querySelector(".rate-value");

            var voices = [];

            function populateVoiceList() {
                voices = synth.getVoices().sort(function (a, b) {
                    var aname = a.name.toUpperCase();
                    var bname = b.name.toUpperCase();

                    if (aname < bname) {
                        return -1;
                    } else if (aname == bname) {
                        return 0;
                    } else {
                        return +1;
                    }
                });
                var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
                voiceSelect.innerHTML = "";

                for (var i = 0; i < voices.length; i++) {
                    var option = document.createElement("option");
                    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

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
                var text = documentContent.text;
                var utterThis = new SpeechSynthesisUtterance(text);

                utterThis.onend = function (event) {
                    console.log("SpeechSynthesisUtterance.onend");
                };

                utterThis.onerror = function (event) {
                    console.error("SpeechSynthesisUtterance.onerror");
                };

                var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

                for (var i = 0; i < voices.length; i++) {
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
    }]);

    return TextToSpeechDemo;
}(React.Component);

ReactDOM.render(React.createElement(TextToSpeechDemo, null), document.querySelector('#root'));