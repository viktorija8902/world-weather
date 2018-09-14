import React, { Component } from 'react';

class RegionPart extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onRegionPartClick(e.target.id)
  }

  render() {
    const cssSelectedClass = this.props.isClicked ? "selected-region-part" : "";
    return (
      <div className={`region-part ${cssSelectedClass}`} id={this.props.regionPart.name} onClick={this.handleClick}>
        {this.props.regionPart.name}
      </div>
    );
  }
}

export default RegionPart;