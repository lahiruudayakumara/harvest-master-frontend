import React from "react";
import { TextField } from "@mui/material";

const InputX = (props) => {
  const {
    required,
    placeholder,
    disabled,
    multiline,
    inputProps,
    type,
    name,
    label,
    value,
    onChange,
    style,
    error = false,
    helperText,
  } = props;
  return (
    <>
      <TextField
        required={required}
        disabled={disabled}
        multiline={multiline}
        placeholder={placeholder}
        inputProps={inputProps}
        varient="outlined"
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        style={style}
        {...(error && { error: true, helperText: helperText })}
      />
    </>
  );
};

export default InputX;
