//import React from "react";
import "./homeUpperPart.css";
import homeUpperImage from "../../assets/images/backgrounds/homeTopBackgroundImage.png";
import homeUpperImageBottomCover from "../../assets/images/backgrounds/homeTopBackgroundImageBottomCover.png";

const HomeUpperPart = () => {
  return (
    <div className="home-upper-parent">
      <div className="home-upper-image">
        <img src={homeUpperImage} alt="home-top" />
      </div>
      <div className="home-upper-image-text">
        <div className="home-upper-text-1">
          <h4>Empowering Farmers for a Sustainable Future</h4>
        </div>
        <div className="home-upper-text-2">
          <h1>HARVEST MASTER</h1>
        </div>
        <div className="home-upper-text-3">
          <h3>HARVESTING HOPE, MINIMIZE WASTE</h3>
        </div>
      </div>
      <div className="home-upper-image-bottom-cover">
        <img src={homeUpperImageBottomCover} alt="home-top-bottom-cover" />
      </div>
    </div>
  );
};

export default HomeUpperPart;
