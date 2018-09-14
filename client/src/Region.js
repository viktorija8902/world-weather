import React, { Component } from 'react';
import RegionPart from "./RegionPart";

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = { clickedRegionPart: "" };
    this.handleClick = this.handleClick.bind(this);
    this.handleRegionPartClick = this.handleRegionPartClick.bind(this);
  }

  handleClick(e) {
    this.props.onRegionClick(e.target.id)
  }

  handleRegionPartClick(name) {
    this.setState({
      clickedRegionPart: name 
    });
  }

  render() {
    const subregions = this.props.region.parts.map(part => {
      return <RegionPart key={part.name} regionPart={part} onRegionPartClick={this.handleRegionPartClick} isClicked={this.state.clickedRegionPart === part.name }/> 
    });
    const cssSelectedClass = this.props.isClicked ? "selected-region" : "";
    
    return (
      <div>
        <div className={`region ${cssSelectedClass}`} id={this.props.region.name} onClick={this.handleClick}>
          {this.props.region.name}
        </div>
        {this.props.isClicked && <div>{subregions}</div>}
      </div>
    );
  }
}

export default Region;