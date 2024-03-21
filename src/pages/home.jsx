import { Helmet } from 'react-helmet'
import MaintenanceView from '../section/error/maintenance-view';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home: Harvest Mater</title>
      </Helmet>
      <MaintenanceView />
    </>
  )
}


