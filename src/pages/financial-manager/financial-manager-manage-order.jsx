import React from 'react'
import { Helmet } from 'react-helmet'
import { ManageOrderView } from '../../section/financial-manager/manage-order/view'

const FinancialManagerManageOrder = () => {
  return (
    <>
    <Helmet>
        <title>Manage Order : : Financial Manager</title>
    </Helmet>
    <ManageOrderView />
    </>
  )
}

export default FinancialManagerManageOrder