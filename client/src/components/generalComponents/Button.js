import React from 'react';


const Button = props => {
  const handleClick = e => props.onButtonClick(e.target.id);
  
  let cssClass = "";
  if (props.isClicked) {
    cssClass = "clicked-btn";
  }

  return (
    <div className={`weather-button ${cssClass}`} id={props.id} style={{backgroundColor: props.highlightColor}} onClick={handleClick}>
      {props.name}
    </div>
  );
}

export default Button;
