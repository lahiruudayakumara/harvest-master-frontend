import React from 'react'
import { Helmet } from 'react-helmet'
import {  PostHarvestDetailsView } from '../../section/post-harvest/post-harvest-details'

export const PostHarvestDetails = () => {
  return (
    
      <>
          <Helmet>
              <title>postharvestDetails</title>
          </Helmet>
         <PostHarvestDetailsView></PostHarvestDetailsView>
      </>
      
  )
}
