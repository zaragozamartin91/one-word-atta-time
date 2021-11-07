import PdfReader from '../PdfReader.js'
import SessionStorage from '../SessionStorage.js'

new SessionStorage();

var Link = ReactRouterDOM.Link;
var Route = ReactRouterDOM.Route;

var App = function App() {
  return React.createElement(
    ReactRouterDOM.HashRouter,
    null,
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          Link,
          { to: "/" },
          "Home"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          Link,
          { to: "/login" },
          "Login"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          Link,
          { to: "/register" },
          "Register"
        )
      )
    ),
    React.createElement(Route, { path: "/", exact: true, component: Home }),
    React.createElement(Route, { path: "/login", component: Login }),
    React.createElement(Route, { path: "/register", component: Register })
  );
};

var Home = function Home() {
  return React.createElement(
    "h1",
    null,
    "Home"
  );
};
var Login = function Login() {
  return React.createElement(
    "h1",
    null,
    "Login"
  );
};
var Register = function Register() {
  return React.createElement(
    "h1",
    null,
    "Register"
  );
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));