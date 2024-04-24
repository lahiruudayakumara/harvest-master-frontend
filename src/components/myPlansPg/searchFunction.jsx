import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControls from "../preHarvestForms/controls/FormControls";

const PlanSearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    district: "",
    cropSeason: "",
    variety: "",
  });

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 0,
        justifyContent: "center",
        padding: "10px",
        zIndex: 2,
      }}
    >
      <FormControls.InputX
        placeholder="Filter Pre-Harvest Plans by District, City, Rice-Vareity or Crop-Season"
        value={searchCriteria.district}
        style={{ width: 540, backgroundColor: "white" }}
        onChange={(e) =>
          setSearchCriteria({ ...searchCriteria, district: e.target.value })
        }
      />

      <Button
        variant="contained"
        sx={{
          "& .Button": {
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          },
          backgroundColor: "#ffab00",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#e39e00",
            color: "white",
          },
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default PlanSearchForm;
