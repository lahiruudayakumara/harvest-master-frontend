import React from 'react'
import SupportForm from './support-desk-form'
import { Box } from '@mui/material'
import Faq from './faq'

const SupportDeskView = () => {
  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <SupportForm />
      <Faq></Faq>
    </Box>
    
    
    </>
  )
}

export default SupportDeskView

