import React from 'react'
import { Box,Stack,Typography } from '@mui/material'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect ,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';

const Response = () => {
    const {state} = useLocation();
    const Number_Plate = state;
    const navigate = useNavigate();
const [VehicleInfo, setVehicleInfo] = useState(null)

useEffect(() => {
    console.log(Number_Plate,' in response ')
    if(Number_Plate == null) navigate('/')
  axios.post('http://127.0.0.1:5000/vehicle_information',{"Number_Plate" :Number_Plate}).then(
   
    resp=>{
        setVehicleInfo({...resp.data});console.table(VehicleInfo,'vehicle info');}
  )
   
 
}, [])

  return (
    <Stack >

    <Stack sx={{margin:{sm:'100px 3vw',xs:'60px auto'}}}>
    <Typography variant='h3' fontWeight='800'  fontSize={{
              xs: "30px",
              sm: "40px",
              
            }}>
       Vehicle Information
    </Typography>
    </Stack>
    <Stack m={4}>
    {VehicleInfo &&
    
        <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <caption style={{padding:'20px',textAlign:'center',fontSize:'x-large'}}>Information of vehicle</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{margin:'auto'}}> <Typography fontWeight='800'>Key</Typography></TableCell>
            <TableCell align="left" style={{margin:'auto'}}><Typography fontWeight='800'>Value </Typography></TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(VehicleInfo).map((k,i) => (
            <TableRow key={i}>
             
              <TableCell  align="left" style={{margin:'auto'}} ><Typography color={k==='Panelty'?(VehicleInfo[k]>0?'error.main':'success.main'):'text.primary'} >{k}</Typography></TableCell>
              <TableCell align="left"  style={{margin:'auto'}}><Typography >{VehicleInfo[k]}</Typography></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    }

    </Stack>
    </Stack>
  )
}

export default Response