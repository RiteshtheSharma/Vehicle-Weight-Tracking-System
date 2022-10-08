import Intro from "./Components/Intro/Intro";
import {BrowserRouter,
 Routes,
  Route
} from "react-router-dom";
import Camera from "./Camera";
import Slider from './Components/Slider'
import { Header } from "./Header";
function App() {
  return (
    <>
       <BrowserRouter>
       <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
      
        <Route path="img_capture" element={<Camera />} />
        <Route path = 'about' element={<Slider/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
