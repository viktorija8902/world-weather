import React from 'react';

const Button = ({windType, highlightColor, onWindSelection}) => {
  const handleClick = e => onWindSelection(e.target.id);
  const regex = /_/gi;

  return (
    <div className="wind-button" id={windType} style={{backgroundColor: highlightColor}} onClick={handleClick}>
      {windType.replace(regex, " ")}
    </div>
  );
}

export default Button;
