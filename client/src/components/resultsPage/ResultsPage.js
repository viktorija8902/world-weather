import React, { Component } from 'react';
import Wind from "./wind/Wind";
import Rain from "./rain/Rain";
import Clouds from "./clouds/Clouds";
import Temperature from './temperature/Temperature';
import MapWrapper from "./MapWrapper";


const sumReducer = (a, b) => a + b;

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMapCenterChange = this.handleMapCenterChange.bind(this);
  }

  componentDidMount() {
    this.updateMapCenter();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateMapCenter();
    }
  }

  updateMapCenter() {
    const cities = this.props.results.cities;
    const averageLat = cities.map(city => city.coord.Lat).reduce(sumReducer)/cities.length;
    const averageLon = cities.map(city => city.coord.Lon).reduce(sumReducer)/cities.length;
    this.setState({
      averageLat: averageLat, 
      averageLon: averageLon,
      zoom: 3
    })
  }

  handleMapCenterChange(latitude, longtitude, zoom) {
    this.setState({
        averageLat: latitude,
        averageLon: longtitude,
        zoom: zoom
    })
  }

  render() {
    return (
      <div>
        <MapWrapper 
          onMapCenterChange={this.handleMapCenterChange}
          isMarkerShown markers={this.props.results.cities}
          averageLat={this.state.averageLat}
          averageLon={this.state.averageLon}
          zoom={this.state.zoom}
        />
        <Wind windData={this.props.results.windData} />
        <Rain rainData={this.props.results.rainData} />
        <Clouds cloudData={this.props.results.cloudData}></Clouds>
        <Temperature temperatureData={this.props.results.temperatureData}></Temperature>
      </div>
    );
  }
}

export default ResultsPage;