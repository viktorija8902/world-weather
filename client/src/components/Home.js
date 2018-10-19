import React, { Component } from 'react';
import { regionList } from "../data/Regions";
import RegionFilterContainer from "./../containers/RegionFilterContainer";
import ResultsPage from "./resultsPage/ResultsPage";
import Footer from './Footer';

class Home extends Component {
  render() {
    let page = null;
    if (this.props.cities.length > 0) {
      page = <ResultsPage
              cities={this.props.cities}
              rainCities={this.props.rainCities}
              results={this.props.regionData}
      />
    }
    return (
      <div className="home">
        <div className="content">
          <React.StrictMode><RegionFilterContainer regionList={regionList}/></React.StrictMode>
          <React.StrictMode>
            <div className="results">
              {page}
            </div>
          </React.StrictMode>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;