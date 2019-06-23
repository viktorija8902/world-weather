import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Menu from "../components/regionFilter/Menu";
import ResultsPage from "./resultsPage/ResultsPage";
import Header from "./Header";
import Footer from './Footer';

const Home = props => {
  const { cities, error } = props;
  let page;
  if (error !== "") {
    page = <div>Failed to get data. Subscription ended?</div>
  } else if (cities.length === 0) {
    page = <div>Select region. It might take a while until Heroku dyno wakes up...</div>
  } else if (cities.length > 0) {
    page = <ResultsPage cities={cities}/>
  }

  return (
    <React.Fragment>
      <Header/>
      <React.StrictMode>
        <div className="content">
          <Menu />
          <main role="main" className="results">{page}</main>
        </div>
      </React.StrictMode>
      <Footer />
    </React.Fragment>
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
