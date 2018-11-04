import React from 'react';

const  Summary = ({windTypes, citiesGroupedByWind, numberOfCities, numberOfCitiesWithRain, numberOfCitiesWithClouds}) => {
  const windSummary = windTypes.map(windType => {
    const numberOfCitiesWithWindType = citiesGroupedByWind.get(windType).size;
    return <div key={windType}>{windType} in {(numberOfCitiesWithWindType*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
  });
  return (
    <React.Fragment>
      <h1>Summary</h1>
      <div className="summary">
        <div>It is raining in {(numberOfCitiesWithRain*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
        <div>It is cloudy in {(numberOfCitiesWithClouds*100/numberOfCities).toFixed(2)}% of the selected cities.</div>
        <br></br>
        {windSummary}
      </div>
    </React.Fragment>
  );
}

export default Summary;
