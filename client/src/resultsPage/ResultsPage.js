import React, { Component } from 'react';
import NoData from "./NoData";
import Wind from "./wind/Wind";

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }



  render() {
    const noData = this.props.results.message === "no data";
    return (
      <div className="results">
        { noData ? <NoData/> : <Wind windData={this.props.results.windData}/> }
      </div>
    );
  }
}

export default ResultsPage;