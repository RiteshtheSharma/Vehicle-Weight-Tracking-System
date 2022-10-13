import React from 'react'
import {Routes,Route,useLocation} from "react-router-dom";
import Response from './Components/Response';
import Camera from "./Camera";
import Slider from './Components/Slider'
import Intro from "./Components/Intro/Intro";
import {AnimatePresence} from 'framer-motion/dist/framer-motion';
const AnimatedRoutes = () => {const location = useLocation();
  return (
    <AnimatePresence
    >
    <Routes  location={location} key={location.pathname}><Route path="/" element={<Intro />} />
    <Route path='response' element={<Response />}></Route>
    <Route path="img_capture" element={<Camera />} />
    <Route path = 'about' element={<Slider/>} /> </Routes></AnimatePresence>
  )
}

export default AnimatedRoutes