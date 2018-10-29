import React from 'react';
import { connect } from 'react-redux'

import { regionList } from "../data/Regions";
import RegionFilter from "../components/regionFilter/RegionFilterContainer";
import ResultsPage from "./resultsPage/ResultsPage";
import Footer from './Footer';

const Home = (props) => {
  const {cities, error} = props;
  let page = null;
  if (cities.length === 0) {
    page = <div>Select country.</div>
  } else if (cities.length > 0) {
    page = <ResultsPage cities={cities}/>
  } else if (error) {
    page = <div>Failed to get data.</div>
  }

  return (
    <div className="home">
      <div className="content">
        <React.StrictMode>
          <RegionFilter regionList={regionList}/>
        </React.StrictMode>
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

const mapStateToProps = state => ({
  cities: state.region.cities,
  error: state.region.error,
})

export default connect(
    mapStateToProps,
    undefined
)(Home)
