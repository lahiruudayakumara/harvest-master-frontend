/* eslint-disable react/prop-types */
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
            <h1>{numberOfFields}</h1>
            <h2>FIELDS</h2>
          </div>
          <div className="myPlansMiddlePartChildBox">
            <h1>{numberOfDistricts}</h1>
            <h2>DISTRICTS</h2>
          </div>
        </div>
        <div className="myPlansMiddlePartParentBoxup">
          <div className="myPlansMiddlePartChildBox">
            <h1>{totalArea}</h1>
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
