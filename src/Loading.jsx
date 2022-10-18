import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
export const Loading = () => {
  return (
    <Backdrop
    id='sa'
      sx={{ color: '#fff', zIndex:10000}}
      open={true}
    >
    <CircularProgress color="inherit" /></Backdrop>
  )
}
