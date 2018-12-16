import React, { Component } from 'react';
import City from "../../generalComponents/City";

class Wind extends Component {
  state = { 
    highlightedCities: [],
  }
  colors = {
    LIGHT_WINDS: "#41d3f4",
    MODERATE_WINDS: "#37acc6",
    STRONG_WIND_SMALL_CRAFT_WARNING: "#e07841",
    GALE_WARNING: "#f46e42",
    STORM_WARNING:  "#9e3a06",
    HURRICANE_FORCE_WIND_WARNING: "#9241f4",
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { windData, clickedWindButton } = this.props;
      this.setState({
        highlightedCities: this.getHighlightedCities(windData, clickedWindButton),
      });
    }
  }

  getHighlightedCities(cities, windType) {
    return cities.filter(city => city.wind.type === windType);
  }

  render() {
    const { clickedWindButton, windData } = this.props;
    const highlightColor = this.colors[clickedWindButton];
    const windCities = windData.map(city => {
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
      <React.Fragment>
        <h1>Wind information</h1>
        <div className="wind-cities">
          {windCities}
        </div>
      </React.Fragment>
    );
  }
}

export default Wind;
