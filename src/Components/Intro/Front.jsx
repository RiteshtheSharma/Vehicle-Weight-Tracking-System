import React, { memo,useRef } from "react";
import { Typography,  Button,  Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Truck from '../../Images/truck2.png'
import Captured from '../../Images/camera1.png'
import "./Intro.css";
const Front = ({onClickFunc}) => {
  
  const divRef = useRef();
  const Image1 = React.memo(function Image() {
  return <img
  src={Captured}
  alt="Captured"
  className="images"
  id='imgCamera'


/>
});
const Image2 = React.memo(function Image({ src }) {
  return  <img
  src={Truck}
  alt="Truck"
  className="images"
  id='Truck'
 
  
/>
});


  return (
    <>
    
      <Grid ref={divRef} container pt={20} pb={5} justifyContent="space-between" flexWrap="wrap"  sx={{width:'100%',minHeight: '100vh'}}  className='background'>
        <Grid item md={6} xs={12} sx={{paddingLeft:{md:'5vw',xs:'5vw'},paddingRight:{md:'0',xs:'5vw'},paddingTop:{md:'15vh'}}}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "700",color:"white" }}
            fontSize={{
              xs: "30px",
              sm: "40px",
              md: "36px",
              lg: "50px"
            }}
            gutterBottom
            
          >
            Vehicle Weight Tracking System
          </Typography>
          <Typography
           
            variant="h6"
            fontSize={{
              xs: "18px",
              sm: "20px",
              md: "15px",
              lg: "22px"
            }}
            sx={{ color: "#8A8A8A" }}
            mb={8}
          >
            Using Image Processing
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container mb={{ sm: 8, xs: 2 }} justifyContent="space-around" >
            <Grid item sm={5} xs={5}>
             <Image1 />
            </Grid>
            <Grid item sm={5} xs={5}>
             <Image2/>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around" p={{ xs: 4, sm: 0 }}>
            <Grid item sm={5} xs={12} my={{ sm: 0, xs: 4 }}>
            <Link
                  to="/img_capture"
                  style={{ textDecoration: "none", color: "white" }}
                >
              <Button variant="contained" fullWidth size='large' >
                {/*
      comment link section only when working in this section with codesandbox as 
      babel compiles the present jsx page in codesandbox as opposed to local machine
    
      */}

                Capture Truck
               
                {""}
              </Button> </Link>
            </Grid>
            <Grid item sm={5} xs={12}>
           
              <Button
                variant="contained"
                fullWidth
                size='large'
                onClick={()=>{onClickFunc()}}
              >
                Know about this app
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default memo(Front);
