import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RegionPart from "./RegionPart";

class Region extends PureComponent {
  state = {
    clickedRegionPart: "",
  };

  handleRegionClick = e => {
    this.setState({
      clickedRegionPart: "" 
    });
    this.props.onRegionClick(e.target.id)
  }

  handleRegionPartClick = name => {
    this.setState({
      clickedRegionPart: name 
    });
    this.props.onPlaceSelection(name);
  }

  render() {
    const { region, isClicked } = this.props;
    const subregions = region.parts.map(part => (
      <RegionPart 
        key={part.name}
        regionPart={part}
        onRegionPartClick={this.handleRegionPartClick}
        isClicked={this.state.clickedRegionPart === part.name }/> 
    ));
    const cssSelectedClass = isClicked ? "selected-region" : "";
    
    return (
      <div className="region-wrapper">
        <div className={`region ${cssSelectedClass}`} id={region.main.name} onClick={this.handleRegionClick}>
          {region.main.name.toUpperCase()}
        </div>
        {isClicked && <div>{subregions}</div>}
      </div>
    );
  }
};
Region.propTypes = {
  region: PropTypes.object.isRequired,
  isClicked: PropTypes.bool.isRequired,
};

export default Region;
