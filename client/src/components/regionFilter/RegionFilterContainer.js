import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectRegion, getWeatherData } from '../../actions/actionCreators';
import Region from './Region';

const RegionFilter = ({ selectRegion, getWeatherData, regionList }) => {
  const [selectedRegion, setRegion] = useState("");
 
  const handleClick = name => {
    setRegion(name)
    updateData(name);
  };

  const handlePlaceSelection = name => {
    updateData(name);
  };

  const updateData = name => {
    selectRegion(name);
    getWeatherData(name);
  };

  const regions = regionList.map(region => (
    <Region 
      key={region.main.name} 
      region={region} 
      onPlaceSelection={handlePlaceSelection}
      onRegionClick={handleClick}
      isClicked={selectedRegion === region.main.name}
    />
  ));

  return (
    <nav aria-label="Main navigatoin" className="region-filters">
      {regions}
    </nav>
  );
}
RegionFilter.propTypes = {
  // from parent:
  regionList: PropTypes.array.isRequired,
  // actions from store
  selectRegion: PropTypes.func.isRequired,
  getWeatherData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  selectRegion: selectedRegion => dispatch(selectRegion(selectedRegion)),
  getWeatherData: selectedRegion => dispatch(getWeatherData(selectedRegion))
});

export default connect(
  undefined,
  mapDispatchToProps
)(RegionFilter);
