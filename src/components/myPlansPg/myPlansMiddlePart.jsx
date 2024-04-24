/* eslint-disable react/prop-types */
import CountUp from "../util/counter";
import "./myPlansMiddlePart.css";

const MyPlansMiddlePart = ({
  totalArea,
  numberOfDistricts,
  numberOfFields,
  numberOfVarieties,
}) => {
  return (
    <div className="myPlansMiddlePartParent">
      <div className="myPlansMiddlePartParentBox">
        <div className="myPlansMiddlePartParentBoxup">
          <div className="myPlansMiddlePartChildBox">
            <h1>
              <CountUp start={0} end={numberOfFields} duration={3000} />
            </h1>
            <h2>FIELDS</h2>
          </div>
          <div className="myPlansMiddlePartChildBox">
            <h1>{numberOfDistricts}</h1>
            <h2>DISTRICTS</h2>
          </div>
        </div>
        <div className="myPlansMiddlePartParentBoxup">
          <div className="myPlansMiddlePartChildBox">
            <h1>
              <CountUp start={0} end={totalArea} duration={3000} />
            </h1>
            <h2>ACRES</h2>
          </div>
          <div className="myPlansMiddlePartChildBox">
            <h1>{numberOfVarieties}</h1>
            <h2>VARIETIES</h2>
          </div>
        </div>
      </div>
      {/* <div className="myPlansMiddlePartParentBoxtest"></div> */}
    </div>
  );
};

export default MyPlansMiddlePart;
