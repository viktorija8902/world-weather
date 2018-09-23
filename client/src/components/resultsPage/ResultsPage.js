import React, { Component } from 'react';
import NoData from "./NoData";
import Wind from "./wind/Wind";
import Rain from "./rain/Rain";
import Clouds from "./clouds/Clouds";
import Temperature from './temperature/Temperature';

//TODO refactor similar code
class ResultsPage extends Component {
  render() {
    const noData = this.props.results.message === "no data";
    return (
      <div className="results">
        {noData ?
          <NoData />
          :
          <div>
            <Wind windData={this.props.results.windData} />
            <Rain rainData={this.props.results.rainData} />
            <Clouds cloudData={this.props.results.cloudData}></Clouds>
            <Temperature temperatureData={this.props.results.temperatureData}></Temperature>
          </div>
        }
      </div>
    );
  }
}

export default ResultsPage;