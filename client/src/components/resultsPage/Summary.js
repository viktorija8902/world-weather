import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({ windTypes, citiesGroupedByWind, numberOfCities, numberOfCitiesWithRain, numberOfCitiesWithSnow, numberOfCitiesWithClouds }) => {
  const windSummary = windTypes.map(windType => {
    const numberOfCitiesWithWindType = citiesGroupedByWind.get(windType).size;
    return <div key={windType}>{windType} in {(numberOfCitiesWithWindType*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
  });
  return (
    <React.Fragment>
      <h1>Summary</h1>
      <div className="summary">
        <div>It is raining in {(numberOfCitiesWithRain*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
        <div>It is snowing in {(numberOfCitiesWithSnow*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
        <div>It is cloudy in {(numberOfCitiesWithClouds*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
        <br></br>
        {windSummary}
      </div>
    </React.Fragment>
  );
};
Summary.propTypes = {
  windTypes: PropTypes.array.isRequired,
  citiesGroupedByWind: PropTypes.object.isRequired,
  numberOfCities: PropTypes.number.isRequired,
  numberOfCitiesWithRain: PropTypes.number.isRequired,
  numberOfCitiesWithSnow: PropTypes.number.isRequired,
  numberOfCitiesWithClouds: PropTypes.number.isRequired,
};

export default Summary;
