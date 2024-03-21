import { Helmet } from 'react-helmet'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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


