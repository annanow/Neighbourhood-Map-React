import React, { Component} from 'react'
import LocationItem from './LocationItem'

class LocationList extends Component {
  /*
  Constructor function
  */
  constructor(props) {
    super(props);
    this.state = {
      'locations': '',
      'query': '',
      'suggestions': true
    };
    this.filterLocations = this.filterLocations.bind(this);
  }
  /*
  Filter locations based on user query
  */
  filterLocations(event) {
    this.props.closeInfoWindow();
    const {value} = event.target;
    var locations = [];
    this.props.alllocations.forEach(function (location) {
      if (location.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
    locations: locations,
    query: value
    });
  }

  componentWillMount() {
    this.setState({
      'locations': this.props.alllocations
    });
  }
  /*
  Render function of LocationList
  */
  render () {
    var locationlist = this.state.locations.map(function (listItem, index) {
      return (
        <LocationItem
          key={index}
          openInfoWindow={this.props.openInfoWindow.bind(this)}
          data={listItem}
        />
      );
    }, this);
      return (
      <div className="search">
        <input
          role="search"
          aria-label="Search for a location"
          id="search-field"
          className="search-field"
          type="text"
          placeholder="Filter"
          value={this.state.query}
          onChange={this.filterLocations}
        />
        <ul className="location-list" aria-label="Select your location">
          {this.state.suggestions && locationlist}
        </ul>
      </div>
    );
  }
}

export default LocationList;
