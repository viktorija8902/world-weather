import React, { Component } from 'react';
import Region from './Region';

class RegionFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRegion: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    this.setState({
      selectedRegion: name 
    });
  }

  render() {
    const regions = this.props.regionList.map(region => {
      return <Region key={region.name} region={region} onRegionClick={this.handleClick} isClicked={this.state.selectedRegion === region.name}/>
    });

    return (
      <div className="region-filters">
        {regions}
      </div>
    );
  }
}

export default RegionFilters;