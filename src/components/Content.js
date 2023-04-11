import React, {useState,useEffect} from "react";
import axios from 'axios';
import "./content.css"

import Content1 from './Content1';
function Content ({id},{input}) {
    const [workflow, setWorkflow] = useState([]);
    console.log(id);
    console.log(input);
     useEffect(() => {
       
       axios
         .get(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/`+id)
         .then((response) => {
           setWorkflow(response.data);
           console.log(response.data)
         })
         .catch((error) => {
           console.log(error);
         });
     }, []);
   
  
 
  return  (<div className="content">

<Content1 input={input}/>

</div>);}

export default Content ;

