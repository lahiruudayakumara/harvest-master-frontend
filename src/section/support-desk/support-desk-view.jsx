import React, { useRef } from "react";
import SupportForm from "./support-desk-form";
import { Box, Button, Paper, Typography } from "@mui/material";
import Faq from "./faq";
import { TopImage } from "src/components/top-section-image";
import { Link } from "react-router-dom";
import { BoxView } from "src/components/Hero/box-view";

const SupportDeskView = () => {

  const scrollref = useRef(null);



  const handleClick = () => { 


    if (scrollref.current) {
      // Scroll to the form component
      scrollref.current.scrollIntoView({ behavior: "smooth" });
      console.log("clicked");
    }
  };


  return (
    <>
      <TopImage
        classname="support_desk"
        title1=""
        title2=" Revolutionize Your Support Experience.
 Find Your Plans Here."
      >
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            size="large"
            sx={{ fontSize: "20px", fontWeight: "600" }}
            onClick={handleClick}
          >
            FIND SOLUTIONS
          </Button>

          <Link to="/my-requests">
            <Button
              variant="contained"
              size="large"
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                backgroundColor: "#ffab00",
              }}
              color="secondary"
            >
              MY REQUESTS
            </Button>
          </Link>
        </Box>
      </TopImage>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          width={"70vw"}
          height={300} // Increased height to match parent
          marginTop={-21}
          marginBottom={20}
          display={"flex"}
          padding={2}
          gap={13}
          alignItems="center" // Center children horizontally
          justifyContent="center" // Center children vertically
        >
          <BoxView
            className="support_b1"
            topic="Legal Support"
            content="Comprehensive legal support tailored to your needs. From consultations to representation, we've got you covered."
            button="Get Started"
            click={handleClick}
          ></BoxView>
          <BoxView
            className="support_b2"
            topic="We Are Here To Help"
            content="Get the help you need when you need it. Our dedicated support team is here to assist you with any questions or concerns."
            button="Get Started"
            click={handleClick}
          ></BoxView>
          <BoxView
            className="support_b3"
            topic="Technical Support"
            content="From troubleshooting to system upgrades, our technical support team is here to keep your technology running smoothly"
            button="Get Started"
            click={handleClick}
          ></BoxView>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        ref={scrollref}
        paddingTop={8}
      >
        <SupportForm />
        <Faq></Faq>
      </Box>
    </>
  );
};

export default SupportDeskView;