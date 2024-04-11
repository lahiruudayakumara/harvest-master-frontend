import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const BidGraph = ({ data, width, height, xAxisName, seriesName }) => {

  const xAxisData = data.map((item) => item.creationDate[2]);//local date is fetched as an array
  const seriesData = data.map((item) => item.price);

  console.log(seriesData);
  console.log(xAxisData);

  const valueFormatter = (value) => `Rs.${value}`;

  return (
    <LineChart
      xAxis={[
        {
          data: xAxisData,
          name: "test",
          min: 1,
          max: 31,
        },
      ]}
      series={[
        {
          data: seriesData,
          name: seriesName,
          min: 0,
          max: 1000,
        },
      ]}
      width={width}
      height={height}
    ></LineChart>
  );
};

export default BidGraph;
