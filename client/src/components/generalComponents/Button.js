import React, { Component } from 'react';


class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onButtonClick(e.target.id);
  }
  
  render() {
    let cssClass = "";
    if (this.props.isClicked) {
      cssClass = "clicked-btn";
    }
    return (
      <div className={`weather-button ${cssClass}`} id={this.props.id} style={{backgroundColor: this.props.highlightColor}} onClick={this.handleClick}>
        {this.props.name}
      </div>
    );
  }
}

export default Button;
