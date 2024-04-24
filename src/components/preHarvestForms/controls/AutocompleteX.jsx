import React from "react";
import { TextField, Autocomplete } from "@mui/material";

const AutocompleteX = (props) => {
  const {
    required,
    disabled,
    readOnly,
    name,
    type,
    label,
    value,
    onChange,
    options,
    getOptionLabel,
    isOptionEqualToValue,
    style,
    error = false,
    helperText,
  } = props;

  return (
    <>
      <Autocomplete
        disabled={disabled}
        readOnly={readOnly}
        name={name}
        type={type}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            required={required}
            {...params}
            variant="outlined"
            label={label}
            {...(error && { error: true, helperText: helperText })}
          />
        )}
        style={style}
      />
    </>
  );
};

export default AutocompleteX;
