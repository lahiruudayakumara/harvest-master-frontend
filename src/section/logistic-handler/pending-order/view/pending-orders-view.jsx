import { Box, Button, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React from 'react'

const PendingOrdersView = () => {
  return (
    <Box flexGrow={1} >
      <Button
        style={{ backgroundColor: '#2CA019' }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Payment
      </Button>
      <Box
        boxShadow={2}
        marginTop={2}
        padding={2}
        borderRadius={2}
        minHeight='70vh'
      >
        <Typography
          variant="h6"
          marginBottom={1}
          style={{ color: "#07bc0c", fontWeight: "bolder" }}
        >
          Draft Payment
        </Typography>
      </Box>
    </Box>
  )
}

export default PendingOrdersView
