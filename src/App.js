import React from 'react';
import Intro from "./Components/Intro/Intro";
import {BrowserRouter,
 Routes,
  Route
} from "react-router-dom";
import Camera from "./Camera";
import Slider from './Components/Slider'
import { Header } from "./Header";
import Response from './Components/Response'
function App() {
  return (
    <>
       <BrowserRouter>
       <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path='response' element={<Response />}></Route>
        <Route path="img_capture" element={<Camera />} />
        <Route path = 'about' element={<Slider/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
