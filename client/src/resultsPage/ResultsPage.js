import React, { Component } from 'react';
import Wind from "./wind/Wind";

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }



  render() {
    return (
      <div className="results">
        <Wind windData={this.props.results.windData}/>
      </div>
    );
  }
}

export default ResultsPage;