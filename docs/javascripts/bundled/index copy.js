var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import GenericFileReader from '../GenericFileReader.js';
import SessionStorage from '../SessionStorage.js';

var SuccessPrompt = function SuccessPrompt(props) {
    if (props.fileParseSuccess) {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                { id: 'fileParseSuccessMessage' },
                props.fileParseSuccess
            ),
            React.createElement(
                'a',
                { href: 'word_player.html' },
                React.createElement(
                    'button',
                    null,
                    'Read my file'
                )
            )
        );
    } else if (props.fileParseError) {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                { id: 'fileParseErrorMessage' },
                props.fileParseError
            )
        );
    } else {
        return React.createElement('span', null);
    }
};

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this.state = { fileParseSuccess: null, fileParseError: null };
        return _this;
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(
                    'h1',
                    null,
                    'One Word atta time'
                ),
                React.createElement(
                    'p',
                    null,
                    'Let me read that file for you'
                ),
                React.createElement('input', { onChange: this.onFileInputChange.bind(this), type: 'file', name: 'textFileInput', id: 'input' }),
                React.createElement(SuccessPrompt, { fileParseSuccess: this.state.fileParseSuccess, fileParseError: this.state.fileParseError })
            );
        }
    }, {
        key: 'onFileInputChange',
        value: function onFileInputChange(event) {
            var selectedFile = event.target.files[0];
            console.log({ selectedFile: selectedFile });
            var self = this;

            var genericFileReader = new GenericFileReader();
            genericFileReader.parseFile(selectedFile).then(function (documentContent) {
                console.log(documentContent);
                console.log("Saving text data into session storage");
                var ss = new SessionStorage();
                ss.storeAppSession(documentContent.asObject());
                self.setState({ fileParseSuccess: "Successfully loaded file", fileParseError: null });
            }).catch(function (reason) {
                console.error("Error occurred while processing text file");
                console.error(reason);
                self.setState({ fileParseSuccess: null, fileParseError: reason });
            });
        }
    }]);

    return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.querySelector('#root'));