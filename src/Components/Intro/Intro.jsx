import React, { useState,useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Style";

import Front from "./Front";
import Slider from '../Slider';
import "./Intro.css";

const Intro = () => {

  const scroll=()=>{
    
   
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  const [Scroll, setScroll] = useState(false);
  const UpdateScroll =()=>{

    setScroll(true);
  }
useEffect(() => {
 if(Scroll)
  {scroll();
  setScroll(false);
  }
}, [Scroll])


  return (
   
    <div  id='hi'>
      <ThemeProvider theme={theme} >
     
      
                    <Front onClickFunc ={UpdateScroll}/>
                     <Slider/>
      </ThemeProvider></div>
    
    
  );
};

export default Intro;
