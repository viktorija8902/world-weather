import React, { Component } from 'react';
import WindSpeedSummary from "./WindSpeedSummary";

class Wind extends Component {
  render() {
    const cityWinds = this.props.windData.windCityList.map(city => <div>{city.name}:{city.windSpeed}km/h</div>)
    return (
      <div >
        {cityWinds}
        {/* {citiesGroupedByWind} */}
        <WindSpeedSummary summary={this.props.windData.windSummary}/>
      </div>
    );
  }
}

export default Wind;
