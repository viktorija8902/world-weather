import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {fromJS} from 'immutable';

import { CityMarker, CityPopup } from "./City";
import SelectedCoordinates from './SelectedCoordinates';


const sumReducer = (a, b) => a + b;

class MapWrapper extends PureComponent {
  state = {
    coordinatesOfPoints: [],
    numberOfPointsSelected: 0,
    clickedCityId: null,
    zoom: 3.0,
  }

  static getDerivedStateFromProps(props, state){
    const { cities } = props;
    if (JSON.stringify(cities)===JSON.stringify(state.cities)){
      return null;
    } else {
      const averageLat = cities.map(city => city.coord.Lat).reduce(sumReducer)/cities.length;
      const averageLon = cities.map(city => city.coord.Lon).reduce(sumReducer)/cities.length;
      return {
          cities: cities,
          latitude: averageLat,
          longitude: averageLon
        }
      }
  }

  handleViewPortChange = viewport => {
    this.setState({
      zoom: viewport.zoom,
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    })
  }

  handlePointSelection = e => {
    const numberOfPointsSelected = this.state.numberOfPointsSelected + 1;
    const updatedCoords = this.state.coordinatesOfPoints.concat({Lon: e.lngLat[0], Lat: e.lngLat[1]});
    if (numberOfPointsSelected < 4) {
      this.setState({
        coordinatesOfPoints: updatedCoords,
        numberOfPointsSelected: numberOfPointsSelected,
      });
    } else if (numberOfPointsSelected === 4 ) {
      this.setState({
        coordinatesOfPoints: updatedCoords,
        numberOfPointsSelected: numberOfPointsSelected,
      });
      this.props.onCustomSelect(updatedCoords);
    } else {
      this.setState({
        coordinatesOfPoints: [],
        numberOfPointsSelected: 0,
      });
    }
  }

  addMarkers = (cities, citiesWithSpecialCondition) => (
    cities.map(city => {
      const colorOfSpecialCondition = citiesWithSpecialCondition.has(city.id) ? "special-condition" : "";
      return <Marker key={city.id} id={city.id} latitude={city.coord.Lat} longitude={city.coord.Lon}>
              <CityMarker 
                text={city.name}
                markersCss={`city-marker ${colorOfSpecialCondition}`}
                onMarkerClick={() => this.setState({clickedCityId: city.id})}
              />
            </Marker>
    })
  )

  getUserSelectedPoints = (numberOfPoints, coordinatesOfPoints) => {
    let usersSelectedPoints;
    if (numberOfPoints > 0) {
      usersSelectedPoints = coordinatesOfPoints.map(coord => (
        <Marker key={`${coord.Lat}-${coord.Lon}`} latitude={coord.Lat} longitude={coord.Lon}>
          <CityMarker markersCss={"coord-marker"}/>
        </Marker>
      ));
    }
    return usersSelectedPoints;
  }

  createPopup = city => (
    <Popup 
      latitude={city.coord.Lat}
      longitude={city.coord.Lon}
      closeButton={true}
      onClose={() => this.setState({clickedCityId: null})}
    >
      <CityPopup city={city}/>
    </Popup>
  )

  render() {
    const { cities, citiesWithSpecialCondition } = this.props;
    const { numberOfPointsSelected, coordinatesOfPoints, clickedCityId, latitude, longitude, zoom } = this.state;
    const markers = this.addMarkers(cities, citiesWithSpecialCondition);
    const usersSelectedPoints = this.getUserSelectedPoints(numberOfPointsSelected, coordinatesOfPoints);
    let popup;
    if (clickedCityId) {
      const popupAmongCities = cities.find(city => city.id === clickedCityId);
      popup = popupAmongCities ? this.createPopup(popupAmongCities) : null;
    }

    return (
      <React.Fragment>
        {numberOfPointsSelected <= 4 && 
          <SelectedCoordinates coordinates={coordinatesOfPoints} />
        }
        <div style={{height: 450}}>
          <AutoSizer>
            {({ height, width }) => (
              <ReactMapGL
                width={width}
                height={height}
                latitude={latitude}
                longitude={longitude}
                zoom={zoom}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={this.handleViewPortChange}
                mapStyle="mapbox://styles/mapbox/light-v9?optimize=true"
                onClick={this.handlePointSelection}
              >
                {markers}
                {popup}
                {usersSelectedPoints}
              </ReactMapGL>
            )}
          </AutoSizer>
        </div>
      </React.Fragment>
    );
  }
}
MapWrapper.propTypes = {
  cities: PropTypes.array.isRequired,
  citiesWithSpecialCondition: PropTypes.object.isRequired,
}

export default MapWrapper;
