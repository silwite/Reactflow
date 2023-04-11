import React from 'react';
import Headerr from './Headerr';
import Content from './Content';
import './App.css';
import { useLocation } from 'react-router-dom';
import Content1 from './Content1';
function App() {
  const data = useLocation();
  
 console.log(data.state.input)
  return (
    <div>
  
      <Headerr name={data.state.name}/>
      <Content1 id= {data.state.id } input ={data.state.input} />
    </div>
  );
}

export default App;