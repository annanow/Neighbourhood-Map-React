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
      Get locations from JSON file, those locations will be show to the user
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
  }
  /*
  Once the Google script is loaded, the map can be Initialised
  */
  initMap() {
    let self = this;
    let mapview = document.getElementById('map');
    mapview.style.height = window.innerHeight + 'px';
    let map = new.window.google.maps.Map(mapview, {
      center: {lat: 52.2422274, lng: 20.9933234},
      zoom: 14,
      mapTypeControl: false
    });

    let infowindow = new.window.google.maps.infowindow({});
    window.google.maps.event.addListener(infowindow, "closeclick", function() {
      self.closeInfoWindow();
      });

      this.setState({
        map: map,
        infowindow: infowindow
      });

      window.google.maps.event.addDomListener(window, 'resize', function() {
        let center = map.getCenter();
        window.google.maps.event.trigger(map, 'resize');
        self.state.map.setCenter(center);
      });

      window.google.maps.event.addListener(map, 'click', function() {
        self.closeInfoWindow;
      });

      let alllocations = [];
      this.state.alllocations.forEach(funtion(location) {
        let.longname = location.name + " - " + location.type;
        let marker = new.window.google.maps.Marker( {
          position: new.window.google.maps.LatLng(
            location.latitude,
            location.longitude
          ),
          animation: window.google.maps.Animation.DROP,
          map: map
        });

        marker.addListener('click', function() {
          self.openInfoWindow(marker);
          });

          location.display = true;
          location.longname = longname;
          location.marker = marker;
          alllocations.push(location);
        });

        this.setState( {
          alllocations: alllocations
        });
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
