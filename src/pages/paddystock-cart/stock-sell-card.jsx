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
import { Button } from "@mui/material";
import { rejectBid } from "src/api/postHarvestApi";

export default function StockSell(props) {
    const theme = useTheme();
    
  
  
  
  
  

  
  
  
  const deleteBid = async () => { 


    console.log("delete bid",props.data.bidId);
    const response = await rejectBid(props.data.bidid);
    if (response.status === 200) {
      alert("Bid Deleted Successfully")
      window.location.reload();
    }




  };
  
  
  console.log(props.data.paddyStockViewDTO);
  return (
    <Card
      sx={{
        display: "flex",
        height: 250,
        gap: 5,
        filter:
          props.data.paddyStockViewDTO.status == "CLOSED"
            ? "grayscale(100%)"
            : "none", // Conditionally apply grayscale filter
      }}
      elevation={8}
    >
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={`data:image/jpeg;base64, ${props.data.paddyStockViewDTO.image}`}
        alt="test image"
      />

      <Box sx={{ display: "flex", flexDirection: "column",ml:5 }}>
        <CardContent sx={{ flex: "1 0 auto", display:"flex",gap:8,mt:2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1}}>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Rice Vareity
            </Typography>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Starting Price
            </Typography>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Amount
            </Typography>
            <Typography component="div" sx={{ fontSize: 18, fontWeight: 550 }}>
              Bid Amount
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="div" sx={{ fontSize: 18 }}>
              {props.data.paddyStockViewDTO.riceVareity}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Rs . {props.data.paddyStockViewDTO.price}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {props.data.paddyStockViewDTO.amount} KG
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {props.data.price}
            </Typography>
          </Box>

          
        </CardContent>{" "}
        <Button variant="contained" onClick={deleteBid} sx={{ml:2,mb:3,backgroundColor:"#008000",width:100,"&:hover": {
      backgroundColor: "darkgreen", // Change to your desired color
    },}}>delete</Button>
      </Box>
    </Card>
  );
}
