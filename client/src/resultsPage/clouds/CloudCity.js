import React, { Component } from 'react';

class CloudCity extends Component {
  render() {
    return (
      <div className="cloud-cities">
        <h3>Cloud coverage</h3>
        {this.props.cloudCityList.map(city =>
          <div key={city.name} >
            {city.name}: {city.cloudCoverage}%
          </div>)}
      </div>
    );
  }
}

export default CloudCity;