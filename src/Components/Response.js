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
import {motion} from 'framer-motion/dist/framer-motion';
import axios from 'axios';

const Response = () => {
    const {Number_Plate,Weight} = useLocation().state;
    
    const navigate = useNavigate();
const [VehicleInfo, setVehicleInfo] = useState(null)

useEffect(() => {
    console.log(Number_Plate,Weight,' in response ')
    if(Number_Plate == null) navigate('/')
  axios.post('http://127.0.0.1:5000/vehicle_information',{"Number_Plate" :Number_Plate}).then(
   
    resp=>{
        setVehicleInfo({...resp.data});console.table(resp.data,'vehicle info');}
  )
   
 
}, [])

  return (<motion.div
    initial={{height:0,display:'none'}}
    animate={{height:'100%',display:'block',transition:{duration:0.5}}}
    exit={{y:window.innerHeight}}
    
    >
    <Stack >

    <Stack sx={{margin:{sm:'100px auto',xs:'60px auto'}}}>
    <Typography variant='h3' fontWeight='800'  fontSize={{
              xs: "30px",
              sm: "40px",
              
            }}>
       Vehicle Information
    </Typography>
    </Stack>
    <Stack mx={4} mb={4}>
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
             
              <TableCell  align="left" style={{margin:'auto'}} ><Typography color={k==='Message'?(VehicleInfo['Penalties']>0?'error.main':'success.main'):'text.primary'} >{k}</Typography></TableCell>
              <TableCell align="left"  style={{margin:'auto'}}><Typography color={k==='Message'?(VehicleInfo['Penalties']>0?'error.main':'success.main'):'text.primary'} >{VehicleInfo[k]}</Typography></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    }

    </Stack>
    </Stack></motion.div>
  )
}

export default Response