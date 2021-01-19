import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { Link,Redirect } from 'react-router-dom'

const Account=(props)=>{
  
  const[details,setDetails]=useState({})


    useEffect(()=>{
        const result=JSON.parse(localStorage.getItem('token'))||[]
       
        axios.get('https://dct-user-auth.herokuapp.com/users/account', {
            headers: {'x-auth': result.token },
        })
        .then((res)=>{
            const value=res.data
            setDetails(value)
        
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])


    return(
        <div className='container'>
           
        <div className='card'>
            <div className='card-title text-success bg-secondary'>
            <h1 className='display-4'>User Account</h1>
            </div>
            <div className='card-body'>
            <h3 className='mt-3'>UserName:{details.username} </h3>
            <h3 className='mt-4'>Email: {details.email} </h3>
            </div>
        </div>
        </div>
    )

}

export default Account