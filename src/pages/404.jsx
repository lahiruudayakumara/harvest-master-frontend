import { Helmet } from 'react-helmet'
import { NotFoundView } from '../section/error'

const NotFoundPage = () => {
  return (
      <>
          <Helmet>
              <title>403 Page Not Found!</title>
          </Helmet>
          <NotFoundView />
      </>
  )
}

export default NotFoundPage
