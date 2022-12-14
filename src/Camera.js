import React, { useRef,useEffect,useState, memo  } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { TextField } from "@mui/material";

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
  
      navigator.mediaDevices.getUserMedia( { video: { facingMode: "environment"} ,width: {exact: 1920}, height: {exact: 1080}  } )
      .then( function( mediaStream ) {
       
        setImgNode('');
        UpdateShowCapture(false);
        cameraStream.current = mediaStream;
  
        stream.current.srcObject = mediaStream;
  
        stream.current.play().catch((e)=>{
          // alert('some error encountered while streaming');
        
          console.log(e);

       });

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
      const video =  stream?stream.current :document.querySelector('video');

// A video's MediaStream object is available through its srcObject attribute
const mediaStream = video.srcObject;

// Through the MediaStream, you can get the MediaStreamTracks with getTracks():
if(mediaStream){
const tracks = mediaStream.getTracks();

  // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
  tracks[0].stop();
  
  // Or stop all like so:
  tracks.forEach(track => track.stop())
}

    }
    return "Are you sure you want to leave?"
  }
  
  function captureSnapshot() {
  
    if( null != cameraStream.current ) {
      
     
      var ctx = capture.current.getContext( '2d' );
      //var img = new Image();
      capture.current.width = stream.current.videoWidth; //document.width is obsolete
      capture.current.height = stream.current.videoHeight;
      ctx.drawImage( stream.current, 0, 0,  stream.current.videoWidth, stream.current.videoHeight);
     
      //img.src		= capture.current.toDataURL( "image/png" );
      //img.width	= 240;
      setImgNode(capture.current.toDataURL( "image/png" ));
      var data = capture.current.toDataURL( "image/png" ).toString().replace("data:image/png;base64,", "");
  
      fetch("http://127.0.0.1:5000/imageprocessing", {
        method: "POST",
       body: data
      }).then(res=>res.json()).then((res) => {console.log(res,' test')
         
      alert("Image sent Successfully");
      stopStreaming();
      
        setNoPlate(res)
        
      }).catch(e=>console.log('error :',e));
    
     
      
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
  startStreaming();
  window.onbeforeunload = stopStreaming ();

  
 
  }, [])
const OnImgCaptureBtn = () =>{
  captureSnapshot();
  
  

}


const CaptureImg = async () => {stopStreaming();
  
 
  if(NoPlate.length<9 || NoPlate === 'Not Detected')
  {
    alert("Please provide valid number plate or Recapture");
    setNoPlate("");
   
  }
  else{

    fetch("http://127.0.0.1:5000/photo", {
      method: "POST",
      headers:{
        "textfield":NoPlate

      },
     
    }).then(res=>res.json()).then((res) => {console.log(res['Number Plate'],res['Weight'],' test2')

 
  
  setShowCapture(false);
 
  
 navigate('/response',{state: {Number_Plate:res['Number Plate'],Weight:res['Weight'] }})
})
       
 

  }
  
};
  return (<>
    

{/* <!-- Video Element & Canvas --> */}


    
 
<div style={{display: 'flex',
flexDirection: 'column',
justifyContent: 'space-between',
height: '100vh '}}>


<div className="play-area-sub" style={{minWidth:'100%',minHeight:'67.5%',paddingBottom:'5px'}}  >
<video id="stream" ref={stream}  className={ShowCapture?"zero capturedimg":'capturedimg'}></video>
     
<canvas id="capture"  ref={capture} />
      { ImgNode.length>0 &&  
    <Box id="snapshot" ref={snapshot} className={ShowCapture?'':"zero"}  >
     <img src={ImgNode}  alt=''  className='capturedimg'/></Box>}
   </div>
   <div>
   <Box m={1} sx={{width:{md:'50%',xs:'70%'},margin:'auto'}} id='NoplateText'>
   <TextField id="outlined-basic" label="Number Plate" variant="outlined" fullWidth value={NoPlate} onChange={(e)=>{updateNoPlate(e.target.value)}}/>
   </Box>
  <div className="button-group">
  <button id="btn-start" type="button" className="button" ref = {btnStart} onClick={startStreaming} disabled={!ShowCapture}>Recapture</button>
  <button id="btn-capture" type="button" className="button" ref={ btnCapture} onClick={OnImgCaptureBtn} disabled={ShowCapture}>Capture Image</button>
  <Link to='/' style={{textDecoration:'none',color:'black'}} onClick={(e)=>{e.preventDefault();stopStreaming(); setTimeout(()=>navigate('/'),1000);}}><button id="btn-stop" type="button" className="button"  >Back</button></Link>
  <button id="btn-sub" type="button" className="button" onClick={CaptureImg} disabled={!ShowCapture}>Submit</button>
  </div></div></div></>
  );
};

export default  memo (Camera);
