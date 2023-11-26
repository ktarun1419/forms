import React, { useEffect } from 'react'
import './form.css'
import InputFields from './fields/inputFields'
import { useImmer } from 'use-immer'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const Form = ({json}) => {
    const [updatedData,setUpdatedData]=useImmer(json)
    useEffect(()=>{
        setUpdatedData(json)
    },[json])
    const filterData=(data)=>{
        let newObj=JSON.parse(JSON.stringify(data))
        for (let index = 0; index < newObj.length; index++) {
            const element = newObj[index];
            if (Array.isArray(element?.subParameters) && element?.subParameters?.length>0 ) {
                let data=filterData(element?.subParameters)
                newObj[index]=data
            }else{
                if (!Boolean(element?.value)) {
                    if (element?.validate?.required) {
                       //required alerts and conditions here changes
                    }
                   delete newObj[index]
                }
            }
        }
        return newObj
    }
   const handleSubmit=()=>{
    let submitData=filterData(updatedData)
    console.log({submitData})
    alert("Data submitted ! Successfully")
    // axios.post('')

   }
  return (
    <div className='form-container'>
        {Array.isArray(json) && json.length>0 && json.map((item)=>( <InputFields  field={item} json={updatedData} mainJson={updatedData} setUpdatedData={setUpdatedData} />))}
       <footer className='footer'>
        <button className='cancel_button'>Cancel</button>
       <button className='submit_button' onClick={handleSubmit}>Submit</button>
       </footer>
    </div>
  )
}

export default Form