import React from 'react'
import { Helmet } from 'react-helmet'
import { AdminLoginView } from '../../../section/auth/admin/view'

const LoginPage = () => {
  return (
    <>
        <Helmet>
            <title>Admin: Login</title>
        </Helmet>
        <AdminLoginView />
    </>
  )
}

export default LoginPage