import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";



export default function ArcDesign(settings) {
  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
            fontFamily: theme.typography.fontFamily,
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
