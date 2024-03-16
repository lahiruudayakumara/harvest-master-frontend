import React from 'react'
import { Helmet } from 'react-helmet'
import { PaymentView } from '../../section/financial-manager/Payment/view'

const FinancialManagerPayment = () => {
    return (
        <>
            <Helmet>
                <title>Payment : Financial Manager</title>
            </Helmet>
            <PaymentView />
        </>
    )
}

export default FinancialManagerPayment