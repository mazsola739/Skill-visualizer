import React, { useState } from 'react';
//import { Collapse } from 'react-collapse';
import plantumlEncoder from 'plantuml-encoder';
import './App.css';
import {
  showToMeOnSite
} from './rikaskill.js'
import {
  showToMeInPic
} from './rikaskill.js'
//import htmlskills from './html.json'
//import cssskills from './css.json'
//import javascriptskills from './javascript.json'
import skills from './otherskills.json'


const createUrl = (umlVersion) => {
  var encoded = plantumlEncoder.encode(umlVersion)
  var imgUrl = 'http://www.plantuml.com/plantuml/img/' + encoded
  return imgUrl
}

const App = (props) => {

  const [jsonToUml, setJsonToUml] = useState(skills)
  const [showTheJson, setShowTheJson] = useState(showToMeOnSite(skills))
  const [umlVersion, setUmlVersion] = useState(showToMeInPic(skills))
  const [imgUrl, setImgUrl] = useState(createUrl(showToMeInPic(skills)))

  const onSubmit = (event) => {
    event.preventDefault()
    const value = JSON.parse(event.target[0].value)
    const showTheJson = showToMeOnSite(value)
    const umlVersion = showToMeInPic(value)

    setJsonToUml(value)
    setShowTheJson(showTheJson)
    setUmlVersion(umlVersion)
    setImgUrl(createUrl(umlVersion))
  }

  return (
    <div className="App">
      <br />
      <div><form onSubmit={e => onSubmit(e)}><input type="text"></input><button type="submit">Submit</button></form></div><br />
      <div><img alt="" src={imgUrl}></img></div><br />
      <div><br /><p>Your JSON </p><br />
        <pre>{JSON.stringify(jsonToUml)}</pre>
        <br /><p>Your JSON-Tree</p><br />
        <pre>{`${showTheJson}`}</pre>
        <br /><p>Your JSON in plantUML</p><br />
        <pre>{`${umlVersion}`}</pre></div>
      {/*<Collapse isOpened={true || false}>
        <div></div>
      </Collapse>
      <Collapse isOpened={true || false}>
        <div></div>
      </Collapse>
      <Collapse isOpened={true || false}>
        <div></div>
  </Collapse>*/}
    </div>
  )
}

/*
const { Collapse, UnmountClosed } = ReactCollapse;

const getText = num => text.slice(0, num).map((p, i) => <p key={i}>{p}</p>);

class VariableText extends React.Component {
  static propTypes = {
    isOpened: PropTypes.bool
  };

  static defaultProps = {
    isOpened: false
  };

  constructor(props) {
    super(props);
    const { isOpened } = this.props;
    this.state = { isOpened, paragraphs: 1 };
  }

  render() {
    const { isOpened, paragraphs } = this.state;

    return (
      <div>
        <div className="config">
          <label className="label">
            Opened:
            <input
              className="input"
              type="checkbox"
              checked={isOpened}
              onChange={({ target: { checked } }) => this.setState({ isOpened: checked })} />
          </label>

          <label className="label">
            Paragraphs:
            <input
              className="input"
              type="range"
              value={paragraphs}
              step={1}
              min={0}
              max={4}
              onChange={({ target: { value } }) => this.setState({ paragraphs: parseInt(value, 10) })} />
            {paragraphs}
          </label>
        </div>

        <Collapse isOpened={isOpened}>
          <div className="text">
            {paragraphs ? getText(paragraphs) : <p>No text</p>}
          </div>
        </Collapse>
      </div>
    );
  }
}

const App = () => (
  <div className="app">
    <section className="section">
      <h2>Your JSON</h2>
      <VariableText />
    </section>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#app'));*/

export default App;
