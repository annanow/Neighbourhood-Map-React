import React, { Component} from 'react'
import LocationItem from './LocationItem'

class LocationList extends Component {
  /*Constructor*/
  constructor(props) {
    super(props);
    this.state = {
      'locations': '',
      'query': '',
      'suggestions': true
    };
    this.filterLocations = this.filterLocations.bind(this);
    this.toggleSuggestions - this.toggleSuggestions.bind(this);
  }
  
}
