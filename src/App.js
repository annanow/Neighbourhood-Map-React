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
      Get locations from JSON file
      */
      alllocations: require("MyLocations.JSON"),
      map: '',
      infowindow: '',
      prevmarker: ''
    };
    /*
    Retain object instance when used in the function
    */
    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow - this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    /*
    Connect the initMap funtion to the global window context in order for Google Maps to invoke it
    */
    window.initMap = this.initMap;
    /*
    Loading the Google Maps script asynchronously
    */
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcw4pl3Rbm5HIL9kiMkOYKJ31jNVq0RqE&callback=initMap"
    )
  );
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
