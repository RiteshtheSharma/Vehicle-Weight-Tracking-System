import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Style";

import Front from "./Front";
import {motion} from 'framer-motion/dist/framer-motion';
import "./Intro.css";
const Intro = () => {
  var body = document.body;
  var html = document.documentElement;
  return (
   
     <motion.div
     initial={{height:0}}
     animate={{height:`calc(${window.innerHeight}px - 64px )`,display:'block',transition:{duration:1}}}
     exit={{y:window.innerHeight}}
     className='background'
     
     >
      <ThemeProvider theme={theme}>
     
      
                    <Front/>

      </ThemeProvider></motion.div>
    
    
  );
};

export default Intro;
