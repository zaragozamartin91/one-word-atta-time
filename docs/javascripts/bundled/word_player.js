var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SessionStorage from '../SessionStorage.js';
import DocumentContent from '../DocumentContent.js';
import DocumentNavigator from '../DocumentNavigator.js';
import ReaderConfig from '../ReaderConfig.js';

var WordPlayerControls = function WordPlayerControls(props) {
    var playSymbol = "▶";
    var pauseSymbol = "||";
    var rewindSymbol = "<<";
    var forwardSymbol = ">>";

    return props.paused ?
    // paused scenario
    React.createElement(
        'div',
        { id: 'playerControls' },
        React.createElement(
            'button',
            null,
            rewindSymbol
        ),
        React.createElement(
            'button',
            { onClick: props.onPlay },
            playSymbol
        ),
        React.createElement(
            'button',
            null,
            forwardSymbol
        )
    ) :
    // playing scenario
    React.createElement(
        'div',
        { id: 'playerControls' },
        React.createElement(
            'button',
            null,
            rewindSymbol
        ),
        React.createElement(
            'button',
            { onClick: props.onPause },
            pauseSymbol
        ),
        React.createElement(
            'button',
            null,
            forwardSymbol
        )
    );
};

var WordPlayerDisplay = function WordPlayerDisplay(props) {
    return React.createElement(
        'p',
        { style: { fontSize: props.fontSizePx } },
        props.word
    );
};

var ConfigButton = function ConfigButton(props) {
    return React.createElement(
        'div',
        { className: 'configButtons' },
        React.createElement(
            'a',
            { href: 'config.html' },
            React.createElement(
                'button',
                null,
                React.createElement('i', { 'class': 'fa fa-cog', 'aria-hidden': 'true' })
            )
        )
    );
};

var GoBackButton = function GoBackButton(props) {
    return React.createElement(
        'div',
        { className: 'configButtons' },
        React.createElement(
            'a',
            { href: 'index.html' },
            React.createElement(
                'button',
                null,
                React.createElement('i', { 'class': 'fa fa-arrow-left', 'aria-hidden': 'true' })
            )
        )
    );
};

var WordPlayer = function (_React$Component) {
    _inherits(WordPlayer, _React$Component);

    /** @type{DocumentContent} */function WordPlayer(props) {
        _classCallCheck(this, WordPlayer);

        var _this = _possibleConstructorReturn(this, (WordPlayer.__proto__ || Object.getPrototypeOf(WordPlayer)).call(this, props));

        _this.documentContent = null;
        _this.documentNavigator = null;
        _this.documentReady = false;
        _this.appConfig = null;

        _this.state = { paused: true, word: 'Press play button to begin reading' };

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

    _createClass(WordPlayer, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(WordPlayerDisplay, { word: this.state.word, fontSizePx: this.appConfig.fontSizePx }),
                React.createElement(WordPlayerControls, { paused: this.state.paused, onPlay: this.play.bind(this), onPause: this.pause.bind(this) }),
                React.createElement(ConfigButton, null),
                React.createElement(GoBackButton, null)
            );
        }
    }, {
        key: 'play',
        value: function play() {
            var _this2 = this;

            console.log('Reading words!');
            var dn = this.documentNavigator;

            var delayMs = this.appConfig.delayMs;
            console.log('delayMs = ', delayMs);

            this.intervalId = window.setInterval(function () {
                var nextWord = dn.currentWord;
                dn.next();
                _this2.setState({ paused: false, word: nextWord });
            }, delayMs);
        }
    }, {
        key: 'pause',
        value: function pause() {
            console.log('Pausing!');
            window.clearInterval(this.intervalId);
            var newState = Object.assign({}, this.state, { paused: true });
            this.setState(newState);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_nextProps, _nextState) {
            /* If document was completely processed , then pause navigation */
            if (this.documentNavigator.done) {
                this.pause();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            /* If we got null document session data, redirect to main site */
            if (!this.documentReady) {
                window.location.href = '/';
            }
        }
    }]);

    return WordPlayer;
}(React.Component);

ReactDOM.render(React.createElement(WordPlayer, null), document.querySelector('#root'));