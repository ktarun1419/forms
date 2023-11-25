import logo from './logo.svg';
import './App.css';
import Textarea from './components/Textarea';
import Form from './components/Form';
import { useState } from 'react';

function App() {
  const [json,setJson]=useState('')
  const handleJsonChange=(value)=>{
    // console.log(value)
    try {
      let JsonString=JSON.parse(value)
      console.log(typeof(JsonString))
      setJson(JsonString)
    } catch (error) {
      alert("Please add a valid json")
    }
   

  }

  return (
    <div className="App">
      {console.log(json)}
      <Textarea json={json} setJson={handleJsonChange} />
      <Form json={json} />
     
    </div>
  );
}

export default App;
