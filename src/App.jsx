import React, { useState } from 'react';
import { MindMap } from './components/MindMap';
import MindMapDefault from './components/MindMapDefault';
import { uuid } from 'uuidv4';

import './App.css';

const App = (props) => {
  const [mindMaps, setMindMaps] = useState(MindMapDefault)

  const onSubmit = (event) => {
    event.preventDefault()
    const value = JSON.parse(event.target[0].value)

    setMindMaps([value])
  }

  return (
    <div className="App">
      <div><form onSubmit={onSubmit}><input type="text"></input><button type="submit">Submit</button></form></div><br />
      {mindMaps.map(skills => (<MindMap skills={skills} key={uuid()}></MindMap>))}
    </div>
  )
}

export default App;
