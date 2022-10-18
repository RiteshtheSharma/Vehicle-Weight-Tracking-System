import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {useNavigate } from 'react-router-dom';
import CameraIcon from '@mui/icons-material/Camera';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Brightness1Icon from '@mui/icons-material/Brightness1';


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
 
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export const Header = (props) => {
const [state, setState] = React.useState(false);
const navigate = useNavigate();
const toggleDrawer = ( open) => (event) => {
  if (
    event &&
    event.type === 'keydown' &&
    (event.key === 'Tab' || event.key === 'Shift')
  ) {
    return;
  }

  setState( open );
};

const MyDropdown = () => (
 
  <Box
    sx={{ width: 'auto'}}
    
    role="presentation"
    // onClick={toggleDrawer( false)}
    // onKeyDown={toggleDrawer( false)}
  >
    <List sx={{marginTop:'64px'}}>

   <ListItem  disablePadding>

       
          <ListItemButton onClick={(e)=>{navigate('/');}}>
            <ListItemIcon>
               <Brightness1Icon /> 

            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
          
      
        </ListItem>

        <ListItem disablePadding>


  <ListItemButton onClick={(e)=>{ 
    
    // scroll()
    
navigate('/');setTimeout(()=>{ window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })},200)

    // navigate('/',{state:{ScrollVal:undefined}}) 
    }}>
    <ListItemIcon>
       <Brightness1Icon /> 

    </ListItemIcon>
    <ListItemText primary='About' />
  </ListItemButton>
  

</ListItem>

<ListItem disablePadding>


  <ListItemButton onClick={(e)=>{navigate('img_capture')}}>
    <ListItemIcon>
       <Brightness1Icon /> 

    </ListItemIcon>
    <ListItemText primary='Capture' />
  </ListItemButton>
  

</ListItem>
    </List>
    
  </Box> 
);

  return (
    <HideOnScroll {...props} sx={{zIndex:'100'}}>
    <AppBar component="nav" xs={8}>
      <Toolbar>
      
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
        
          sx={{ mr: 2, display: { sm: 'none' }}}
        >
          <CameraIcon />
        </IconButton>
      

        <Box sx={{ display: {  sm: 'block',xs:'none' } }}>
     
        
            <Button  sx={{ color: '#fff' }} onClick={(e)=>{navigate('/')}}>
            Home
            </Button>
           
            <Button key='About' sx={{ color: '#fff' }} onClick={(e)=>{navigate('/');setTimeout(()=>{ window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })},200)}}>
            About
            </Button>
            
            <Button  sx={{ color: '#fff' }} onClick={(e)=>{navigate('img_capture')}}>
            Capture
            </Button>


        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          

          sx={{ ml: 2, display: { sm: 'none' },textAlign:'end',position: 'absolute',
    right: '0'}}
        >
          <MenuIcon onClick={toggleDrawer( !state)} sx={{zIndex:'100'}} />
        </IconButton>
        <SwipeableDrawer
    anchor={'top'}
    open={state}
    onClose={toggleDrawer(false)}
    onOpen={toggleDrawer( true)}
    sx={{zIndex:'99'}}
  >
            <MyDropdown /></SwipeableDrawer>
      </Toolbar>
    </AppBar></HideOnScroll>
  )
}
