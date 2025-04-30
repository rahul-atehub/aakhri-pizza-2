import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import AboutMainCard from "./Components/AboutUs/AboutMainCard.jsx";

// Card Component
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

const AboutUs = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    
  const handleMouseEnter = useCallback((index) => {
    setHoveredCardIndex(index);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredCardIndex(null);
  }, []);
  
  // Card Data
  const aboutCardData = [
    {
      id: 1,
      title: "Our Journey",
      description: "From humble beginnings to becoming the city's favorite pizza spot, our journey has been filled with passion, dedication, and lots of cheese. We started with a simple goal: create authentic pizzas that bring people together."
    },
    {
      id: 2,
      title: "Quality Ingredients",
      description: "We believe great pizza starts with the finest ingredients. Our tomatoes are vine-ripened, our cheese is locally sourced, and our dough is freshly made daily. We never compromise on quality because you deserve the best."
    },
    {
      id: 3,
      title: "Community Involvement",
      description: "We're more than just a pizza place - we're part of the community. Through local events, charity drives, and school sponsorships, we strive to give back to the neighborhood that has supported us from day one."
    }
  ];
  
  const mainCardContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nissi ut
    aliquip ex ea commodo consequat.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`;
  
  return (
    <div className="flex flex-col items-center mt-20 px-4">
      <AboutMainCard 
        title="About Aakhri Pizza" 
        description={mainCardContent} 
      />
      
      <div className="flex flex-wrap justify-center gap-6 mt-10 mb-10">
        {aboutCardData.map((card, index) => (
          <Card 
            key={card.id}
            title={card.title}
            description={card.description}
            isHovered={hoveredCardIndex === index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
