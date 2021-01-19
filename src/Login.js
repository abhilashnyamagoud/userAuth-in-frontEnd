import React,{useState} from 'react';
import { Form } from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import validator from 'validator';
import axios from 'axios';
import {Card} from 'react-bootstrap';
import swal from 'sweetalert';


const Login=(props)=>{
    const {handleAuth}=props
const [email,setEmail]=useState('')
const[password,setPassWord]=useState('')
const[toggle2,setToggle2]=useState(false)

const[formErrors1,setFormErrors1]=useState({})
const errors1={}
const[output,setOutput]=useState({})
const handleEmail=(e)=>setEmail(e.target.value)
const handlePassword=(e)=>setPassWord(e.target.value)

const runValidation1=(e)=>{
    if(email.trim().length===0){
        errors1.email='Email Requred'
    }else if(!validator.isEmail(email)){
        errors1.email='Invalid Email'
    }
    if(password.trim().length===0){
        errors1.password='Password Requred'
    }else if(password.trim().length>15 || password.trim().length<5){
        errors1.password='Should be Greater Than 5 and Lesser than 15 charecters'
    }  
}


const handleSubmit=(e)=>{
    e.preventDefault()
    runValidation1()
    if(Object.keys(errors1).length===0){
        setFormErrors1({})
        const formData={
            email:email,
            password:password,
        }
        axios.post('https://dct-user-auth.herokuapp.com/users/login',formData)
        .then((res)=>{
            const value=res.data
            console.log(value)
            if(value.hasOwnProperty('errors')){
                setOutput(value)
            }else{
                swal("Good job!", "You Successfully Logged In!", "success");
                setOutput(value)
                localStorage.setItem('token', JSON.stringify(value))
                props.history.push('/')
                handleAuth()
            }
            
            
        })
        .catch((err)=>{
            alert(err.message)
        })

    }else{
        setFormErrors1(errors1)
    }
}
    return(
        <Card className='bg-secondary p-3'>
        <div className='container'>
            
            <div className='row'>
                <div className='col-md-6'>
                <h1 className='display-4'>Login To Your Account</h1>
                </div>
                <div className='col-md-6'>
                <form onSubmit={handleSubmit}>
                    {
                        output.length !==0 && <span className='text-danger'>{output.errors} </span>
                    }
                    <input type='email' className='form-control mt-3' value={email} onChange={handleEmail} placeholder='Email' />
                    {
                        formErrors1.email && <Form.Text className='text-danger'>{formErrors1.email} </Form.Text>
                    }
                      <input type='password' className='form-control mt-3' value={password} onChange={handlePassword} placeholder='Password' /> 
                      {
                          formErrors1.password && <Form.Text className='text-danger'>{formErrors1.password} </Form.Text>
                      }
                      <input className='btn btn-success mt-3' type='submit' value='Login' />
                     
                      <button onClick={()=>setToggle2(true)} className='btn btn-secondary mt-3 ml-3' >Cancel</button> 
                      {
                          toggle2 && <Redirect to='/'/>
                      }
                </form>
                    </div> 

            </div>
            
        </div>
        </Card>
    )
}

export default Login