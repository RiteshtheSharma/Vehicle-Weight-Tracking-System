import React, { useRef,useEffect,useState, memo  } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer';
import { ContactlessOutlined } from "@mui/icons-material";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { TextField } from "@mui/material";
import {motion} from 'framer-motion/dist/framer-motion';
// const videoConstraints = {
//   width: 540,
//   facingMode: "environment"
// };

const Camera = () => {
  const [ImgNode, setImgNode] = useState('')
  const [NoPlate, setNoPlate] = useState('')
  const updateNoPlate = (e)=>{setNoPlate(e)
  
  
  }
  let btnStart =useRef(0);
  const navigate = useNavigate();
  let btnCapture = useRef(0);
  
  // The stream & capture
  let stream = useRef(0);
  let capture = useRef(0);
  let snapshot = useRef(0);
  
  // The video stream
  let cameraStream = useRef(null);
  
  // Attach listeners
  // btnStart.addEventListener( "click", startStreaming );
  // btnStop.addEventListener( "click", stopStreaming );
  // btnCapture.addEventListener( "click", captureSnapshot );
  
  // Start Streaming
  
  function startStreaming() {
  
    var mediaSupport = 'mediaDevices' in navigator;
  
    if( mediaSupport && null == cameraStream.current ) {
  
      navigator.mediaDevices.getUserMedia( { video: true } )
      .then( function( mediaStream ) {
        setImgNode('');
        UpdateShowCapture(false);
        cameraStream.current = mediaStream;
  
        stream.current.srcObject = mediaStream;
  
        stream.current.play();

      })
      .catch( function( err ) {
  
        console.log( "Unable to access camera: " + err );
      });
    }
    else {
  
      alert( 'Your browser does not support media devices.' );
  
      return;
    }
  }
  
  // Stop Streaming
  function stopStreaming() {
  if( null != cameraStream.current ) {
  
      var track = cameraStream.current.getTracks()[ 0 ];
  
      track.stop();
      stream.current.load();
  
      cameraStream.current = null;
      console.log('called')
      
    }
    else {
      const video = document.querySelector('video');

// A video's MediaStream object is available through its srcObject attribute
const mediaStream = video.srcObject;

// Through the MediaStream, you can get the MediaStreamTracks with getTracks():
const tracks = mediaStream.getTracks();

// Tracks are returned as an array, so if you know you only have one, you can stop it with: 
tracks[0].stop();

// Or stop all like so:
tracks.forEach(track => track.stop())
    }
  }
  
  function captureSnapshot() {
  
    if( null != cameraStream.current ) {
      
     
      var ctx = capture.current.getContext( '2d' );
      //var img = new Image();
      
      ctx.drawImage( stream.current, 0, 0, capture.current.width, capture.current.height );
      
      //img.src		= capture.current.toDataURL( "image/png" );
      //img.width	= 240;
     
    
      setImgNode(capture.current.toDataURL( "image/png" ));
      
      stopStreaming() ;

      UpdateShowCapture(true);
    }

    stopStreaming() ;

      UpdateShowCapture(true);
     
  }
  
const [ShowCapture, setShowCapture] = useState(false)
const UpdateShowCapture = (v)=>{
setShowCapture(v);
}

useEffect(() => {
  window.onbeforeunload = () => stopStreaming() ;
})

useEffect(() => {
  startStreaming()
  }, [])



const CaptureImg = async () => {stopStreaming();
  
  var data = ImgNode.toString().replace("data:image/png;base64,", "");
  fetch("http://127.0.0.1:5000/photo", {
    method: "POST",
    headers:{ 
      "textfield":
      NoPlate
    },
    body: data
  }).then(res=>res.json()).then((res) => {console.log(res['Number Plate'],' test')
    alert("screenshot sended sucessfully");
    
    stopStreaming();
    setShowCapture(false);
    setImgNode('');
   navigate('/response',{state: res['Number Plate'] })
  }).catch(e=>console.log('error :',e));
};
  return (<>
    

{/* <!-- Video Element & Canvas --> */}
<motion.div
     initial={{height:0}}
     animate={{height:'100%',display:'block',transition:{duration:0.5}}}
     exit={{y:window.innerHeight}}
     
     >

    
 
 
<div className="play-area-sub" style={{minWidth:'100%',minHeight:'67.5%',padding:'10px 0'}}  >
<video id="stream" ref={stream}  className={ShowCapture?"zero":''} style={{height:'calc(100vh - 170px)',maxWidth:'100vw'}}></video>
     
<canvas id="capture" width="320" height="240" ref={capture} />
      { ImgNode.length>0 &&  
    <Box id="snapshot" width="320" height="240" ref={snapshot} className={ShowCapture?'':"zero"} style={{width:'100%'}} >
     <img src={ImgNode} style={{margin:'auto',height:'calc(100vh - 170px)',maxWidth:'100vw'}} alt='' /></Box>}
   </div>
   <Box m={1}>
   <TextField id="outlined-basic" label="Number Plate" variant="outlined" fullWidth value={NoPlate} onChange={(e)=>{updateNoPlate(e.target.value)}}/>
   </Box>
  <div className="button-group">
  <button id="btn-start" type="button" className="button" ref = {btnStart} onClick={startStreaming} disabled={!ShowCapture}>Recapture</button>
  <button id="btn-capture" type="button" className="button" ref={ btnCapture} onClick={captureSnapshot} disabled={ShowCapture}>Capture Image</button>
  <Link to='/' style={{textDecoration:'none',color:'black'}} onClick={(e)=>{e.preventDefault();stopStreaming(); setTimeout(()=>navigate('/'),1000);}}><button id="btn-stop" type="button" className="button"  >Back</button></Link>
  <button id="btn-sub" type="button" className="button" onClick={CaptureImg} disabled={!ShowCapture}>Submit</button>
  </div></motion.div></>
  );
};

export default  memo (Camera);
