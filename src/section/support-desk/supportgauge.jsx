import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";



export default function ArcDesign(value) {
    
    const settings = {
  width: 200,
  height: 200,
  value:value,
};
  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#52b202",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}
