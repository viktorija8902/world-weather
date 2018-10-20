import React, { Component } from 'react';
import City from "../../generalComponents/City";

class Rain extends Component {
  render() {
    const rainCities = this.props.rainCities.map(city => 
      <City key={city.id} cityName={city.name} param={city.rain ? city.rain.description : "-"}/>
    );
    
    return (
      <div className="rain-block">
        <h1>Rain information</h1>
        <div className="rain-cities">{rainCities}</div>
      </div>
    );
  }
}

export default Rain;