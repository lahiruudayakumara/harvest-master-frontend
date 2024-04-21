import { Box, Grid, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BasicBars from "./bar-chart";
import Report from "./report";

const AccountViewBox = ({ inventory, pending }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container marginTop={1} spacing={2}>

        <Grid item xs={12} md={8}>
          <BasicBars series={[{ color: '#fdb462' }]} />
        </Grid>

        <Grid item xs={12} md={2}>
          <Box padding={2} boxShadow={2} borderRadius={2}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#07bc0c",
              }}
            >
              <AccessTimeIcon fontSize="medium" />
              <Typography
                variant="h6"
                style={{
                  marginLeft: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Pending Orders
              </Typography>
            </div>
            <Typography
              variant="h6"
              marginY={2}
              style={{ color: "#FFAB00", fontWeight: "bold", fontSize: "18px" }}
            >
              {pending}
            </Typography>
            <Typography variant="h6" style={{ fontSize: "12px" }}>
              This Month
            </Typography>

          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box padding={2} boxShadow={2} borderRadius={2}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#07bc0c",
              }}
            >
              <StorefrontIcon fontSize="medium" />
              <Typography
                variant="h6"
                style={{
                  marginLeft: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Available Stocks
              </Typography>
            </div>
            <Typography
              variant="h6"
              marginY={2}
              style={{ color: "#FFAB00", fontWeight: "bold", fontSize: "18px" }}
            >
              {inventory}
            </Typography>
            <Typography variant="h6" style={{ fontSize: "12px" }}>
              This Month
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Report />
        </Grid>

      </Grid>
    </Box>
  );
};

export default AccountViewBox;
