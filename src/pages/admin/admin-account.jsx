import { Helmet } from 'react-helmet'
import { AdminAccountView } from '../../section/admin/account/view'

function AdminAccount() {
    return (
        <>
            <Helmet>
                <title>Dashboard : Admin</title>
            </Helmet>
            <AdminAccountView />
        </>
    )
}

export default AdminAccount