import React, { Component } from 'react';
import City from "../../generalComponents/City";

class Wind extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      highlightedCities: [],
    }
    this.colors = {
      LIGHT_WINDS: "#41d3f4",
      MODERATE_WINDS: "#37acc6",
      STRONG_WIND_SMALL_CRAFT_WARNING: "#e07841",
      GALE_WARNING: "#f46e42",
      STORM_WARNING:  "#9e3a06",
      HURRICANE_FORCE_WIND_WARNING: "#9241f4",
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        highlightedCities: this.getHighlightedCities(this.props.windData, this.props.clickedWindButton),
      });
    }
  }

  getHighlightedCities(cities, windType) {
    return cities.filter(city => city.wind.type === windType);
  }

  render() {
    const highlightColor = this.colors[this.props.clickedWindButton];
    const windCities = this.props.windData.map(city => {
      const isHighlighted = this.state.highlightedCities.find(c => c.id === city.id);
      return <City 
        key={city.id}
        cityName={city.name}
        param={city.wind.speed}
        unit="km/h"
        cssClass="wind-city"
        specialStyle={{backgroundColor: isHighlighted ? highlightColor : ""}}
      />
    })
  
    return (
      <div className="wind-block">
        <h1>Wind information</h1>
        <div className="wind-cities">
          {windCities}
        </div>
      </div>
    );
  }
}

export default Wind;
