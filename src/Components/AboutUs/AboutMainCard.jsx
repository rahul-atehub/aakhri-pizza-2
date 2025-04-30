import React from "react";
import PropTypes from "prop-types";

const AboutMainCard = ({ title, description }) => {
  return (
    <div className="w-full max-w-[900px] border border-gray-300 rounded-lg overflow-hidden shadow-md m-5 cursor-pointer">
      <img
        src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?cs=srgb&dl=pexels-narda-yescas-724842-1566837.jpg&fm=jpg"
        alt="Aakhri Pizza"
        className="w-full object-cover h-48 sm:h-56 md:h-64"
      />
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xl font-bold text-orange-900">{title}</h2>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

AboutMainCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default AboutMainCard; 