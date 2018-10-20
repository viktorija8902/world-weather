import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.onWindSelection(e.target.id);
  }
  
  render() {
    const regex = /_/gi;
    return (
      <div className="wind-button" id={this.props.windType} style={{backgroundColor: this.props.highlightColor}} onClick={this.handleClick}>
        {this.props.windType.replace(regex, " ")}
      </div>
    );
  }
}

export default Button;
