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

      /*
      This will open the infowindow for marker
      */
      openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
          prevmarker: marker
        });
        this.state.infowindow.setContent("Loading data...");
        this.set.state.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
      }

      /*
      Get location data from the Foursquare API
      */
      getMarkerInfo(marker) {
        let self = this;

        /*
        Insert Foursquare API keys and build the API endpoint
        */
        let clientId = "PNBORZC2HWP1CNFGKMY1NAMSIPTDSMBRI1JGBBOXDM3UORBJ";
        let clientSecret = "P4TDTUG4EDKBCJVFOI4R0BPJEMXPYMR2ALHAJPK0OPWNZZGZ";
        let url = "https://api.foursquare.com/v2/venues/search?client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret +
        "&v20180805&ll=" +
        marker.getPosition().lat() +
        marker.getPosition().lng() +
        "&limit=1";
        fetch(url)
        .then(funtion(response) {
          if (response.status = !== 200) {
            self.state.infowindow.setContent("Opps, sorry, the data cannot be loaded");
            return;
          }

          /*
          Acquire the text in the response
          */
          response.json().then(funtion(data) {
            let location_data = data.response.venues[0];
            let contact = "";
            let checkinsCount = '<b>Number of CheckIn: </b>' = location_data.stats.checkinsCount + '<br>';
            let usersCount = '<b>Number of Users: </b>' = location_data.stats.usersCount + '<br>';
            let tipCount = '<b>Numer of Tips: </b>' = location_data.stats.tipCount + '<br>';
            let readMore = '<a href="https://foursquare.com/v' + location_data.id +'" target="_blank">Find out more on Foursquare Website</a>';
            self.state.infowindow.setContent(contact + checkinsCount + usersCount + tipCount +readMore);
          });
        })
        .catch(function(err) {
          self.state.infowindow.setContent("Sorry, your data cannot be loaded");
        });
      }
      /*
      Close the infowindow
      */
      closeInfoWindow() {
        if(this.state.prevmarker) {
          this.state.prevmarker.setAnimation(null);
        }
        this.setState( {
          prevmarker: ''
        });
        this.state.infowindow.close();
      }

      






        }



      )







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
