import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../components/logo";
import UseNavData from "./config-navigation";
import { useDispatch } from "react-redux";
import { navClick } from "../../stores/slices/adminNavSlice";

const NavMenu = ({ role }) => {
  const theme = useTheme();
  const [clickItem, setClickItem] = useState(0);
  const dispatch = useDispatch();

  const menuItems = UseNavData.find((item) => item.parent === role);
  return (
    <Box
      display={{ xs: "none", sm: "block" }}
      sx={{
        backgroundColor: "#2CA019",
        width: "100%",
        height: "100%",
        padding: 2,
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        [theme.breakpoints.up("md")]: {
          width: "200px",
        },
      }}
    >
      <Logo sx={{ width: "150px", height: "auto" }} />

      <List>
        {menuItems.submenu.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <ListItem
              key={index}
              button
              onClick={() => {
                setClickItem(index);
                dispatch(navClick({ displayName: item.text }));
              }}
              component={Link}
              to={item.to}
              sx={{
                "&:hover": {
                  backgroundColor: isActive
                    ? "rgba(217, 217, 217, 0.25)"
                    : "rgba(217, 217, 217, 0.25)",
                  borderRadius: "5px",
                },
                backgroundColor:
                  clickItem === index ? "rgba(217, 217, 217, 0.25)" : "",
                borderRadius: "5px",
              }}
            >
              <span style={{ color: "white", marginRight: "8px" }}>
                {item.icon && item.icon}
              </span>
              <ListItemText  color="white" />
              <Typography  sx={{ml:-2}} color={"white"}>{item.text}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default NavMenu;
