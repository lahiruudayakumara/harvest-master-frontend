import React from 'react'
import { Helmet } from 'react-helmet'
import { FinancialManagerAccountView } from '../../section/financial-manager/account/view'

const FinancialManagerAccount = () => {
  return (
    <>
    <Helmet>
        <title>Dashboard : Financial Manager</title>
    </Helmet>
    <FinancialManagerAccountView />
    </>
  )
}

export default FinancialManagerAccount