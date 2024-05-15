import { Helmet } from 'react-helmet'
import { RefundView } from 'src/section/financial-manager/refund/view'

const FinancialManagerRefund = () => {
    return (
        <>
            <Helmet>
                <title>Refund : Financial Manager</title>
            </Helmet>
            <RefundView />
        </>
    )
}

export default FinancialManagerRefund