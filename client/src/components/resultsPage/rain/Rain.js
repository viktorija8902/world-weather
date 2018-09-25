import React, { Component } from 'react';
import RainSummary from "./RainSummary";
import RainCity from "./RainCity";

class Rain extends Component {
  render() {
    const rainCities = this.props.rainData.rainCityList.map(city => 
      <RainCity key={city.name} cityName={city.name} rainStatus={city.rain ? city.rain : "-"}/>
    );
    
    return (
      <div className="rain-block">
        <h1>Rain information</h1>
        <div className="rain-cities">{rainCities}</div>
        <RainSummary summary={this.props.rainData.rainSummary}/>
      </div>
    );
  }
}

export default Rain;
