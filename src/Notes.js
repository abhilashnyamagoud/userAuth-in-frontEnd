import React,{useState,useEffect} from 'react';
import AddNote from './AddNote'
import DisplayNote from './DisplayNote'
import axios from 'axios'

const Notes=(props)=>{
   const[notes,setNotes]=useState([])
    console.log(notes)
    const result=JSON.parse(localStorage.getItem('token'))||[]

    const addNotes=(data)=>{
    const result=[data,...notes]
    setNotes(result)
    }
    const removeNote=(id)=>{    
        const value=notes.filter((ele)=>{
            return ele._id !==id
        })
        axios.delete(`https://dct-user-auth.herokuapp.com/api/notes/${id}`,{
            headers: {'x-auth': result.token },
        })
        .then((responce)=>{
            // console.log(responce.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
        setNotes(value)
    }
    
    useEffect(()=>{
        axios.get('https://dct-user-auth.herokuapp.com/api/notes',{
            headers: {'x-auth': result.token },
        })
        .then((responce)=>{
            // console.log(responce.data)
            setNotes(responce.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])

    return(
        <div>
        <div className='row'>
           <div className='col-md-6'>
            <AddNote addNotes={addNotes} />
            </div>
            <div className='col-md-6'>
            {
                notes.map((ele,i)=>{
                 return    <DisplayNote key={i} {...ele} removeNote={removeNote} />
                })
            }
            </div>
        </div>
        </div>
    )
    
}

export default Notes