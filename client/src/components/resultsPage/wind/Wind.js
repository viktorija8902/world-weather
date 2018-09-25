import React, { Component } from 'react';
import WindSpeedSummary from "./WindSpeedSummary";
import City from "../../generalComponents/City";
import Button from "./Button";

class Wind extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      highlightedCities: [],
      windType: null,
    }
    this.colors = {
      LIGHT_WINDS: "#41d3f4",
      MODERATE_WINDS: "#37acc6",
      STRONG_WIND_SMALL_CRAFT_WARNING: "#e07841",
      GALE_WARNING: "#f46e42",
      STORM_WARNING:  "#9e3a06",
      HURRICANE_FORCE_WIND_WARNING: "#9241f4",
    }
    this.handleWindSelection = this.handleWindSelection.bind(this);
  }

  handleWindSelection(windType) {
    this.setState({
      highlightedCities: this.getHighlightedCities(this.props.windData.citiesGroupedByWind, windType),
      windType: windType
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.windType && prevProps !== this.props) {
      this.setState({
        highlightedCities: this.getHighlightedCities(this.props.windData.citiesGroupedByWind, this.state.windType),
      });
    }
  }

  getHighlightedCities(citiesGroupedByWind, windType) {
    return citiesGroupedByWind.find(arr => arr[0] === windType)[1];
  }

  render() {
    const highlightColor = this.colors[this.state.windType];
    const buttons = this.props.windData.citiesGroupedByWind.filter(group => {
      const cities = group[1];
      return cities.length !== 0;
    }).map(group => {
      const windType = group[0];
      return <Button 
        key={windType} 
        windType={windType} 
        highlightColor={windType === this.state.windType ? highlightColor : ""} 
        onWindSelection={this.handleWindSelection}
      />
    });
    const windCities = this.props.windData.windCityList.map(city => {
      return <City 
        key={city.name}
        cityName={city.name}
        param={city.windSpeed.toFixed(2)}
        unit="km/h"
        cssClass="wind-city"
        specialStyle={{backgroundColor: this.state.highlightedCities.includes(city.name) ? highlightColor : ""}}
      />
    })
  
    return (
      <div className="wind-block">
        <h1>Wind information</h1>
        <div className="wind-buttons">
          {buttons}
        </div>
        <div className="wind-cities">
          {windCities}
        </div>
        <WindSpeedSummary summary={this.props.windData.windSummary}/>
      </div>
    );
  }
}

export default Wind;
