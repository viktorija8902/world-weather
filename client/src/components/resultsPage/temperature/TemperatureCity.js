import React, { Component } from 'react';

class TemperatureCity extends Component {
  render() {
    return (
      <div className="wind-city" style={{backgroundColor: this.props.highlightColor}} >
        {this.props.cityName}: {this.props.temperature}&#8451;
      </div>
    );
  }
}

export default TemperatureCity;