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

  groupByWindType(cities) {
    let citiesGroupedByWind = {}
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const windType = city.wind.type;
      if (citiesGroupedByWind[windType]) {
        citiesGroupedByWind[windType] = citiesGroupedByWind[windType].concat(city);
      } else {
        citiesGroupedByWind[windType] = [city]
      }
    }
    return citiesGroupedByWind;
  }

  render() {
    let results;
    if (this.props.noDataCustomSearch) {
      results = <div>No data found. Try different points.</div>
    } else {
      let citiesGroupedByWind = this.groupByWindType(this.props.cities);
      let windTypes = Object.keys(citiesGroupedByWind);
      let numberOfCities = this.props.cities.length;
      results = <div>
        <WeatherButtons onWeatherButtonClick={this.handleWeatherButtonClick} />
        <Summary 
          windTypes={windTypes}
          citiesGroupedByWind={citiesGroupedByWind}
          numberOfCities={numberOfCities}
          numberOfCitiesWithRain={this.props.rainCities.size}
          numberOfCitiesWithClouds={this.props.cloudCities.size}
        />
        <Wind windTypes={windTypes} windData={this.props.cities} />
        <Clouds cloudData={this.props.cities} />
        <Temperature temperatureData={this.props.cities} />
        <Rain rainCities={this.props.cities} />
      </div>
    }
    return (
      <div>
        <MapWrapper 
          cities={this.props.cities}
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
  cloudCities: state.region.cloudCities,
  rainCities: state.region.rainCities,
})

const mapDispatchToProps = dispatch => ({
  getCustomWeatherData: coordinates => dispatch(getCustomWeatherData(coordinates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage);
