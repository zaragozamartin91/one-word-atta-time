var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextToSpeechDemo = function (_React$Component) {
    _inherits(TextToSpeechDemo, _React$Component);

    function TextToSpeechDemo(props) {
        _classCallCheck(this, TextToSpeechDemo);

        return _possibleConstructorReturn(this, (TextToSpeechDemo.__proto__ || Object.getPrototypeOf(TextToSpeechDemo)).call(this, props));
    }

    _createClass(TextToSpeechDemo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(
                    'button',
                    { onClick: function onClick(e) {
                            return _this2.runDemo();
                        } },
                    'Run demo'
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
            console.log('Text to speech demo ready');
        }
    }]);

    return TextToSpeechDemo;
}(React.Component);

ReactDOM.render(React.createElement(TextToSpeechDemo, null), document.querySelector('#root'));