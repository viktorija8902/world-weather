import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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


const ResultsPage = ({ windCitiesMap, rainCities, snowCities, cloudCities, getCustomWeatherData, noDataCustomSearch, errorInCustomSearch, cities }) => {
  const [ citiesWithSpecialCondition, setCitiesWithSpecialConditions ] = useState(new Set());
  const [ clickedWeatherButton, setClickedWeatherButton ] = useState("");

  useEffect(() => {
    if (clickedWeatherButton !== "") {
      highlightCities(clickedWeatherButton);
    }
  });

  const handleWeatherButtonClick = button => {
    highlightCities(button);
    setClickedWeatherButton(button);
  }

  const highlightCities = clickedButton => {
    let citiesWithCondition;
    const windCities = windCitiesMap.get(clickedButton);
    if (windCities) {
      citiesWithCondition = windCities;
    } else if (clickedButton === WEATHER_BUTTON.RAINING) {
      citiesWithCondition = rainCities;
    } else if (clickedButton === WEATHER_BUTTON.SNOWING) {
      citiesWithCondition = snowCities;
    } else if (clickedButton === WEATHER_BUTTON.CLOUDY) {
      citiesWithCondition = cloudCities;
    } else if (clickedButton === WEATHER_BUTTON.RESET) {
      citiesWithCondition = new Set();
    } else {
      citiesWithCondition = new Set();
    }
    setCitiesWithSpecialConditions(citiesWithCondition)
  }

  const handleCoordSelect = coord => {
    getCustomWeatherData({
      lonTopLeft: coord[0].Lon,
      latBottomLeft: coord[1].Lat,
      lonBottomRight: coord[2].Lon,
      latTopRight: coord[3].Lat
    });
  }

  let results;
  if (noDataCustomSearch) {
    results = <div>No data found. Try different points.</div>
  } else if (errorInCustomSearch !== "") {
    results = <div>{errorInCustomSearch}</div>
  } else {
    const windTypes = [...windCitiesMap.keys()].sort();
    results = <React.Fragment>
      <WeatherButtons
        windTypes={windTypes}
        onWeatherButtonClick={handleWeatherButtonClick}
        clickedButton={clickedWeatherButton}
      />
      <Summary
        windTypes={windTypes}
        citiesGroupedByWind={windCitiesMap}
        numberOfCities={cities.length}
        numberOfCitiesWithRain={rainCities.size}
        numberOfCitiesWithSnow={snowCities.size}
        numberOfCitiesWithClouds={cloudCities.size}
      />
      <Wind windTypes={windTypes} windData={cities} clickedWindButton={clickedWeatherButton}/>
      <Clouds cloudData={cities} />
      <Temperature temperatureData={cities} />
      <Rain rainCities={cities} />
    </React.Fragment>
  }
  return (
    <React.Fragment>
      <MapWrapper 
        cities={cities}
        citiesWithSpecialCondition={citiesWithSpecialCondition}
        onCustomSelect={handleCoordSelect}
      />
      {results}
    </React.Fragment>
  );
};
ResultsPage.propTypes = {
  // from redux store:
  noDataCustomSearch: PropTypes.bool.isRequired,
  errorInCustomSearch: PropTypes.string.isRequired,
  cities: PropTypes.array.isRequired,
  rainCities: PropTypes.object.isRequired,
  snowCities: PropTypes.object.isRequired,
  cloudCities: PropTypes.object.isRequired,
  windCitiesMap: PropTypes.object.isRequired,
  // actions
  getCustomWeatherData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  noDataCustomSearch: state.region.noDataCustomSearch,
  errorInCustomSearch: state.region.errorInCustomSearch,
  cloudCities: state.region.cloudCities,
  rainCities: state.region.rainCities,
  snowCities: state.region.snowCities,
  windCitiesMap: state.region.windCitiesMap,
});

const mapDispatchToProps = dispatch => ({
  getCustomWeatherData: coordinates => dispatch(getCustomWeatherData(coordinates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage);
