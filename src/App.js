import React from 'react';

import {BrowserRouter,
 
  
} from "react-router-dom";

import { Header } from "./Header";

import AnimatedRoutes from './AnimatedRoutes';
function App() {
  
  return (
    <>
       <BrowserRouter>
       <Header />
     
      <AnimatedRoutes/>
     
      </BrowserRouter>
    </>
  );
}

export default App;
