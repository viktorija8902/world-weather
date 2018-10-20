import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SelectedCoordinates from './SelectedCoordinates';


const CityMarker = ({ text, markersCss }) => <div className="city-marker-wrapper">
  <div className={markersCss}></div>
  <div className="city-name">{text}</div>
</div>;

const sumReducer = (a, b) => a + b;

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

  componentDidMount() {
    this.updateMapCenter();
    this.setState({
      zoom: 3
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateMapCenter();
    }
  }

  updateMapCenter() {
    const cities = this.props.cities;
    const averageLat = cities.map(city => city.coord.Lat).reduce(sumReducer)/cities.length;
    const averageLon = cities.map(city => city.coord.Lon).reduce(sumReducer)/cities.length;
    
    this.setState({
      averageLat: averageLat, 
      averageLon: averageLon,
    })
  }

  handleViewPortChange(viewport) {
    this.setState({
      averageLat: viewport.latitude,
      averageLon: viewport.longitude,
      zoom: viewport.zoom
    })
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
    let colorOfSpecialCondition;
    const markers = this.props.cities.map(city => {
      if (this.props.citiesWithSpecialCondition.has(city.id)) {
        colorOfSpecialCondition = "special-condition";
      } else {
        colorOfSpecialCondition = "";
      }
      return <Marker key={city.id} latitude={city.coord.Lat} longitude={city.coord.Lon}>
              <CityMarker text={city.name} markersCss={`city-marker ${colorOfSpecialCondition}`} />
            </Marker>
    });
    let usersSelectedDots;
    if (this.state.pointsSelected > 0) {
      usersSelectedDots = this.state.coordinatesOfPoints.map(coord => {
        return <Marker key={`${coord.Lat}-${coord.Lon}`} latitude={coord.Lat} longitude={coord.Lon}>
                 <CityMarker markersCss={"coord-marker"}/>
               </Marker>
      })
    }
    return (
      <div>
        {this.state.pointsSelected <= 4 && 
          <SelectedCoordinates coordinates={this.state.coordinatesOfPoints} />
        }
        <ReactMapGL
          {...this.state.viewport}
          latitude={this.state.averageLat}
          longitude={this.state.averageLon}
          zoom={this.state.zoom}
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
