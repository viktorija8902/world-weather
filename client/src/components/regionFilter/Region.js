import React, { Component } from 'react';
import RegionPart from "./RegionPart";

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = { clickedRegionPart: "" };
    this.handleRegionClick = this.handleRegionClick.bind(this);
    this.handleRegionPartClick = this.handleRegionPartClick.bind(this);
  }

  handleRegionClick(e) {
    this.setState({
      clickedRegionPart: "" 
    });
    this.props.onRegionClick(e.target.id)
  }

  handleRegionPartClick(name) {
    this.setState({
      clickedRegionPart: name 
    });
    this.props.onPlaceSelection(name);
  }

  render() {
    const subregions = this.props.region.parts.map(part => {
      return <RegionPart 
                key={part.name}
                regionPart={part}
                onRegionPartClick={this.handleRegionPartClick}
                isClicked={this.state.clickedRegionPart === part.name }/> 
    });
    const cssSelectedClass = this.props.isClicked ? "selected-region" : "";
    
    return (
      <div className="region-wrapper">
        <div className={`region ${cssSelectedClass}`} id={this.props.region.main.name} onClick={this.handleRegionClick}>
          {this.props.region.main.name.toUpperCase()}
        </div>
        {this.props.isClicked && <div>{subregions}</div>}
      </div>
    );
  }
}

export default Region;