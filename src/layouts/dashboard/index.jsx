import { useSelector } from 'react-redux'

import Header from './header'
import Main from './main'
import NavMenu from './nav-menu'
import { selectNav } from '../../stores/slices/adminNavSlice'
import { selectAuth } from '../../stores/slices/authSlice'

const DashboardLayout = ({ children, role }) => {
  const { displayName } = useSelector(selectNav);
  const { userRole, user } = useSelector(selectAuth);

  let updateUserRole = userRole;

  if (userRole == "ROLE_ADMIN") {
    updateUserRole = "Admin"
  } else if (userRole == "ROLE_FINANCIAL_MANAGER") {
    updateUserRole = "Financial Manager"
  } else if (userRole == "ROLE_LOGISTIC_HANDLER") {
    updateUserRole = "Logistic Handler"
  } else if (userRole == "ROLE_INSTRUCTOR") {
    updateUserRole = "Instructor"
  } else if (userRole == "ROLE_INVENTORY") {
    updateUserRole = "Inventory"
  }

  return (
    <>
      <Header page={displayName} role={updateUserRole} name={user.name} />
      <NavMenu role={updateUserRole} />
      <Main>
        {children}
      </Main>
    </>
  )
}

export default DashboardLayout
