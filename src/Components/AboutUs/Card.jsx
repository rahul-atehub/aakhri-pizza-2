import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, description, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className={`w-full max-w-[300px] border border-gray-300 rounded-lg overflow-hidden shadow-md cursor-pointer ${isHovered ? 'shadow-2xl' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-orange-900 mb-3">{title}</h2>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isHovered: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

Card.defaultProps = {
  isHovered: false,
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

export default Card; 