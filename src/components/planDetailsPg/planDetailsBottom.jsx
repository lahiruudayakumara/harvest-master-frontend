import "./planDetailsBottom.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const PlanDetailsBottom = () => {
  return (
    <div className="plan-details-bottom-parent">
      <div className="plan-details-bottom-container">
        <div className="plan-details-bottom-title">
          <h2>INQUIRY SECTION</h2>
        </div>
        <div className="plan-details-bottom-buttons">
          <div
            className="inquryButton"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/inquiries-Add"
              variant="contained"
              size="large"
              sx={{
                margin: "0 15px",
                backgroundColor: "#ffab00",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#e39e00",
                  color: "white",
                },
              }}
            >
              ADD INQUIRY
            </Button>
          </div>

          <div
            className="inquryButton"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/inquiries-View"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ffab00",
                margin: "0 15px",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#e39e00",
                  color: "white",
                },
              }}
            >
              MY INQUIRIES
            </Button>
          </div>
        </div>
        <div className="Textpara">
          <p>
            In the pre-harvest phase, monitoring paddy health is crucial. Submit
            your inquiries regarding paddy health issues, pest control, and
            disease management to receive expert guidance and ensure a healthy
            yield. Our system allows you to add new inquiries and review your
            previous ones for comprehensive support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsBottom;
