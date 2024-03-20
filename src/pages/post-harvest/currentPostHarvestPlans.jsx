import React from 'react'
import { Helmet } from 'react-helmet'
import { PostPlanView } from '../../section/post-harvest/post-harvest-plans-view';

export const CurrentPostHarvestPlans = () => {
  return (
    <>
      <Helmet>
        <title>postharvest plans</title>
          </Helmet>
          <PostPlanView></PostPlanView>
          
    </>
  );
}
