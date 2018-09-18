import React, { Component } from 'react';
import { regionList } from "./data/Regions";
import RegionFilterContainer from "./containers/RegionFilterContainer";
import ResultsPage from "./resultsPage/ResultsPage";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <React.StrictMode><RegionFilterContainer regionList={regionList}/></React.StrictMode>
        {this.props.regionData && <React.StrictMode><ResultsPage results={this.props.regionData}/></React.StrictMode>}
      </div>
    );
  }
}

export default Home;