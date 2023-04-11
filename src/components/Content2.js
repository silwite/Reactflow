import React, {useState,useEffect} from "react";
import axios from 'axios';

export default () => {
  const onDragStart = (event, nodeType) => {
    console.log(nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  const [workflow, setWorkflow] = useState([]);
   
     useEffect(() => {
       
       axios
         .get('https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5')
         .then((response) => {
           setWorkflow(response.data);
           console.log(response.data)
         })
         .catch((error) => {
           console.log(error);
         });
     }, []);

  return (
    <aside>
      <div className="description"><h3>Modules</h3></div>
       {workflow.map((val) => {
        const arr = [{name: val.name},{output:val.output_type},{input:val.input_type}]
        return( <div className="dndnode" onDragStart={(event) => onDragStart(event, [val.name, val.output_type, val.input_type])} draggable>
       {val.input_type} |{val.name} |{val.output_type}
      </div>)
       })}

    </aside>
  );
};
