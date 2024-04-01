import { Helmet } from 'react-helmet'
import { InquiriesView } from 'src/section/instructor/inquiries/view'

const Inquiries = () => {
    return (
        <>
            <Helmet>
                <title>Inquiries : Instructor</title>
            </Helmet>
            <InquiriesView />
        </>
    )
}

export default Inquiries
