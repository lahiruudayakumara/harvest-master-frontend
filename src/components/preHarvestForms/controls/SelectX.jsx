import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectX = (props) => {
  const {
    name,
    label,
    value,
    error = false,
    helperText,
    onChange,
    options,
    style,
  } = props;
  return (
    <div>
      <FormControl variant="outlined" style={style}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          {...(error && { error: true, helperText: helperText })}
        >
          {options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectX;
