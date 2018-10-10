import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const CityMarker = ({ text, markersCss }) => <div className="city-marker-wrapper">
  <div className={markersCss}></div>
  <div className="city-name">{text}</div>
</div>;

class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 1000,
        height: 500,
      },
      coordinatesOfPoints: [],
      pointsSelected: 0,
    }
    this.handleViewPortChange = this.handleViewPortChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleViewPortChange(viewport) {
    this.props.onMapCenterChange(viewport.latitude, viewport.longitude, viewport.zoom)
  }

  handleClick(e) {
    const pointsSelected = this.state.pointsSelected + 1;
    const updatedCoords = this.state.coordinatesOfPoints.concat({Lon: e.lngLat[0], Lat: e.lngLat[1]});
    if (pointsSelected < 4) {
      this.setState({
        coordinatesOfPoints: updatedCoords,
        pointsSelected: pointsSelected,
      });
    } else if (pointsSelected === 4 ) {
      this.setState({
        coordinatesOfPoints: updatedCoords,
        pointsSelected: pointsSelected,
      });
      this.props.onCustomSelect(updatedCoords);
    } else {
      this.setState({
        coordinatesOfPoints: [],
        pointsSelected: 0,
      });
    }
  }

  render() {
    const markers = this.props.markers.map(marker => {
      return <Marker key={marker.name} latitude={marker.coord.Lat} longitude={marker.coord.Lon}>
              <CityMarker text={marker.name} markersCss="city-marker" />
            </Marker>
    });
    let usersSelectedDots;
    if (this.state.pointsSelected > 0) {
      usersSelectedDots = this.state.coordinatesOfPoints.map(coord => {
        return <Marker key={coord} latitude={coord.Lat} longitude={coord.Lon}>
                 <CityMarker markersCss={"coord-marker"}/>
               </Marker>
      })
    }
    return (
      <div>
        {this.state.pointsSelected <= 4 &&
          <div className="selected-coords">
            <div>Top left corner: {JSON.stringify(this.state.coordinatesOfPoints[0]) || "-" }</div>
            <div>Top right corner: {JSON.stringify(this.state.coordinatesOfPoints[1]) || "-" }</div>
            <div>Bottom right corner: {JSON.stringify(this.state.coordinatesOfPoints[2]) || "-" }</div>
            <div>Bottom left corner: {JSON.stringify(this.state.coordinatesOfPoints[3]) || "-" }</div>
          </div>
        }
        <ReactMapGL
          {...this.state.viewport}
          latitude={this.props.averageLat}
          longitude={this.props.averageLon}
          zoom={this.props.zoom}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.handleViewPortChange}
          mapStyle="mapbox://styles/mapbox/light-v9?optimize=true"
          onClick={this.handleClick}
        >
          {markers}
          {usersSelectedDots}
        </ReactMapGL>
      </div>
    );
  }
}

export default MapWrapper;
