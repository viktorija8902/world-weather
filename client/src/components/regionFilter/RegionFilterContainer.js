import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectRegion, getWeatherData } from '../../actions/actionCreators';
import Region from './Region';


class RegionFilter extends PureComponent {
  state = { 
    selectedRegion: "",
  };
 
  handleClick = name => {
    this.setState({
      selectedRegion: name,
    });
    this.updateData(name);
  }

  handlePlaceSelection = name => {
    this.updateData(name);
  }

  updateData = name => {
    const { selectRegion, getWeatherData } = this.props;
    selectRegion(name);
    getWeatherData(name);
  }

  render() {
    const { regionList } = this.props;
    const regions = regionList.map(region => (
      <Region 
        key={region.main.name} 
        region={region} 
        onPlaceSelection={this.handlePlaceSelection}
        onRegionClick={this.handleClick}
        isClicked={this.state.selectedRegion === region.main.name}
      />
    ));

    return (
      <div className="region-filters">
        {regions}
      </div>
    );
  }
}
RegionFilter.propTypes = {
  // from parent:
  regionList: PropTypes.array.isRequired,
  // actions from store
  selectRegion: PropTypes.func.isRequired,
  getWeatherData: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  selectRegion: selectedRegion => dispatch(selectRegion(selectedRegion)),
  getWeatherData: selectedRegion => dispatch(getWeatherData(selectedRegion))
});

export default connect(
  undefined,
  mapDispatchToProps
)(RegionFilter);
