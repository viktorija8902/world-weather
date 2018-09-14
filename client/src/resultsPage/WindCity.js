import React, { Component } from 'react';

class WindCity extends Component {
  render() {
    return (
      <div >
        {this.props.windCityList.map(city => <div>{city.name}:{city.windSpeed}km/h</div>)}
      </div>
    );
  }
}

export default WindCity;