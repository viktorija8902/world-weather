import React, { Component } from 'react';
import { connect } from 'react-redux'

import { selectRegion, getWeatherData } from '../../actions/actionCreators'
import Region from './Region';


class RegionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRegion: "" };
    this.handleClick = this.handleClick.bind(this);
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this);
  }
 
  handleClick(name) {
    this.setState({
      selectedRegion: name
    });
    this.props.selectRegion(name);
    this.props.getWeatherData(name);
  }

  handlePlaceSelection(name) {
    this.props.selectRegion(name);
    this.props.getWeatherData(name)
  }

  render() {
    const regions = this.props.regionList.map(region => {
      return <Region 
          key={region.main.name} 
          region={region} 
          onPlaceSelection={this.handlePlaceSelection}
          onRegionClick={this.handleClick}
          isClicked={this.state.selectedRegion === region.main.name}
        />
    });

    return (
      <div className="region-filters">
        {regions}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    selectRegion: selectedRegion => dispatch(selectRegion(selectedRegion)),
    getWeatherData: selectedRegion => dispatch(getWeatherData(selectedRegion))
});

export default connect(
    undefined,
    mapDispatchToProps
)(RegionFilter);
