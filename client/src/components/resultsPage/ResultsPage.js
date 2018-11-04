import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCustomWeatherData } from '../../actions/actionCreators';
import { WEATHER_BUTTON } from './../../constants/Constants';
import Wind from "./weather/Wind";
import Rain from "./weather/Rain";
import Clouds from "./weather/Clouds";
import Temperature from './weather/Temperature';
import MapWrapper from "./worldMap/MapWrapper";
import WeatherButtons from "./worldMap/WeatherButtons";
import Summary from "./Summary";


class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesWithSpecialCondition: new Set(),
      clickedWeatherButton: null,
    }
    this.handleCoordSelect = this.handleCoordSelect.bind(this);
    this.handleWeatherButtonClick = this.handleWeatherButtonClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.state.clickedWeatherButton && prevProps !== this.props) {
      this.highlightCities(this.state.clickedWeatherButton);
    }
  }

  handleWeatherButtonClick(button) {
    this.highlightCities(button);
    this.setState({
      clickedWeatherButton: button,
    });
  }

  highlightCities(clickedButton) {
    let citiesWithSpecialCondition;
    const windCities = this.props.windCitiesMap.get(clickedButton);
    if (windCities) {
      citiesWithSpecialCondition = windCities;
    } else if (clickedButton === WEATHER_BUTTON.RAINING) {
      citiesWithSpecialCondition = this.props.rainCities;
    } else if (clickedButton === WEATHER_BUTTON.CLOUDY) {
      citiesWithSpecialCondition = this.props.cloudCities;
    } else if (clickedButton === WEATHER_BUTTON.RESET) {
      citiesWithSpecialCondition = new Set();
    } else {
      citiesWithSpecialCondition = new Set();
    }
    this.setState({
      citiesWithSpecialCondition: citiesWithSpecialCondition,
    });
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
    const {noDataCustomSearch, errorInCustomSearch, cities, rainCities, cloudCities, windCitiesMap} = this.props;
    if (noDataCustomSearch) {
      results = <div>No data found. Try different points.</div>
    } else if (errorInCustomSearch) {
      results = <div>{errorInCustomSearch}</div>
    } else {
      const windTypes = [...windCitiesMap.keys()].sort();
      results = <React.Fragment>
        <WeatherButtons
          windTypes={windTypes}
          onWeatherButtonClick={this.handleWeatherButtonClick}
          clickedButton={this.state.clickedWeatherButton}
        />
        <Summary
          windTypes={windTypes}
          citiesGroupedByWind={windCitiesMap}
          numberOfCities={cities.length}
          numberOfCitiesWithRain={rainCities.size}
          numberOfCitiesWithClouds={cloudCities.size}
        />
        <Wind windTypes={windTypes} windData={cities} clickedWindButton={this.state.clickedWeatherButton}/>
        <Clouds cloudData={cities} />
        <Temperature temperatureData={cities} />
        <Rain rainCities={cities} />
      </React.Fragment>
    }
    return (
      <React.Fragment>
        <MapWrapper 
          cities={cities}
          citiesWithSpecialCondition={this.state.citiesWithSpecialCondition}
          onCustomSelect={this.handleCoordSelect}
        />
        {results}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  noDataCustomSearch: state.region.noDataCustomSearch,
  errorInCustomSearch: state.region.errorInCustomSearch,
  cloudCities: state.region.cloudCities,
  rainCities: state.region.rainCities,
  windCitiesMap: state.region.windCitiesMap,
})

const mapDispatchToProps = dispatch => ({
  getCustomWeatherData: coordinates => dispatch(getCustomWeatherData(coordinates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage);
