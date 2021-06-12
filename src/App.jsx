import React from 'react';
import plantumlEncoder from 'plantuml-encoder'
import './App.css';
import {
  plsWork
} from './rikaskill.js'
import skills from './skills.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    const UMLVersion = plsWork(skills)
    this.state = { jsonToUML: skills, UMLVersion, url: this.createURL(UMLVersion), };
  }
  createURL = (UMLVersion) => {
    var encoded = plantumlEncoder.encode(UMLVersion)
    var url = 'http://www.plantuml.com/plantuml/img/' + encoded
    return url
  }

  onSubmit = (event) => {
    event.preventDefault()
    const value = JSON.parse(event.target[0].value)
    const UMLVersion = plsWork(value)

    this.setState({
      jsonToUML: value,
      UMLVersion,
      url: this.createURL(UMLVersion)
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App" >
        <br />
        <div><form onSubmit={e => this.onSubmit(e)}><input type="text"></input><button type="submit">Submit</button></form></div><br />
        <div><img alt="" src={this.state.url}></img></div>
        <pre>{JSON.stringify(this.state.jsonToUML)}</pre>
        <pre>{`${this.state.UMLVersion}`}</pre>
      </div>
    )
  };
}

export default App;
