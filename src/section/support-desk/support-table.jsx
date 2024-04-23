import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSupportRequests } from '../../api/supportApi'
import PopupDialogSupport from './soluution-popup'
import SupportPdf from './support-report'

const SupportTableView = () => {

const [request,setRequest] = useState([""])

useEffect(()=>{


    getSupportRequests().then((request)=>{setRequest(request)
    console.log(request)
    })

  },[])



  return (
    <>

      
    <TableContainer component={Paper} style={{ marginBottom: '10px' }}><Box>
    <SupportPdf data={request}></SupportPdf></Box>
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
                { request&&request.map((req,index) => (
                    <TableRow key={index}>
                        <TableCell>{req.localDate}</TableCell>
                        <TableCell>{req.user_name}</TableCell>
                        <TableCell>{req.topic}</TableCell>
                        <TableCell>{req.status}</TableCell>
                        
                        <TableCell>
                            <Box display="flex">
                                {/* Link to add solution */}
                                {/* <Link to={/AddSolution/${issue.id}}> */}
                                   
                                        <PopupDialogSupport  data={req}  />
                                    
                                {/* </Link> */}
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  
</>
  )
}

export default SupportTableView