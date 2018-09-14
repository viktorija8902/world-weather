import React, { Component } from 'react';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }



  render() {
    return (
      <div>
        {this.props.results}
      </div>
    );
  }
}

export default ResultsPage;