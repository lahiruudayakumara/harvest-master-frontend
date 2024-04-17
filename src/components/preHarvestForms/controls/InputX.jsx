import React from "react";
import { TextField } from "@mui/material";

const InputX = (props) => {
  const {
    required,
    disabled,
    multiline,
    inputProps,
    type,
    name,
    label,
    value,
    onChange,
    style,
  } = props;
  return (
    <>
      <TextField
        required={required}
        disabled={disabled}
        multiline={multiline}
        inputProps={inputProps}
        varient="outlined"
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        style={style}
      />
    </>
  );
};

export default InputX;
