import React from 'react';

const Button = props => {
  const handleClick = e => props.onWindSelection(e.target.id);
  const regex = /_/gi;
  return (
    <div className="wind-button" id={props.windType} style={{backgroundColor: props.highlightColor}} onClick={handleClick}>
      {props.windType.replace(regex, " ")}
    </div>
  );
}

export default Button;
