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
    return (
      <div className="wind-button" id={this.props.windType} onClick={this.handleClick}>
        {this.props.windType}
      </div>
    );
  }
}

export default Button;
