import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onButtonClick, isClicked, id, name }) => {
  const handleClick = e => onButtonClick(e.target.id);
  const cssClass = isClicked ? "clicked-btn" : "";

  return (
    <div className={`weather-button ${cssClass}`} id={id} onClick={handleClick}>
      {name}
    </div>
  );
}
Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Button;
