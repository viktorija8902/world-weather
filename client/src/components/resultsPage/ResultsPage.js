import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomWeatherData } from '../../actions/actionCreators';
import { WEATHER_BUTTON } from '../../constants/Constants';
import Wind from "./wind/Wind";
import Rain from "./rain/Rain";
import Clouds from "./clouds/Clouds";
import Temperature from './temperature/Temperature';
import MapWrapper from "./MapWrapper";
import Summary from "./Summary";
import WeatherButtons from "./WeatherButtons";


class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesWithSpecialCondition: new Set(),
    }
    this.handleCoordSelect = this.handleCoordSelect.bind(this);
    this.handleWeatherButtonClick = this.handleWeatherButtonClick.bind(this);
  }

  handleCoordSelect(coord) {
    this.props.getCustomWeatherData({
      lonTopLeft: coord[0].Lon,
      latBottomLeft: coord[1].Lat,
      lonBottomRight: coord[2].Lon,
      latTopRight: coord[3].Lat
    });
  }

  handleWeatherButtonClick(button) {
    let citiesWithSpecialCondition;
    if (button === WEATHER_BUTTON.RAIN) {
      citiesWithSpecialCondition = this.props.rainCities;
    } else if (button === WEATHER_BUTTON.CLOUD) {
      citiesWithSpecialCondition = this.props.cloudCities;
    } else if (button === WEATHER_BUTTON.RESET) {
      citiesWithSpecialCondition = new Set();
    }
    this.setState({
      citiesWithSpecialCondition: citiesWithSpecialCondition,
    })
  }

  render() {
    let results;
    if (this.props.noDataCustomSearch) {
      results = <div>No data found. Try different points.</div>
    } else {
      results = <div>
        <WeatherButtons onWeatherButtonClick={this.handleWeatherButtonClick} />
        <Summary 
          wind={this.props.results.windData.windSummary}
          rain={this.props.results.rainData.rainSummary}
          cloud={this.props.results.cloudData.cloudSummary}
        />
        <Wind windData={this.props.results.windData} />
        <Clouds cloudData={this.props.results.cloudData} />
        <Temperature temperatureData={this.props.results.temperatureData} />
        <Rain rainData={this.props.results.rainData} />
      </div>
    }
    return (
      <div>
        <MapWrapper 
          cities={this.props.results.cities}
          citiesWithSpecialCondition={this.state.citiesWithSpecialCondition}
          onCustomSelect={this.handleCoordSelect}
        />
        {results}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noDataCustomSearch: state.region.noDataCustomSearch,
  rainCities: state.region.rainCities,
  cloudCities: state.region.cloudCities,
})

const mapDispatchToProps = dispatch => ({
  getCustomWeatherData: coordinates => dispatch(getCustomWeatherData(coordinates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage);
