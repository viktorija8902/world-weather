import React, { Component } from 'react';
import WindSpeedSummary from "./WindSpeedSummary";
import WindCity from "./WindCity";

class Wind extends Component {
  render() {
    return (
      <div >
        <WindCity windCityList={this.props.windData.windCityList}/>
        {/* {citiesGroupedByWind} */}
        <WindSpeedSummary summary={this.props.windData.windSummary}/>
      </div>
    );
  }
}

export default Wind;
