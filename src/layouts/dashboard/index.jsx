import { Box } from '@mui/material'
import React from 'react'
import Header from './header'
import Main from './main'
import NavMenu from './nav-menu'

const DashboardLayout = ({children, role }) => {
  return (
    <>
     <Header page="Dashboard" role={role} name="LAHIRU"   />
     <NavMenu role={role} />
     <Main>
        {children}
     </Main>
    </>
  )
}

export default DashboardLayout
