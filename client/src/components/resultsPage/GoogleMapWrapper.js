import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const CityMarker = ({ text }) => <div className="city-marker-wrapper">
  <div className="city-marker"></div>
  <div className="city-name">{text}</div>
</div>;

class GoogleMapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 1000,
        height: 500,
      }
    }
    this.handleViewPortChange = this.handleViewPortChange.bind(this);
  }

  handleViewPortChange(viewport) {
    this.props.onMapCenterChange(viewport.latitude, viewport.longitude, viewport.zoom)
  }

  render() {
    const markers = this.props.markers.map(marker => {
      return <Marker key={marker.name} latitude={marker.coord.Lat} longitude={marker.coord.Lon}>
              <CityMarker text={marker.name}/>
            </Marker>
    });
    return (
      <ReactMapGL
        {...this.state.viewport}
        latitude={this.props.averageLat}
        longitude={this.props.averageLon}
        zoom={this.props.zoom}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={this.handleViewPortChange}
      >
        {markers}
      </ReactMapGL>
    );
  }
}

export default GoogleMapWrapper;
