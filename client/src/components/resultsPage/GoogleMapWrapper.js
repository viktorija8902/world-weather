import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const Marker = ({ text }) => <div>{text}</div>;
 
class GoogleMapWrapper extends Component {
  render() {
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          center={{ lat: this.props.averageLat, lng: this.props.averageLon }}
          defaultZoom={4}
        >
          {this.props.markers.map(marker => <Marker key={marker.name} lat={marker.coord.Lat} lng={marker.coord.Lon} text={marker.name} />)}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GoogleMapWrapper;
