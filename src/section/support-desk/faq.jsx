import { Grid, Typography, Box} from '@mui/material'
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
    <><Box
    style={{ width: "80%", marginTop: "25px", marginBottom: "25px" }}
  >
    
    <Grid container spacing={2} p={10}>


    {faq && faq.map((data) => (
  <Grid item xs={6} key={data.id || data.topic}>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography mb={2.5}>{data.topic}</Typography>
        <Typography mb={1}>{data.topic}</Typography>
        <Typography mb={2}>{data.topic}</Typography>
      </Grid>
     
    </Grid>
  </Grid>
))}

    </Grid>
  </Box></>
  )
}

export default Faq
