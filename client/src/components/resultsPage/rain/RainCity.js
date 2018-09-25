import React, { Component } from 'react';

class RainCity extends Component {
  render() {
    return (
      <div className="rain-cities">
        {this.props.rainCityList.map(city => 
            <div key={city.name} >
                {city.name}: {city.rain ? city.rain : "-"}
            </div>)}
      </div>
    );
  }
}

export default RainCity;