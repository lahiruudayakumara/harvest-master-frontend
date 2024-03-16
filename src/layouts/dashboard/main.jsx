import { Box } from '@mui/material'
import React from 'react'

const Main = ({ children }) => {
  return (
    <Box
        component="main"
        marginLeft={{ xs: '0px', md: '250px' }}
        sx={{
            display: 'flex',
            padding: 2,
        }}
    >
        {children}
    </Box>
  )
}

export default Main