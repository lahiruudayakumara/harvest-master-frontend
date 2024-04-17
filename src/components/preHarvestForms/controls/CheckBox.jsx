import React from "react";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";

const CheckBoxX = (props) => {
  const { required, name, label, value, onChange, style } = props;
  return (
    <div>
      <FormControl>
        <FormControlLabel
          sx={style}
          control={
            <Checkbox
              required={required}
              name={name}
              size="small"
              sx={{
                color: "green",
                "&.Mui-checked": {
                  color: "green",
                },
              }}
              checked={value}
              onChange={onChange}
            />
          }
          label={label}
        />
      </FormControl>
    </div>
  );
};

export default CheckBoxX;
