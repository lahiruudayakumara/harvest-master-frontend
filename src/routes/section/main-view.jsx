import React from 'react'
import { Outlet } from 'react-router-dom'
import { PageLayout } from 'src/layouts/main'

export const MainView = () => {
  return (
      <PageLayout>
          
          <Outlet />
        </PageLayout>
  )
}
