import { Helmet } from 'react-helmet'
import { FinancialManagerAccountView } from '../../section/financial-manager/account/view'
import { InstructorAccountView } from '../../section/instructor/account/view'

const InstructorAccount = () => {
  return (
    <>
    <Helmet>
        <title>Dashboard : Instructor</title>
    </Helmet>
    <InstructorAccountView />
    </>
  )
}

export default InstructorAccount