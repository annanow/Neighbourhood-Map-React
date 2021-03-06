import React from 'react'

class LocationItem extends React.Component {
  /*
  Render function for LocationItem
  */

  render() {
    return (
      <li
        role="button"
        aria-label="Location"
        className="box"
        tabIndex="0"
        onKeyPress={this.props.openInfoWindow.bind(
          this,
          this.props.data.marker
        )}
        onClick={this.props.openInfoWindow.bind(
          this,
          this.props.data.marker
        )}>
          {this.props.data.longname}
        </li>
      );
  }
}

export default LocationItem;
