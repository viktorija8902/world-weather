import React, { Component } from 'react';
import NoData from "./NoData";
import Wind from "./wind/Wind";
import Rain from "./rain/Rain";

class ResultsPage extends Component {
  constructor(props) {
    super(props);
  }



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
          </div>
        }
      </div>
    );
  }
}

export default ResultsPage;