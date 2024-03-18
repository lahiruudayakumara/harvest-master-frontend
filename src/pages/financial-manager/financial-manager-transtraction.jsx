import { Helmet } from "react-helmet"
import { TranstractionView } from "../../section/financial-manager/account/view"


const FinancialManagerTranstraction = () => {
  return (
    <>
    <Helmet>
        <title>Transtraction : Financial Manager</title>
    </Helmet>
    <TranstractionView />
    </>
  )
}

export default FinancialManagerTranstraction