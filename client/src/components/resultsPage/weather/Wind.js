import React, { Component } from 'react';
import City from "../../generalComponents/City";
import Button from "./Button";

class Wind extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      highlightedCities: [],
      clickedWindType: null,
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
      highlightedCities: this.getHighlightedCities(this.props.windData, windType),
      clickedWindType: windType
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.clickedWindType && prevProps !== this.props) {
      this.setState({
        highlightedCities: this.getHighlightedCities(this.props.windData, this.state.clickedWindType),
      });
    }
  }

  getHighlightedCities(cities, windType) {
    return cities.filter(city => city.wind.type === windType);
  }

  render() {
    const highlightColor = this.colors[this.state.clickedWindType];
    const buttons = this.props.windTypes.map(windType => {
      return <Button 
        key={windType} 
        windType={windType} 
        highlightColor={windType === this.state.clickedWindType ? highlightColor : ""} 
        onWindSelection={this.handleWindSelection}
      />
    });
    const windCities = this.props.windData.map(city => {
      const isHighlighted = this.state.highlightedCities.find(c => c.id === city.id);
      return <City 
        key={city.id}
        cityName={city.name}
        param={city.wind.speed.toFixed(2)}
        unit="km/h"
        cssClass="wind-city"
        specialStyle={{backgroundColor: isHighlighted ? highlightColor : ""}}
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
      </div>
    );
  }
}

export default Wind;
