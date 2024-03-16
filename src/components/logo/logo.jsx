import { Box } from '@mui/material'
import React from 'react'

const Logo = ({ sx }) => {
  return (
    <Box
        component="img"
        src="./logo_white.png"
        sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    />
  )
}

export default Logo
