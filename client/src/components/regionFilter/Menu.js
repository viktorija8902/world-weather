import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectRegion, getWeatherData } from '../../actions/actionCreators';
import MenuItem from './MenuItem';
import { REGION_LIST, CUSTOM_LIST } from "../../data/Regions";

const Menu = ({ selectRegion, getWeatherData }) => {
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

  const handleDepthItemClick = name => {
    selectRegion(name);
    console.log("soon..")
  };

  const getMenuItems = () => {
    const regionList = REGION_LIST.map(item => (
      <MenuItem 
        key={item.main.name} 
        item={item} 
        onPlaceSelection={handlePlaceSelection}
        onRegionClick={handleClick}
        isClicked={selectedRegion === item.main.name}
      />
    ));
    const customList = CUSTOM_LIST.map(item => (
      <MenuItem 
        key={item.main.name} 
        item={item}
        onPlaceSelection={(name) => selectRegion(name)}
        onRegionClick={handleDepthItemClick}
        isClicked={selectedRegion === item.main.name}
      />
    ));
    return [...regionList, ...customList];
  };

  return (
    <nav aria-label="Main navigatoin" className="region-filters">
      {getMenuItems()}
    </nav>
  );
}
Menu.propTypes = {
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
)(Menu);
