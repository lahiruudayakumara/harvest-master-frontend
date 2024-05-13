import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRequests,

  selectsupport,
} from "src/stores/slices/supportDeskSlice";
import SupportForm from "./support-desk-form";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Faq from "./faq";
import { TopImage } from "src/components/top-section-image";
import { Link } from "react-router-dom";
import {
  BookmarkAdded,
  EventAvailable,
  EventRepeat,
} from "@mui/icons-material";
import ListItem from "src/components/supportDesk/list-item";
import { getSupportRequests } from "src/api/supportApi";

const SupportSolutionsView = () => {

  const dispatch = useDispatch();
   
  
  



  useEffect(() => {

    // Fetch the requests from the database
    const fetchRequests = async () => {
      const response = await getSupportRequests();
     
      dispatch(setRequests(response));
      console.log(response);
    };

    fetchRequests();


  }, []);
  
  const  {requests}  = useSelector(selectsupport);

  console.log(requests);


  const solutionRef = useRef(null);
  const solution2Ref = useRef(null);
  const solution3Ref = useRef(null);

  // Function to handle scrolling to the specified component
  const scrollToComponent = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const theme = createTheme({
    palette: {
      primary: {
        main: "#4caf50", // Green color
      },
      secondary: {
        main: "#ff4081", // Secondary color
      },
    },
    typography: {
      fontWeightRegular: 550, // Set the fontWeight for bold text
    },
  });

   const list = createTheme({
     palette: {
       primary: {
         main: "#000000",
       },
       secondary: {
         main: "#F6C034",
       },
     },
     components: {
       MuiButton: {
         styleOverrides: {
           root: {
             color: "white", // Set the text color for buttons
             backgroundColor: "#2CA019", // Set the background color for buttons
             "&:hover": {
               backgroundColor: "#0F601F", // Change background color on hover
             },
           },
         },
       },
       MuiIconButton: {
         styleOverrides: {
           root: {
             color: "#2CA019", // Set the color for icons 
             "&:hover": {
               color: "#0F601F", // Change color on hover
             },
           },
         },
       },
     },
   });
  return (
    <>
      <TopImage
        classname="support_desk"
        title1=" "
        title2=" Find Your Requests Here."
      >
        <Box display="flex" gap={2}>
          <Link to="/supportdesk">
            <Button
              variant="contained"
              size="large"
              sx={{ fontSize: "20px", fontWeight: "600" }}
            >
              FIND SOLUTIONS
            </Button>
          </Link>
        </Box>
      </TopImage>
      <ThemeProvider theme={theme}>
        <Box display="flex" width={"100%"} justifyContent={"center"} gap={18}>
          <Button onClick={() => scrollToComponent(solutionRef)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <EventRepeat color="primary" sx={{ fontSize: 80 }} />
              <Typography variant="h5" color="primary">
                Pending Requests
              </Typography>
            </Box>
          </Button>
          <Button onClick={() => scrollToComponent(solution2Ref)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <EventAvailable color="primary" sx={{ fontSize: 80 }} />
              <Typography variant="h5" color="primary">
                Answered Requests
              </Typography>
            </Box>
          </Button>
          <Button onClick={() => scrollToComponent(solution3Ref)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <BookmarkAdded color="primary" sx={{ fontSize: 80 }} />
              <Typography variant="h5" color="primary">
                Closed Requests
              </Typography>
            </Box>
          </Button>
        </Box>
      </ThemeProvider>

      <ThemeProvider theme={list}>
        <Box
          display="flex"
          marginTop={24}
          marginBottom={20}
          flexDirection="column"
          alignItems="center"
          minHeight="100vh"
          gap={8}
        >

<Box
            width={"90%"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            ref={solutionRef}
            paddingTop={8}
          >
            <Typography
              variant="h4"
              color="primary"
              width={"100%"}
              textAlign={"left"}
              marginBottom={7}
            >
              Pending Requests
            </Typography>

            {
              // Map through the redux store requests and render the ListItem component
              requests &&
                requests.map((request) =>request.status === "Pending"&& (
                  <ListItem
                    topic={request.topic}
                    description={request.issue}
                   
                    id={request.r_Id}
                  />
                ))
            }
          </Box>
          <Box
            width={"90%"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            ref={solution2Ref}
            paddingTop={8}
          >
            <Typography
              variant="h4"
              color="primary"
              width={"100%"}
              textAlign={"left"}
              marginBottom={7}
            >
              Answered Requests
            </Typography>

            {
              // Map through the redux store requests and render the ListItem component
              requests &&
                requests.map((request) =>request.status === "Answered"&& (
                  <ListItem
                    topic={request.topic}
                    description={request.issue}
                    solution={request.solution}
                    id={request.r_Id}
                  />
                ))
            }
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SupportSolutionsView;