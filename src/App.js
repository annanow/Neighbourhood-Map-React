import React, { Component } from 'react'
import LocationList from './LocationList'

class App extends Component {
  /*
  Constructor function
  */
  constructor(props) {
    super(props);
    this.state = {
      /*
      Gets locations from JSON file
      */
      alllocations: require("MyLocations.JSON"),
      map: '',
      infowindow: '',
      prevmarker: ''
    };
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
