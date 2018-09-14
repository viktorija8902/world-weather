import React, { Component } from 'react';
import Wind from "./Wind";

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }



  render() {
    return (
      <div>
        <Wind windData={this.props.results.windData}/>
      </div>
    );
  }
}

export default ResultsPage;