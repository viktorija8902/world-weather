import React from 'react';

const Button = ({onButtonClick, isClicked, id, name, highlightColor}) => {
  const handleClick = e => onButtonClick(e.target.id);
  const cssClass = isClicked ? "clicked-btn" : "";

  return (
    <div className={`weather-button ${cssClass}`} id={id} style={{backgroundColor: highlightColor}} onClick={handleClick}>
      {name}
    </div>
  );
}

export default Button;
