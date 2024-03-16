import { Box } from '@mui/material'
import React from 'react'
import Header from './header'
import Main from './main'
import NavMenu from './nav-menu'

const DashboardLayout = ({children}) => {
  return (
    <>
     <Header page="Dashboard" role="Financial Manager" name="LAHIRU"   />
     <NavMenu role="Financial Manager" />
     <Main>
        {children}
     </Main>
    </>
  )
}

export default DashboardLayout
