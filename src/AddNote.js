import React,{useState} from 'react'
import axios from 'axios'

const AddNote=(props)=>{
const{addNotes}=props
const[title,setTitle]=useState('')
const [titleBody,setTitleBody]=useState('')


const handleTitle=(e)=>{
    setTitle(e.target.value)
}
const handleBody=(e)=>{
    setTitleBody(e.target.value)
}
const handleSubmit=(e)=>{
e.preventDefault()
const formData={
    title:title,
    body:titleBody
}
const result=JSON.parse(localStorage.getItem('token'))||[]
axios.post('https://dct-user-auth.herokuapp.com/api/notes',formData,{
    headers: {'x-auth': result.token },
})
   .then((responce)=>{
       console.log(responce.data)
       addNotes(responce.data)
   }) 
   .catch((err)=>{
       alert(err.message)
   })
   setTitle('')
   setTitleBody('')
}

    return(
        <div className='col-md-7'>
            <h1 className='display-4'>Add Note</h1>
            <form onSubmit={handleSubmit}>
                <input className='form-control' type='text' value={title} onChange={handleTitle}  placeholder='Title'/><br/>
                <textarea className='form-control' rows='06' cols='38' value={titleBody} onChange={handleBody} placeholder='Body' className='mt-3' /><br/>
                <input className='btn btn-primary' type='submit' value='save' />
                </form>            
        </div>
    )
}


export default AddNote