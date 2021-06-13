import React, { useState } from 'react';
import plantumlEncoder from 'plantuml-encoder'
import './App.css';
import {
  showToMeOnSite
} from './rikaskill.js'
import {
  showToMeInPic
} from './rikaskill.js'
import skills from './skills.json'

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

  //todo szerkeszteni
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
    <div className="App" >
      <br />
      <div><form onSubmit={e => onSubmit(e)}><input type="text"></input><button type="submit">Submit</button></form></div><br />
      <div><img alt="" src={imgUrl}></img></div>
      {/* debug todo blueprint marci dobta a linket diszkordon https://blueprintjs.com/docs/#core/components/collapse --save*/}
      <pre>{JSON.stringify(jsonToUml)}</pre>
      <pre>{`${showTheJson}`}</pre>
      <pre>{`${umlVersion}`}</pre>
    </div>
  )
}

export default App;
