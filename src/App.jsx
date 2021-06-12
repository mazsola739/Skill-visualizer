import React from 'react';
import plantumlEncoder from 'plantuml-encoder'
//import logo from './logo.svg';
import './App.css';
import './rikaskill.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgurl: `https://12ax7web.s3.amazonaws.com/accounts/1/products/imported/pew-pew-unicorn-t-shirt-teeturtle-1000x1000.jpg` };
  }
  onSubmit = (event) => {
    event.preventDefault()
    const value = event.target[0].value
    this.setState({ imgurl: value })
  }

  render() {
    return (
      <div className="App" >
        <div>{JSON.stringify(this.state.imgurl)}</div><br />
        <div><form onSubmit={e => this.onSubmit(e)}><input type="text"></input><button type="submit">Submit</button></form></div><br />
        <div><img alt="" src={this.state.imgurl}></img></div>
        <div><p id="puppiduppi"></p></div>
        <script src="./rikaskill.js"></script>
      </div>
    )
  };
}

export default App;
