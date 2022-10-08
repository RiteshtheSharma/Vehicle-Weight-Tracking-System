import React from "react";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ListItemIcon from "@mui/material/ListItemIcon";
import LabelIcon from '@mui/icons-material/Label';
const Modules = ({head,content,list}) => {
  return <Stack sx={{width:'100%',padding:{md:'calc(64px + 5em ) 12em' ,sm:'calc(64px + 5em ) 0',xs:'calc(64px + 5em ) 0'},margin:{md:'0',xs:'0 10vw'}}} >
  <Typography variant='h2' gutterBottom fontWeight={700} fontSize={{xs:'35px',sm:'xxx-large'}}>{head}</Typography>
  <Typography variant='h5'>{content}</Typography>
  <Stack spacing={4} mt={8}>
  {list.map((item,Index)=>{
  return (
    <><Typography variant="h3" gutterBottom fontSize={{xs:'30px',sm:'xx-large'}}>{item[0]}</Typography>
    {item[1].length>0 && <Typography variant='h6'>{item[1]}</Typography>}
    {item[2].length>0 && <List sx={{ width: '100%', maxWidth: 360, }} >
  {item[2].map((value) => (
    <ListItem
      key={value}
      disableGutters
     
      
    >
    <ListItemIcon  >
    <LabelIcon/>
    </ListItemIcon>
      <ListItemText primary={`${value}`}  />
    </ListItem>
  ))}
</List>

    }
    </>
  )
})}


  </Stack>
  </Stack>;
};

Modules.propTypes = {};

export default Modules;
