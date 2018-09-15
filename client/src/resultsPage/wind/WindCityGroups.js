import React, { Component } from 'react';

class WindCityGroups extends Component {
  render() {
    return (
      <div className="wind-city-groups">
        {this.props.citiesGroupedByWind.map(info => {
          return <div key={info[0]}>{info[0]}: {info[1].join(", ")}</div>
        })}
      </div>
    );
  }
}

export default WindCityGroups;
