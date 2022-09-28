# one-word-atta-time
Project to load text and pdf files and display its contents one word at a time

Site works as a static website. Public assets are located in the 'docs' directory. This is because
site is targeted to run as a github page ; hence it is required for the site assets to be stored
in the docs/ dir

React is used for frontend. PdfJs is used to parse pdf files. 

## Building and running

### Unit tests
- Jest is used
- test files located in test/ dir
- Test files must follow this naming convention `ModuleName.test.js`
- Execute `npm run test`

### Building components
- Source code for components is located in docs/javascripts/components dir
- Run `npm run bundle-react`
- Bundled production ready components are copied into docs/javascripts/bundled dir

Business logic modules and classes are located in docs/javascripts base dir

### Manual testing
- Expressjs is used as local server for testing
- Run `npm start`
- Open browser at http://localhost:3000/

## App online

The app is served at https://zaragozamartin91.github.io/one-word-atta-time/
