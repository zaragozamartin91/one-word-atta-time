var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SessionStorage from '../SessionStorage.js';
import DocumentContent from '../DocumentContent.js';
import DocumentNavigator from '../DocumentNavigator.js';

var WordPlayerControls = function (_React$Component) {
    _inherits(WordPlayerControls, _React$Component);

    function WordPlayerControls(props) {
        _classCallCheck(this, WordPlayerControls);

        return _possibleConstructorReturn(this, (WordPlayerControls.__proto__ || Object.getPrototypeOf(WordPlayerControls)).call(this, props));
    }

    _createClass(WordPlayerControls, [{
        key: 'render',
        value: function render() {
            var playSymbol = "|>";
            var pauseSymbol = "||";
            var rewindSymbol = "<<";
            var forwardSymbol = ">>";

            return this.props.paused ?
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
                    { onClick: this.props.onPlay },
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
                    { onClick: this.props.onPause },
                    pauseSymbol
                ),
                React.createElement(
                    'button',
                    null,
                    forwardSymbol
                )
            );
        }
    }]);

    return WordPlayerControls;
}(React.Component);

var WordPlayerDisplay = function (_React$Component2) {
    _inherits(WordPlayerDisplay, _React$Component2);

    function WordPlayerDisplay(props) {
        _classCallCheck(this, WordPlayerDisplay);

        var _this2 = _possibleConstructorReturn(this, (WordPlayerDisplay.__proto__ || Object.getPrototypeOf(WordPlayerDisplay)).call(this, props));

        _this2.state = {};
        return _this2;
    }

    _createClass(WordPlayerDisplay, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'p',
                null,
                this.props.word
            );
        }
    }]);

    return WordPlayerDisplay;
}(React.Component);

var WordPlayer = function (_React$Component3) {
    _inherits(WordPlayer, _React$Component3);

    function WordPlayer(props) {
        _classCallCheck(this, WordPlayer);

        var _this3 = _possibleConstructorReturn(this, (WordPlayer.__proto__ || Object.getPrototypeOf(WordPlayer)).call(this, props));

        _this3.state = { paused: true, word: 'Press play button to begin reading' };

        var ss = new SessionStorage();
        var appSessionData = ss.readAppSession();
        console.log('Got session data:');
        console.log(appSessionData);
        _this3.documentContent = DocumentContent.fromObject(appSessionData);
        _this3.documentNavigator = new DocumentNavigator(_this3.documentContent);
        _this3.documentNavigator.restart();
        return _this3;
    }

    _createClass(WordPlayer, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(WordPlayerDisplay, { word: this.state.word }),
                React.createElement(WordPlayerControls, { paused: this.state.paused, onPlay: this.play.bind(this), onPause: this.pause.bind(this) })
            );
        }
    }, {
        key: 'play',
        value: function play() {
            var _this4 = this;

            console.log('Reading words!');
            var dn = this.documentNavigator;

            this.intervalId = window.setInterval(function () {
                var nextWord = dn.currentWord;
                dn.next();
                _this4.setState({ paused: false, word: nextWord });
            }, 300);
        }
    }, {
        key: 'pause',
        value: function pause() {
            console.log('Pausing!');
            window.clearInterval(this.intervalId);
            var stat = this.state;
            stat.paused = true;
            this.setState(stat);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(_nextProps, _nextState) {
            if (this.documentNavigator.done) {
                this.pause();
            }
        }
    }]);

    return WordPlayer;
}(React.Component);

ReactDOM.render(React.createElement(WordPlayer, null), document.querySelector('#root'));