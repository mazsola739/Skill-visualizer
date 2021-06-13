import React, { useState } from 'react';
import { MindMap } from './components/MindMap';
import MindMapDefault from './components/MindMapDefault';
import { v4 as uuidv4 } from 'uuid';
import { UpdateForm } from './components/UpdateForm'

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
      <UpdateForm onSubmit={onSubmit} />
      {mindMaps.map(skills => (<MindMap skills={skills} key={uuidv4()} />))}
    </div>
  )
}

export default App;
