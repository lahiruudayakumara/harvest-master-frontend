import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
      <Autocomplete
        disablePortal
        id="district-search"
        options={districtOptions}
        sx={{
          width: 150,
          backgroundColor: "white",
          "& .MuiAutocomplete-inputRoot": {
            borderRadius: 0,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          },
          "& .MuiAutocomplete-input": {
            border: "none",
          },
          "& .MuiAutocomplete-option": {
            backgroundColor: "lightgray",
            '&[aria-selected="true"]': {
              backgroundColor: "gray",
            },
          },
        }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="District" />}
        onChange={(event, value) =>
          setSearchCriteria({ ...searchCriteria, district: value })
        }
      />
      <Autocomplete
        disablePortal
        id="crop-season-search"
        options={cropSeasonOptions}
        sx={{
          width: 150,
          backgroundColor: "white",
          "& .MuiAutocomplete-inputRoot": {
            borderRadius: 0,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          },
          "& .MuiAutocomplete-input": {
            border: "none",
          },
          "& .MuiAutocomplete-option": {
            backgroundColor: "lightgray",
            '&[aria-selected="true"]': {
              backgroundColor: "gray",
            },
          },
        }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Crop Season" />}
        onChange={(event, value) =>
          setSearchCriteria({ ...searchCriteria, cropSeason: value })
        }
      />
      <Autocomplete
        disablePortal
        id="variety-search"
        options={varietyOptions}
        sx={{
          width: 150,
          backgroundColor: "white",
          "& .MuiAutocomplete-inputRoot": {
            borderRadius: 0,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          },
          "& .MuiAutocomplete-input": {
            border: "none",
          },
          "& .MuiAutocomplete-option": {
            backgroundColor: "lightgray",
            '&[aria-selected="true"]': {
              backgroundColor: "gray",
            },
          },
        }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Variety" />}
        onChange={(event, value) =>
          setSearchCriteria({ ...searchCriteria, variety: value })
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

// Sample options for autocomplete
const districtOptions = [
  { label: "Ampara" },
  { label: "Anuradhapura" },
  { label: "Badulla" },
  { label: "Batticaloa" },
  { label: "Colombo" },
  { label: "Galle" },
  { label: "Gampaha" },
  { label: "Hambantota" },
  { label: "Jaffna" },
  { label: "Kalutara" },
  { label: "Kandy" },
  { label: "Kegalle" },
  { label: "Kilinochchi" },
  { label: "Kurunegala" },
  { label: "Mannar" },
  { label: "Matale" },
  { label: "Matara" },
  { label: "Moneragala" },
  { label: "Mullaitivu" },
  { label: "Nuwara Eliya" },
  { label: "Polonnaruwa" },
  { label: "Puttalam" },
  { label: "Ratnapura" },
  { label: "Trincomalee" },
  { label: "Vavuniya" },
];

const cropSeasonOptions = [
  { label: "Yala" },
  { label: "Meda" },
  { label: "Maha" },
];

const varietyOptions = [
  { label: "Sudu Heeneti" },
  { label: "Dahanala" },
  { label: "Dik Wee" },
  { label: "Goda Heeneti" },
  { label: "Gonabaru" },
  { label: "Kalu Heeneti" },
  { label: "Ma Wee" },
  { label: "Madathawalu" },
  { label: "Masuran" },
  { label: "Pachchaperumal" },
  { label: "Pokkali" },
  { label: "Rath Suwandal" },
  { label: "Pachchaperumal Red" },
  { label: "Suwadel White" },
  { label: "Suduru Samba" },
  { label: "Kahawanu" },
  { label: "Sinna Vellai" },
  { label: "Batapolaal" },
];
