var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SessionStorage from "../SessionStorage.js";
import ReaderConfig from '../ReaderConfig.js';

var WordsPerMinuteSelector = function WordsPerMinuteSelector(props) {
    var optionValues = [50, 100, 150, 200, 250, 300, 400];
    var options = optionValues.map(function (v) {
        return React.createElement(
            "option",
            { value: v, selected: props.selected == v },
            v
        );
    });

    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            { "for": "wordsPerMinute" },
            "Words per minute: "
        ),
        React.createElement(
            "select",
            { name: "wordsPerMinute", id: "wordsPerMinute", onChange: props.onChange },
            options
        )
    );
};

var TextSizeSelector = function TextSizeSelector(props) {
    var optionValues = ReaderConfig.getFontSizeKeys();
    var options = optionValues.map(function (v) {
        return React.createElement(
            "option",
            { value: v, selected: props.selected == v },
            v
        );
    });
    var fontSizePx = ReaderConfig.getFontSizePx(props.selected);

    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            { "for": "fontSize" },
            "Text size: "
        ),
        React.createElement(
            "select",
            { name: "fontSize", id: "fontSize", onChange: props.onChange },
            options
        ),
        React.createElement(
            "p",
            { style: { fontSize: fontSizePx } },
            "Sample text"
        )
    );
};

var Configuration = function (_React$Component) {
    _inherits(Configuration, _React$Component);

    function Configuration(props) {
        _classCallCheck(this, Configuration);

        var _this = _possibleConstructorReturn(this, (Configuration.__proto__ || Object.getPrototypeOf(Configuration)).call(this, props));

        _this.sessionStorage = new SessionStorage();

        var sessionAppConfig = _this.sessionStorage.readAppConfig() || ReaderConfig.getDefault().asObject();
        var appConfig = new ReaderConfig(sessionAppConfig);
        _this.state = { wordsPerMinute: appConfig.wordsPerMinute, fontSize: appConfig.fontSize };
        return _this;
    }

    _createClass(Configuration, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { action: "word_player.html", onSubmit: this.saveAppConfig.bind(this) },
                React.createElement(
                    "div",
                    { "class": "container" },
                    React.createElement(WordsPerMinuteSelector, { selected: this.state.wordsPerMinute, onChange: this.onWordsPerMinuteChange.bind(this) }),
                    React.createElement(TextSizeSelector, { selected: this.state.fontSize, onChange: this.onTextSizeChange.bind(this) }),
                    React.createElement(
                        "button",
                        { id: "saveButton" },
                        "Save"
                    )
                )
            );
        }
    }, {
        key: "onWordsPerMinuteChange",
        value: function onWordsPerMinuteChange(e) {
            var wordsPerMinute = parseInt(e.target.value);
            var newState = Object.assign({}, this.state, { wordsPerMinute: wordsPerMinute });
            this.setState(newState);
        }
    }, {
        key: "onTextSizeChange",
        value: function onTextSizeChange(e) {
            var fontSize = e.target.value;
            var newState = Object.assign({}, this.state, { fontSize: fontSize });
            this.setState(newState);
        }
    }, {
        key: "saveAppConfig",
        value: function saveAppConfig(_e) {
            console.log('storing configuration');
            this.sessionStorage.storeAppConfig(this.state);
            return true;
        }
    }]);

    return Configuration;
}(React.Component);

ReactDOM.render(React.createElement(Configuration, null), document.querySelector('#root'));