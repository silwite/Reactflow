import React,{useEffect,useState} from 'react';
import './worklist.css';
import axios from 'axios';
import { Link } from 'react-router-dom';




function  Worklist() {
    const [workflowData, setWorkflowData] = useState(null); 
      
 
    useEffect( () => {
  
   axios
        .get('https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
        .then((response) => {         
          const data = response.data;         
          setWorkflowData(data);            
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    if (!workflowData) {
      return <p>This page is still loading</p>;
    } 

  return (
    <div className="App">
      <table>
        <tr>
          <th>Name</th>
          <th>InputType</th>
          <th>CreatedAt</th>
        </tr>
        { workflowData.map((val) => {
         const data ={ id:val.id, name: val.name , input:val.input_type }
          return (
            <tr >
              <td> 
              <Link to= "/pages"  state= {data} ><h2>{val.name}</h2></Link></td>
              <td>{val.input_type}</td>
              <td>{val.createdAt}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );

    }
export default Worklist;