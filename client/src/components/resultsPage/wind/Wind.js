import React, { Component } from 'react';
import WindSpeedSummary from "./WindSpeedSummary";
import WindCity from "./WindCity";
import WindCityGroups from './WindCityGroups';
import Button from "./Button";

class Wind extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      highlightedCities: [],
      highlightColor: "",
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
    this.handleWindSelection = this.handleWindSelection.bind(this)
  }

  handleWindSelection(windType) {
    this.setState({
      highlightedCities: this.getHighlightedCities(this.props.windData.citiesGroupedByWind, windType),
      highlightColor: this.colors[windType],
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
    const buttons = this.props.windData.citiesGroupedByWind.map(group => {
      const windType = group[0];
      const cities = group[1];
      if (cities.length !== 0) {
        return <Button key={windType} windType={windType} onWindSelection={this.handleWindSelection}/>
      };
    });
    const windCities = this.props.windData.windCityList.map(city => {
      return <WindCity 
        key={city.name} 
        cityName={city.name} 
        windSpeed={city.windSpeed} 
        highlightColor={this.state.highlightedCities.includes(city.name) ? this.state.highlightColor : ""}
      />
    })
  
    return (
      <div className="wind-block">
        <h1>Wind information</h1>
        {buttons}
        <div className="wind-cities">
          {windCities}
        </div>
        <WindCityGroups citiesGroupedByWind={this.props.windData.citiesGroupedByWind}/>
        <WindSpeedSummary summary={this.props.windData.windSummary}/>
      </div>
    );
  }
}

export default Wind;
