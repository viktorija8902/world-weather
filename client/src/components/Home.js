import React, { Component } from 'react';
import { regionList } from "../data/Regions";
import RegionFilterContainer from "./../containers/RegionFilterContainer";
import ResultsPage from "./resultsPage/ResultsPage";
import NoDataPage from "./NoDataPage";

class Home extends Component {
  render() {
    let page = null;
    if (this.props.noResults) {
      page = <NoDataPage />
    } else if (this.props.regionData && !this.props.noResults) {
      page = <ResultsPage results={this.props.regionData}/>
    }
    return (
      <div className="home">
        <React.StrictMode><RegionFilterContainer regionList={regionList}/></React.StrictMode>
        <React.StrictMode>
          <div className="results">
            {page}
          </div>
        </React.StrictMode>
      </div>
    );
  }
}

export default Home;