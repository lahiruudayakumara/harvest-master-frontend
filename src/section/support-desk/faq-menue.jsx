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
    <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Topic</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                  
                    <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { faq&&faq.map((req,index) => (
                    <TableRow key={index}>
                       
                        <TableCell>{req.topic}</TableCell>
                        <TableCell>{req.description}</TableCell>
                        <TableCell>{req.solution}</TableCell>
                        
                        <TableCell>
                            <Box display="flex">
                                {/* Link to add solution */}
                                {/* <Link to={/AddSolution/${issue.id}}> */}
                                   
                                        <PopupDialogFaqUpdate data={req}  />
                                    
                                {/* </Link> */}
                            </Box>
                        </TableCell>
                         
                        <TableCell>
                            <Button onClick={()=>handledelete(req.faq_id)}>Delete</Button>
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