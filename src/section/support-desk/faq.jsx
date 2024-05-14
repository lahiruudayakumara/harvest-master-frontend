import { Grid, Typography, Box, Card, CardContent} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFaqRequests } from 'src/api/supportApi'

const Faq = () => {

  const [faq,setFaq] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFaqRequests(); // Await asynchronous response
        console.log('Response data:', response); // Check the data
        setFaq(response); // Set state with fetched data
      } catch (error) {
        console.error('Error fetching FAQ:', error); // Handle errors
      }
    };

    fetchData(); // Trigger data fetching once on component mount
  }, []); // Empty dependency array to avoid infinite loops

  console.log('FAQ:', faq); // Check if state has expected data


  return (
    <>
      <Box style={{ width: "93%", marginTop: "25px", marginBottom: "25px" }}>
        <Typography variant="h5" ml={10}mt={5}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={8} p={10}>
          
          {faq &&
            faq.map((data) => (
              <Grid item xs={6} key={data.id || data.topic}>
                <Grid container direction="column" spacing={2}>
                  <Card
                    elevation={10}
                    sx={{
                      minWidth: 275,
                      outline: 2,
                      outlineColor: "#008000",
                      p: 2,
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6" mb={2.5}>
                            {data.topic}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1" mb={1}>
                            {data.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1" mb={2}>
                            {data.solution}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default Faq
