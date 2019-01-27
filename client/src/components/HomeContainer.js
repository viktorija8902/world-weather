import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { regionList } from "../data/Regions";
import RegionFilter from "../components/regionFilter/RegionFilterContainer";
import ResultsPage from "./resultsPage/ResultsPage";
import Footer from './Footer';

const Home = props => {
  const { cities, error } = props;
  let page = null;
  if (cities.length === 0) {
    page = <div>Select region. It might take a while until Heroku dyno wakes up...</div>
  } else if (cities.length > 0) {
    page = <ResultsPage cities={cities}/>
  } else if (error !== "") {
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
Home.propTypes = {
  //from redux store:
  cities: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
}
const mapStateToProps = state => ({
  cities: state.region.cities,
  error: state.region.error,
})

export default connect(
  mapStateToProps
)(Home);
