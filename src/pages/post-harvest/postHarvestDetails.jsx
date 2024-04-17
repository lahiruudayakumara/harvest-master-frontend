import React from 'react'
import { Helmet } from 'react-helmet'
import {  PostHarvestDetailsView } from '../../section/post-harvest/post-harvest-details'
import { WeatherView } from './weatherDetails'
import ScrollToTop from 'src/components/postHarvest/scroll-top'

export const PostHarvestDetails = () => {
  return (
    
      <>
          <ScrollToTop></ScrollToTop>
          <Helmet>
              <title>postharvestDetails</title>
          </Helmet>
          <PostHarvestDetailsView/>
          
      </>
      
  )
}
