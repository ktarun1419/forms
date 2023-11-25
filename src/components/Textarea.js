import React, { useState } from 'react'
import './textarea.css'
const Textarea = ({json,setJson}) => {

  return (
    <div className='textarea'>
       <textarea placeholder='Enter the JSON to generate form' onChange={(e)=>setJson(e.target.value)}   />


    </div>
  )
}

export default Textarea