import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

export const WeatherList = ({ key, weatherForecast }) => {

const datetimeString = weatherForecast.dt_txt;
const datetime = new Date(datetimeString);

const timeString = `${datetime
  .getHours()
  .toString()
  .padStart(2, "0")}:${datetime
  .getMinutes()
  .toString()
  .padStart(2, "0")}:${datetime.getSeconds().toString().padStart(2, "0")}`;

  return (
    <>
      {" "}
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemText>{timeString}</ListItemText>
            <ListItemAvatar>
              <Avatar src={``} />
            </ListItemAvatar>
            <ListItemText>{weatherForecast.weather[0].description}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};
