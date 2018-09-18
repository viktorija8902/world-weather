import React, { Component } from 'react';

class WindCity extends Component {
  render() {
    return (
      <div className="wind-city" style={{backgroundColor: this.props.highlightColor}} >
        {this.props.cityName}:{this.props.windSpeed}km/h
      </div>
    );
  }
}

export default WindCity;