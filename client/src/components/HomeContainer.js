import React, { Component } from 'react';
import { connect } from 'react-redux'

import { regionList } from "../data/Regions";
import RegionFilter from "../components/regionFilter/RegionFilterContainer";
import ResultsPage from "./resultsPage/ResultsPage";
import Footer from './Footer';

class Home extends Component {
  render() {
    let page = null;
    if (this.props.cities.length > 0) {
      page = <ResultsPage cities={this.props.cities} />
    }
    return (
      <div className="home">
        <div className="content">
          <React.StrictMode><RegionFilter regionList={regionList}/></React.StrictMode>
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

const mapStateToProps = state => ({
    rainCities: state.region.rainCities,
    cities: state.region.cities,
    noResults: state.region.noResults,
})

export default connect(
    mapStateToProps,
    undefined
)(Home)
