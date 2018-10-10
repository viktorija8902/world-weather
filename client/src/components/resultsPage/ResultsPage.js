import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wind from "./wind/Wind";
import Rain from "./rain/Rain";
import Clouds from "./clouds/Clouds";
import Temperature from './temperature/Temperature';
import MapWrapper from "./MapWrapper";
import { getCustomWeatherData } from '../../actions/actionCreators';

const sumReducer = (a, b) => a + b;

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMapCenterChange = this.handleMapCenterChange.bind(this);
    this.handleCoordSelect = this.handleCoordSelect.bind(this);
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

  handleCoordSelect(coord) {
    this.props.getCustomWeatherData({
      lonTopLeft: coord[0].Lon,
      latBottomLeft: coord[1].Lat,
      lonBottomRight: coord[2].Lon,
      latTopRight: coord[3].Lat
    });
  }

  render() {
    let results;
    if (this.props.noDataCustomSearch) {
      results = <div>No data found. Try again</div>
    } else {
      results = <div>
        <Wind windData={this.props.results.windData} />
        <Rain rainData={this.props.results.rainData} />
        <Clouds cloudData={this.props.results.cloudData} />
        <Temperature temperatureData={this.props.results.temperatureData} />
      </div>
    }  
    return (
      <div>
        <MapWrapper 
          onMapCenterChange={this.handleMapCenterChange}
          isMarkerShown 
          markers={this.props.results.cities}
          averageLat={this.state.averageLat}
          averageLon={this.state.averageLon}
          zoom={this.state.zoom}
          onCustomSelect={this.handleCoordSelect}
        />
        {results}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noDataCustomSearch: state.region.noDataCustomSearch,
})

const mapDispatchToProps = dispatch => ({
    getCustomWeatherData: coordinates => dispatch(getCustomWeatherData(coordinates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage);
