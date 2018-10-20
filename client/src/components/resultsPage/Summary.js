import React from 'react';


function Summary(props) {
  const windSummary = props.windTypes.map(windType => {
    const numberOfCitiesWithWindType = props.citiesGroupedByWind[windType].length
    return <div key={windType}>{windType} in {(numberOfCitiesWithWindType*100/props.numberOfCities).toFixed(2)}% of the selected cities.</div>
  })
  return (
    <div>
      <h1>Summary</h1>
      <div className="summary">
        It is raining in {(props.numberOfCitiesWithRain*100/props.numberOfCities).toFixed(2)}% of the selected cities.
      </div>
      <br></br>
      <div className="summary">
        It is cloudy in {(props.numberOfCitiesWithClouds*100/props.numberOfCities).toFixed(2)}% of the selected cities.
      </div>
      <br></br>
      <div className="wind-summary">
        {windSummary}
      </div>
    </div>
  );
}

export default Summary;
