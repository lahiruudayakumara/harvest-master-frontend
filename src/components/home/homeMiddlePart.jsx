//import React from "react";
import "./homeMiddlePartRes.css";
// import "./homeMiddlePart.css";
// import homeMiddleRelImage from "../../assets/backgrounds/homeMiddleBackgroundRelImage.png";
import logo from "../../assets/images/logos/logo.svg";
import homeMiddleLeftUpperImage from "../../assets/images/homeMiddleImages/home-middle-left-upper.svg";
import homeMiddleRightUpperImage from "../../assets/images/homeMiddleImages/home-middle-right-upper.svg";
import homeMiddleLeftLowerImage from "../../assets/images/homeMiddleImages/home-middle-left-lower.svg";
import homeMiddleRightLowerImage from "../../assets/images/homeMiddleImages/home-middle-right-lower.svg";

const HomeMiddlePart = () => {
  return (
    <div className="home-middle-parent">
      {/* <div className="home-middle-relative-image">
        <img src={homeMiddleRelImage} alt="home-middle-rel-images" />
      </div> */}
      <div className="home-middle-upper">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="text-under-logo">
          <h3>FROM SEED TO HARVEST</h3>
          <p>THE COMPLETE GUIDE TO</p>
          <p>PADDY CULTIVATION WITH</p>
          <p>HARVEST MASTER</p>
        </div>
      </div>
      {/* <div className="vertical-line"></div> */}
      <div className="home-middle-lower">
        <div className="home-middle-lower-sb">
          <div className="home-middle-lower-sb-image-left">
            <img src={homeMiddleLeftUpperImage} alt="home-middle-left-upper" />
          </div>
          <div className="home-middle-lower-sb-text-right">
            <div className="home-middle-lower-sb-text-right-upper">
              <h3>PREPARATION OF LAND</h3>
              <p>
                Land preparation refers to the procedure of arranging the
                cultivation area, in the best possible condition for Rice
                cultivation, ensuring the land is level and hydrated matching to
                the needs and requirements of the rice seeds planted.
                Preparation is done via machineries or by water buffaloes.
              </p>
            </div>
            <div className="home-middle-lower-sb-text-right-lower">
              <h3>SELECTION OF GOOD SEEDS</h3>
              <p>
                Selecting good seeds to harvest a healthy crop is very
                important. That’s why cultivators go for pure seeds for their
                chosen rice variety, which are full and identical in size, free
                of weed seeds, and seed-borne diseases, insects and other
                matter.
              </p>
            </div>
          </div>
        </div>
        <div className="home-middle-lower-sb">
          <div className="home-middle-lower-sb-text-left">
            <div className="home-middle-lower-sb-text-left-upper">
              <h3>CROP ESTABLISHMENT</h3>
              <p>
                Crop Establishment refers to managing a series of steps that
                includes, seeding, seed germination, seedling emergence and its
                development up until its stage of maturity, with other factors
                such as soil, climatic, biotic, machinery and management
                procedures.
              </p>
            </div>
            <div className="home-middle-lower-sb-text-left-lower">
              <h3>IRRIGATION AND MANAGEMENT</h3>
              <p>
                Cultivated paddy has a higher sensitivity towards water
                shortages. They are in need of a steady supply of water, and it
                tends to immediately react by developing symptoms of water
                stress when the supply is disturbed and drop below the required
              </p>
            </div>
          </div>

          <div className="home-middle-lower-sb-image-right">
            <img
              src={homeMiddleRightUpperImage}
              alt="home-middle-right-upper"
            />
          </div>
        </div>
        <div className="home-middle-lower-sb">
          <div className="home-middle-lower-sb-image-right">
            {" "}
            <img
              src={homeMiddleRightLowerImage}
              alt="home-middle-right-lower"
            />
          </div>
          <div className="home-middle-lower-sb-text-right">
            <div className="home-middle-lower-sb-text-right-upper">
              <h3>NUTRIENT MANAGEMENT</h3>
              <p>
                Plants, like all living organisms, require different nutrients
                at different stages of growth. By maintaining flooded conditions
                in a rice field, farmers can preserve soil organic matter and
                receive natural nitrogen, enhancing crop yield without the need
                for artificial nitrogen fertilizers
              </p>
            </div>
            <div className="home-middle-lower-sb-text-right-lower">
              <h3>CROP HEALTH MANAGEMENT</h3>
              <p>
                Crop health management is crucial, as healthy crops can attract
                pests and diseases. Before resorting to pesticides, it&apos;s
                best to prevent conditions that attract harmful organisms.
                Creating an anti-ecosystem for pests and diseases can naturally
                reduce their impact on crops.
              </p>
            </div>
          </div>
        </div>
        <div className="home-middle-lower-sb">
          <div className="home-middle-lower-sb-text-left">
            <div className="home-middle-lower-sb-text-left-upper">
              <h3>CROP ESTABLISHMENT</h3>
              <p>
                Crop Establishment refers to managing a series of steps that
                includes, seeding, seed germination, seedling emergence and its
                development up until its stage of maturity, with other factors
                such as soil, climatic, biotic, machinery and management
                procedures.
              </p>
            </div>
            <div className="home-middle-lower-sb-text-left-lower">
              <h3>IRRIGATION AND MANAGEMENT</h3>
              <p>
                Cultivated paddy has a higher sensitivity towards water
                shortages. They are in need of a steady supply of water, and it
                tends to immediately react by developing symptoms of water
                stress when the supply is disturbed and drop below the required
              </p>
            </div>
          </div>
          <div className="home-middle-lower-sb-image-right">
            <img src={homeMiddleLeftLowerImage} alt="home-middle-left-lower" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMiddlePart;
