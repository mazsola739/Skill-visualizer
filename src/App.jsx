import React, { useState } from 'react';
import plantumlEncoder from 'plantuml-encoder'
import './App.css';
import {
  showToMe
} from './rikaskill.js'
import {
  plsWork
} from './rikaskill.js'
import skills from './skills.json'

const createURL = (UMLVersion) => {
  var encoded = plantumlEncoder.encode(UMLVersion)
  var url = 'http://www.plantuml.com/plantuml/img/' + encoded
  return url
}

const App = (props) => {

  const [jsonToUML, setJsonToUML] = useState(skills)
  const [showTheJson, setShowTheJson] = useState(showToMe(skills))
  const [umlVersion, setUmlVersion] = useState(plsWork(skills))
  const [url, setUrl] = useState(createURL(plsWork(skills)))

  //todo szerkeszteni
  const onSubmit = (event) => {
    event.preventDefault()
    const value = JSON.parse(event.target[0].value)
    const umlVersion = plsWork(value)

    setJsonToUML(value)
    setShowTheJson(value)
    setUmlVersion(umlVersion)
    setUrl(createURL(umlVersion))
  }

  //console.log(this.state)
  return (
    <div className="App" >
      <br />
      <div><form onSubmit={e => onSubmit(e)}><input type="text"></input><button type="submit">Submit</button></form></div><br />
      <div><img alt="" src={url}></img></div>
      {/* debug todo blueprint marci dobta a linket diszkordon https://blueprintjs.com/docs/#core/components/collapse --save*/}
      <pre>{JSON.stringify(jsonToUML)}</pre>
      <pre>{`${showTheJson}`}</pre>
      <pre>{`${umlVersion}`}</pre>
    </div>
  )
}

export default App;
