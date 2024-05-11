import React from "react";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  Box,
  ButtonBase,
} from "@mui/material";
import {
  ShoppingCart,
  ShoppingCartOutlined,
  ShoppingCartRounded,
  StorefrontRounded,
  TableChartRounded,
  TabletMacRounded,
} from "@mui/icons-material";
import ArcDesign from "./gaugemeter";

const ProfilePage = () => {


const settings = {
  width: 150,
  height: 150,
  value: 60,
};

  return (
    <Container
      maxWidth="auto"
      sx={{
        marginTop: 12,
        height: "82vh",
        marginBottom: 20,
        width: "100vw",
        ml: 1,
      }}
    >
      <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
        {/* Profile column */}
        <Grid item xs={12} md={3} sx={{ height: "100%" }}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  alt="User Avatar"
                  src="/path/to/avatar.jpg"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">John Doe</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1">Web Developer</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2">john.doe@example.com</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 15,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ height: 40 }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Papers column */}
        <Grid item xs={12} md={4.5} sx={{ height: "100%" }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={6} height={"35%"}>
              <Paper elevation={3} sx={{ height: "100%", p: 2 }}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ArcDesign {...settings} />
                </Box>
                <Box>
                  <Typography align="center" mt={2} fontSize={14}>
                    Paper 2
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6} height={"35%"}>
              <Paper elevation={3} sx={{ height: "100%", p: 2 }}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ArcDesign {...settings} />
                </Box>
                <Box>
                  <Typography align="center" mt={2} fontSize={14}>
                    Paper 2
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} height={"60%"}mt={3.5}>
              <Paper elevation={3} sx={{ padding: 2, height: "105%" }}>
                <Typography variant="h5" mb={6}>
                  Request Support
                </Typography>
                <Typography fontSize={16}>
                  our team is here to guide you every step of the way. From
                  troubleshooting technical issues to offering expert advice on
                  crop management, we're committed to ensuring your success in
                  the agricultural sector. Let us be your partner in cultivating
                  a thriving future for your paddy cultivation.Explore our
                  sophisticated support tools and resources to get the help you
                  need.
                </Typography>
                <Button variant="contained" sx={{ mt: 6 }}>
                  Get Support
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* Additional column */}
        <Grid item xs={12} md={4.5} sx={{ height: "100%" }}>
          <Paper elevation={3} sx={{ height: "103%", pl: 2, pr: 2, pt: 2 }}>
            <Typography variant="h5" mt={2}>
              Quick Access{" "}
            </Typography>
            <Typography variant="h6" mt={2}>
              Navigate To Your Prefered Pages With Ease{" "}
            </Typography>
            <Grid container spacing={2} mt={19}>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, height: 120 }}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <TabletMacRounded
                      sx={{
                        fontSize: 90,
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Typography align="center" fontSize={14} mt={1}>
                    Post Harvest Plans
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, height: 120 }}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <StorefrontRounded
                      sx={{
                        fontSize: 90,
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Typography align="center" fontSize={14} mt={1}>
                    Community Market
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, height: 120 }}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <ShoppingCartRounded
                      sx={{
                        fontSize: 90,
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Typography align="center" fontSize={14} mt={1}>
                    Shopping Cart
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, height: 120 }}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <ShoppingCartRounded
                      sx={{
                        fontSize: 90,
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Typography align="center" fontSize={14} mt={1}>
                    Shopping Cart
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, height: 120 }}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <ShoppingCartRounded
                      sx={{
                        fontSize: 90,
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Typography align="center" fontSize={14} mt={1}>
                    Shopping Cart
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, height: 120 }}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <ShoppingCartRounded
                      sx={{
                        fontSize: 90,
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    />
                  </Box>
                  <Typography align="center" fontSize={14} mt={1}>
                    Shopping Cart
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
