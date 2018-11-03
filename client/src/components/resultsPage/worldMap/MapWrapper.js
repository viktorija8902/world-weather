import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import SelectedCoordinates from './SelectedCoordinates';


const CityMarker = ({ text, markersCss, onMarkerClick }) => (
  <div className="city-marker-wrapper" onClick={onMarkerClick} >
    <div className={markersCss}></div>
    <div className="city-name">{text}</div>
  </div>
);

const CityPopup = ({ city }) => (
  <div className="city-popup" >
    <div>{city.name}</div>
    <div>temperature: {city.temperature}&#8451;</div>
    <div>wind: {city.wind.speed}km/h</div>
    <div>cloud coverage: {city.clouds.today}%</div>
    {city.rain && <div>{city.rain.description}</div>}
  </div>
);

const sumReducer = (a, b) => a + b;

class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinatesOfPoints: [],
      numberOfPointsSelected: 0,
      clickedCityId: null,
      zoom: 3.0,
    }
    this.handleViewPortChange = this.handleViewPortChange.bind(this);
    this.handlePointSelection = this.handlePointSelection.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    if (JSON.stringify(props.cities)===JSON.stringify(state.cities)){
      return null;
    } else {
      const {cities} = props;
      const averageLat = cities.map(city => city.coord.Lat).reduce(sumReducer)/cities.length;
      const averageLon = cities.map(city => city.coord.Lon).reduce(sumReducer)/cities.length;
      return {
          cities: cities,
          latitude: averageLat,
          longitude: averageLon
        }
      }
  }

  handleViewPortChange(viewport) {
    this.setState({
      zoom: viewport.zoom,
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    })
  }

  handlePointSelection(e) {
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

  addMarkers(cities, citiesWithSpecialCondition) {
    return cities.map(city => {
      const colorOfSpecialCondition = citiesWithSpecialCondition.has(city.id) ? "special-condition" : "";
      return <Marker key={city.id} id={city.id} latitude={city.coord.Lat} longitude={city.coord.Lon}>
              <CityMarker 
                text={city.name}
                markersCss={`city-marker ${colorOfSpecialCondition}`}
                onMarkerClick={() => this.setState({clickedCityId: city.id})}
              />
            </Marker>
    });
  }

  getUserSelectedPoints(numberOfPoints, coordinatesOfPoints) {
    let usersSelectedPoints;
    if (numberOfPoints > 0) {
      usersSelectedPoints = coordinatesOfPoints.map(coord => {
        return <Marker key={`${coord.Lat}-${coord.Lon}`} latitude={coord.Lat} longitude={coord.Lon}>
                 <CityMarker markersCss={"coord-marker"}/>
               </Marker>
      })
    }
    return usersSelectedPoints;
  }

  createPopup(city) {
    return <Popup 
      latitude={city.coord.Lat}
      longitude={city.coord.Lon}
      closeButton={true}
      onClose={() => this.setState({clickedCityId: null})}
    >
      <CityPopup city={city}/>
    </Popup>
  }

  render() {
    const markers = this.addMarkers(this.props.cities, this.props.citiesWithSpecialCondition);
    const usersSelectedPoints = this.getUserSelectedPoints(this.state.numberOfPointsSelected, this.state.coordinatesOfPoints);
    let popup;
    if (this.state.clickedCityId) {
      const popupAmongCities = this.props.cities.find(city => city.id === this.state.clickedCityId);
      popup = popupAmongCities ? this.createPopup(popupAmongCities) : null;
    }

    return (
      <div>
        {this.state.numberOfPointsSelected <= 4 && 
          <SelectedCoordinates coordinates={this.state.coordinatesOfPoints} />
        }
        <div style={{height: 450}}>
          <AutoSizer>
            {({ height, width }) => (
              <ReactMapGL
                width={width}
                height={height}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                zoom={this.state.zoom}
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
      </div>
    );
  }
}

export default MapWrapper;
