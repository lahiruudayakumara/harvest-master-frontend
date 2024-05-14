import React from "react";
import { TopImage } from "../../components/top-section-image";
import {
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Public as WebIcon,
} from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutPage = () => {
  const services = [
    {
      name: <h1>Pre-harvest Planning</h1>,
      imageSrc: "src/assets/about us/preharvest.jpg",
      description: "Enhance your harvest yield with meticulous planning strategies tailored to your crop's specific needs. From scheduling planting times to optimizing soil health, our pre-harvest planning service ensures your crops are primed for a successful harvest season.",
    },
    {
      name: <h1>Post-harvest Planning</h1>,
      imageSrc: "src/assets/about us/postharvest.jpg",
      description: "Maximize the value of your harvest with our comprehensive post-harvest planning service. We provide expert guidance on storage, handling, and processing techniques to preserve freshness and quality, ensuring your produce reaches market in optimal condition.",
    },
    {
      name: <h1>Paddy Health Management</h1>,
      imageSrc: "src/assets/about us/paddyhealth.jpg",
      description: "Safeguard the health of your paddy crops with our proactive management solutions. Our integrated approach addresses common threats such as pests, diseases, and nutrient deficiencies, promoting robust growth and high yields.",
    },
    {
      name: <h1>Logistic Management</h1>,
      imageSrc: "src/assets/about us/logistic.jpg",
      description: "Streamline your supply chain operations with our tailored logistic management services. From inventory tracking to transportation optimization, we optimize every aspect of your logistics process to minimize costs and maximize efficiency.",
    },
    {
      name: <h1>Community Market</h1>,
      imageSrc: "src/assets/about us/communitymarket.jpg",
      description: "Cultivate thriving local markets with our community market services. We facilitate connections between growers, consumers, and local businesses, fostering sustainable economic growth and vibrant community engagement.",
    },
    {
      name: <h1>Weather Forecasting</h1>,
      imageSrc: "src/assets/about us/weatherforecasting.jpg",
      description: "Stay ahead of the curve with our advanced weather forecasting service. Utilizing state-of-the-art technology and expert analysis, we deliver accurate forecasts tailored to your agricultural operations, enabling informed decision-making and risk mitigation strategies.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // enable autoplay
    autoplaySpeed: 3000, // set autoplay speed to 5 seconds
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", position: 'relative' }}>
      <TopImage classname="community_stock" title2="ABOUT US" />
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="src\assets\about us\aboutus.png"
            alt="About Us"
            style={{ maxWidth: "50%", height: "auto", display: "block" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 1 }}>
            <Typography variant="body1" paragraph>
              <h3>Welcome to Harvest Master - your premier paddy harvest
                management system! With our suite of intuitive tools, we simplify every aspect
                of your harvest process, from crop monitoring to yield forecasting. Designed for
                efficiency and precision, Harvest Master empowers you to optimize your harvest yield
                and quality effortlessly. Join us in revolutionizing the way you manage your paddy harvest,
                and let Harvest Master be your trusted partner in achieving a bountiful harvest and a prosperous future.</h3>
            </Typography>

            <Typography variant="h6" gutterBottom>
              Our Mission:
            </Typography>
            <Box sx={{ bgcolor: 'green', p: 2, mb: 2 }}>
              <Typography variant="body1" color="white">
                To revolutionize paddy harvest management by providing innovative
                solutions that optimize efficiency, enhance yield quality, and empower
                farmers to achieve sustainable success. We are committed to leveraging cutting-edge
                technology and industry expertise to simplify the harvest process, mitigate risks, and
                maximize profitability for every stakeholder in the agricultural value chain.
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
              Our Vision:
            </Typography>
            <Box sx={{ bgcolor: 'green', p: 2, mb: 2 }}>
              <Typography variant="body1" color="white">
                Our vision is to be the global leader in paddy harvest
                management solutions, recognized for our commitment to excellence,
                sustainability, and customer satisfaction. We strive to create a future
                where every farmer has access to advanced tools and resources that enable them
                to optimize their harvest operations, increase resilience against environmental
                challenges, and contribute to food security and economic prosperity worldwide.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '80%' }}> {/* Adjust the width as needed */}
              <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
                Our Services
              </Typography>

              <Slider {...settings}>
                {services.map((service, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={service.imageSrc} alt={service.name} style={{ maxWidth: '40%', height: 'auto', margin: 'auto', marginBottom: '10px' }} />
                    <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '5px' }}>{service.name}</Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>{service.description}</Typography>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
              {/* Contact Information */}
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Contact Us
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton color="primary">
                    <PhoneIcon />
                  </IconButton>
                  <a href="tel:+0761234567" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography><h3>Phone: 076 123 4567</h3> </Typography>
                  </a>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton color="primary">
                    <EmailIcon />
                  </IconButton>
                  <a href="mailto:info@harvestmaster.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography ><h3>Email: info@harvestmaster.com</h3></Typography>
                  </a>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton color="primary">
                    <LocationIcon />
                  </IconButton>
                  <Typography><h3>Address: 123 Main Street, Colombo, Sri Lanka</h3></Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="primary">
                    <WebIcon />
                  </IconButton>
                  <Typography><h3>Website: www.harvestmaster.com</h3></Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutPage;