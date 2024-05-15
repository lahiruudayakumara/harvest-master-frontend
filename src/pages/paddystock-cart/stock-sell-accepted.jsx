import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { DeleteOutlineRounded } from "@mui/icons-material";

export default function StockSellAccepted(props) {
  const theme = useTheme();

  console.log(props.data.paddyStockViewDTO);
  return (
    <Card sx={{ display: "flex", height: 250, gap: 5 }} elevation={8}>
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={`data:image/jpeg;base64, ${props.data.releventpaddyStock.image}`}
        alt="test image"
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Rice Vareity
            </Typography>
            <Typography component="div" sx={{ fontSize: 18 }}>
              {props.data.releventpaddyStock.riceVareity}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Bid Price
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Rs . {props.data.acceptedbid.price}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Amount
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {props.data.releventpaddyStock.amount} KG
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Total Amount
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
            Rs .  {props.data.acceptedbid.price *
                props.data.releventpaddyStock.amount}
            </Typography>
          </Box>
        </CardContent>{" "}
        <Box sx={{ display: "flex", p: 10 }} mb={10}>
          <DeleteOutlineRounded
            sx={{ color: "#008000" }}
          ></DeleteOutlineRounded>
        </Box>
      </Box>
    </Card>
  );
}
