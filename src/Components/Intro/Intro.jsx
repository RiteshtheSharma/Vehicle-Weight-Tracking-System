import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Style";

import Front from "./Front";
import {
   Route,Routes
 }from "react-router-dom";
const Intro = () => {

  return (
    <>
    
      <ThemeProvider theme={theme}>
     
      
                    <Front/>

      </ThemeProvider>
    
    </>
  );
};

export default Intro;
