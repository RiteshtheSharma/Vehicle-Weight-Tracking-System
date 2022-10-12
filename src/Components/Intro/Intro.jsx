import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Style";

import Front from "./Front";
import {motion} from 'framer-motion/dist/framer-motion';

const Intro = () => {

  return (
   
     <motion.div
     initial={{height:0}}
     animate={{height:'100%',display:'block',transition:{duration:0.5}}}
     exit={{y:window.innerHeight}}
     
     >
      <ThemeProvider theme={theme}>
     
      
                    <Front/>

      </ThemeProvider></motion.div>
    
    
  );
};

export default Intro;
