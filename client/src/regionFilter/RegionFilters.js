import React, { Component } from 'react';
import Region from './Region';

class RegionFilters extends Component {
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
    this.props.onPlaceSelection(name);
  }

  handlePlaceSelection(name) {
    this.props.onPlaceSelection(name);
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

export default RegionFilters;