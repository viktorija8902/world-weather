import React, { Component } from 'react';

class RainCity extends Component {
  getOutput(rainInfo) {
      if (rainInfo === null) {
          return '-';
      }
      const hours = Object.keys(rainInfo)[0];
      return `rained in the last ${hours} (${Object.values(rainInfo)[0]}mm).`;
  }
  render() {
    return (
      <div className="rain-cities">
        {this.props.rainCityList.map(city => 
            <div key={city.name} >
                {city.name}: {this.getOutput(city.rainInLastThreeHours)}
            </div>)}
      </div>
    );
  }
}

export default RainCity;