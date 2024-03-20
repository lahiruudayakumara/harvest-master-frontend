import React from 'react'
import { Helmet } from 'react-helmet'
import SupportDeskView from '../../section/support-desk/support-desk-view'
import { NavBar } from '../../components/nav-bar'

const SupportDesk = () => {
  return (
  <>
  <Helmet>
    <title>
        SupportDesk
    </title>
  </Helmet>
  <NavBar></NavBar>
  
  <SupportDeskView></SupportDeskView>
  </>
  )
}

export default SupportDesk
