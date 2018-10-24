import React from 'react';

const  Summary = ({windTypes, citiesGroupedByWind, numberOfCities, numberOfCitiesWithRain, numberOfCitiesWithClouds}) => {
  const windSummary = windTypes.map(windType => {
    const numberOfCitiesWithWindType = citiesGroupedByWind[windType].length
    return <div key={windType}>{windType} in {(numberOfCitiesWithWindType*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
  })
  return (
    <div>
      <h1>Summary</h1>
      <div className="summary">
        It is raining in {(numberOfCitiesWithRain*100/numberOfCities).toFixed(2)}% of the selected cities.
      </div>
      <br></br>
      <div className="summary">
        It is cloudy in {(numberOfCitiesWithClouds*100/numberOfCities).toFixed(2)}% of the selected cities.
      </div>
      <br></br>
      <div className="wind-summary">
        {windSummary}
      </div>
    </div>
  );
}

export default Summary;
