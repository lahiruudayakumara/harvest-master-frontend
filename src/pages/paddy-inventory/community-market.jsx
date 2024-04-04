import React from 'react'
import { Helmet } from 'react-helmet'
import { CommunityMarketView } from '../../section/community-market/community-market-view'
import { NavBar } from '../../components/nav-bar'

export const CommunityMarket = () => {
    return (
      <>
      <Helmet>
          <title>communitymarket</title>
            </Helmet>
            
            <CommunityMarketView></CommunityMarketView>
      </>
  )
}
