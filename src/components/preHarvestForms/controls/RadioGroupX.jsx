import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const RadioGroupX = (props) => {
  const { required, label, type, name, value, onChange, items, style } = props;
  return (
    <div>
      <FormControl style={style}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          row
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        >
          {items.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.id}
              control={<Radio size="small" required={required} />}
              label={item.title}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioGroupX;
