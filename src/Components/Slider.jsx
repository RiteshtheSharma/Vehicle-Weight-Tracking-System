import React,{useState} from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box,Stack } from '@mui/system';

import Modules from './Module';
const Data =[{head:'INTRODUCTION',list:[['TOOLS / TECHNOLOGIES TO BE USED','',['React JS','MongoDB Atlas','Flask','Camera','Vscode']],['PROJECT MODULES','',['Image processing','Database ','Backend','Api creation','Frontend (React JS) ']],['TEAM MEMBER DETAILS','',['Ritesh Sharma','Saurabh Pareek ']]],content:'Vehicle weight tracking system is an application to track vehicle weight and get vehicle details by reading number plate through camera. Road safety measures are checked for the vehicle.'},
{head:'TOOLS / TECHNOLOGIES USED',list:[['React JS','',['Software','Version 18.8','For creating graphical user interface and frontend']],['MongoDB Atlas','',['Software (cloud database )','Version 6.0.1','For database']],['Flask','',['Software','Version 2.2.2','For backend and image processing']],['Camera','',['Hardware','For capturing the image']],['Vscode','',['Software (source-code editor)','Version 1.72.0','For smooth project building']]],content:'Tools and Technologies used are described by their version, purpose of use and whether it is s/w or h/w'}
,{head:'React JS',list:[['Declarative','React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.\n\nDeclarative views make your code more predictable and easier to debug.',[]],['Component-Based','Build encapsulated components that manage their own state, then compose them to make complex UIs.\nSince component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.',[]],['Learn Once, Write Anywhere',"We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.\nReact can also render on the server using Node and power mobile apps using React Native.",[]]],content:'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.'}
,{head:'MongoDB',list:[['Ad-hoc queries','MongoDB supports field, range query, and regular-expression searches. Queries can return specific fields of documents and also include user-defined JavaScript functions. Queries can also be configured to return a random sample of results of a given size.',[]],['Indexing','Fields in a MongoDB document can be indexed with primary and secondary indices or index.',[]],['Replication',"MongoDB provides high availability with replica sets. A replica set consists of two or more copies of the data. Each replica-set member may act in the role of primary or secondary replica at any time. All writes and reads are done on the primary replica by default. Secondary replicas maintain a copy of the data of the primary using built-in replication. When a primary replica fails, the replica set automatically conducts an election process to determine which secondary should become the primary. Secondaries can optionally serve read operations, but that data is only eventually consistent by default. If the replicated MongoDB deployment only has a single secondary member, a separate daemon called an arbiter must be added to the set. It has a single responsibility, which is to resolve the election of the new primary.As a consequence, an idealized distributed MongoDB deployment requires at least three separate servers, even in the case of just one primary and one secondary.",[]]],content:'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL) which is deemed non-free by several distributions.Main features of MongoDB are'}
,{head:'Flask',

list:[['Werkzeug','Werkzeug (German for "tool") is a utility library for the Python programming language for Web Server Gateway Interface (WSGI) applications. Werkzeug can instantiate objects for request, response, and utility functions. It can be used as the basis for a custom software framework and supports Python 2.7 and 3.5 and later.',[]],
['Jinja','Jinja, also by Ronacher, is a template engine for the Python programming language. Similar to the Django web framework, it handles templates in a sandbox.',[]],
['MarkupSafe','MarkupSafe is a string handling library for the Python programming language. The eponymous MarkupSafe type extends the Python string type and marks its contents as "safe"; combining MarkupSafe with regular strings automatically escapes the unmarked strings, while avoiding double escaping of already marked strings.',[]]

]
,content:'Flask is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions. Components of flask are :'}
,{head:'Vscode',
list:[],
content:'Visual Studio Code, also commonly referred to as VS Code, is a source-code editor made by Microsoft with the Electron Framework, for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded Git. Users can change the theme, keyboard shortcuts, preferences, and install extensions that add additional functionality.'

},
{
head:'PROJECT MODULES',
list:[['Image processing','Will process the captured image of vehicle',[]],['Database ','Will store information of vehicles',[]],['Backend','Responsible for executing image processing and updating and getting data from database',[]],['Api creation','Will facilitate in giving frontend access of data from backend',[]],['Frontend (React JS) ','Will display all the response and interact with user (traffic police)',[]]],
content:'Below Modules are described with their importance in project'
}

]

const Slider = () => {const [Index, setIndex] = useState(0)
  const Increment =()=>{
    if(Index < Data.length-1)
    setIndex(Index+1)
  }
  const Decrement =()=>{
    if(Index >0)
    setIndex(Index-1)
  }


  return (
   
    <Stack direction='row' sx={{overflowY: 'scroll',height:'100vh'}} >
    <Box  className={((Index===1)?'stopSlide slider-b ':'slider-b')} onClick={Decrement} >
    < ArrowBackIosIcon sx={{height:'100vh',color:'white' }} /></Box>
     <Box >< Modules head={Data[Index].head} list={Data[Index].list} content={Data[Index].content}/></Box>
      <Box sx={{right:'0'}} className={((Index===Data.length-1)?'stopSlide slider-b':'slider-b')} onClick={Increment}><ArrowForwardIosIcon sx={{height:'100vh',color:'white',margin:'auto'}}  /></Box>
  
  </Stack>
  )
}

export default Slider