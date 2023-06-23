import React from "react";
import "./Welcome.scss";

const Welcome = ({title, image}) => {
  return (
    <>
      <div className="welcome-container">
        <div className="title-container"> 
          <h2 className="welcome-title">
            {title}
          </h2>
        </div>
        <div className="img-container">
            <img className='img-notebook' src={image} alt="logo-notebook" />
        </div>
      </div>
    </>
  );
};

export default Welcome;
