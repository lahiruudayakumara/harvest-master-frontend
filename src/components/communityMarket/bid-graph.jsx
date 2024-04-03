import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const BidGraph = ({ data, width, height, xAxisName, seriesName }) => {
  function extractDateIntegers(dateString) {
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    return day;
  }
  const xAxisData = data.map((item) => extractDateIntegers(item.creationDate));
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
