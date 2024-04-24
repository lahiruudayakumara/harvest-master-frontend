import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteFaq, getFaqRequests, getSupportRequests } from '../../api/supportApi'
import PopupDialogSupport from './soluution-popup'
import PopupDialogFaqUpdate from './faq-update-form'

const FaqView = () => {

const [faq,setFaq] = useState([""])

useEffect(()=>{


    getFaqRequests().then((faq)=>{setFaq(faq)
    console.log(faq)
    })

  },[])


  const handledelete = async (faq_id) =>{




    const response = await deleteFaq(faq_id);


    if(response.status===200)
    {
        alert("successfully deleted");
    }
    else{
        alert("error occured")
    }


  }


  return (
    <>
    <TableContainer
      component={Paper}
      style={{ width: '100%', marginBottom: '10px', overflowX: 'auto' }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* Equal width for all columns */}
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '25%' }}>Topic</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '25%' }}>Description</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '25%' }}>Solution</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '25%' }}>Actions</TableCell>
            <TableCell style={{ fontWeight: 'bold', textAlign: 'center', width: '25%' }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {faq &&
            faq.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: 'center' }}>{item.topic}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{item.description}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{item.solution}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <Box display="flex" justifyContent="center">
                    <PopupDialogFaqUpdate data={item} />
                  </Box>
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <Button onClick={() => handledelete(item.faq_id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
</>
  )
}

export default FaqView;