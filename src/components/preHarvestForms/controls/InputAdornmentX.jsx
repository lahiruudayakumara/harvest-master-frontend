import React from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";

const InputAdornmentX = ({
  required,
  disabled,
  inputProps,
  name,
  type,
  label,
  value,
  onChange,
  style,
  endAdornment,
}) => {
  return (
    <TextField
      required={required}
      disabled={disabled}
      inputProps={inputProps}
      variant="outlined"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      style={style}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {endAdornment && <Typography>{endAdornment}</Typography>}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputAdornmentX;
