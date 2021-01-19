import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import validator from 'validator';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios'
import swal from 'sweetalert';
const Register =(props)=>{
    //states
const [userName,setUsername]=useState('')
const [email,setEmail]=useState('')
const[password,setPassWord]=useState('')

const[toggle,setToggle]=useState(false)

const[formErrors,setFormErrors]=useState({})
const errors={}

//handle Events
const handleUserName=(e)=>{setUsername(e.target.value)}
const handleEmail=(e)=>setEmail(e.target.value)
const handlePassword=(e)=>setPassWord(e.target.value)

const runValidation=()=>{
    if(userName.trim().length===0){
        errors.userName='Username Cannot Be Blank'
    }
    if(password.trim().length===0){
        errors.password='Password Requred'
    }else if(password.trim().length>15 || password.trim().length<5){
        errors.password='Should be Greater Than 5 and Lesser than 15 charecters'
    }   
    if(!validator.isEmail(email)){
        errors.email='Invalid Email'
    }else if(email.trim().length===0){
        errors.email='Filed Should not be Blank'
    }
}


const handleSubmit=(e)=>{
    e.preventDefault()
    runValidation()
    if(Object.keys(errors).length===0){
        setFormErrors({})
        const result={
            username:userName,
            email:email,
            password:password,
        }
        axios.post('https://dct-user-auth.herokuapp.com/users/register',result)
        .then((res)=>{
            const value=res.data
            if(value.hasOwnProperty('errors')){
                swal(`Error!, ${value.message}!, error`);
                // alert(value.message)
            }else{
                swal("Good job!", "You Successfully Register!", "success");
                console.log(value)
                props.history.push('./login')
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }else{
        setFormErrors(errors)
    }
    
}
    return(
        <div className='container bg-secondary p-3'>
           <h1 className='display-4 mb-3 ml-4'>Register with us</h1>
            <Row className='ml-3'>
            <Col md={6}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Control  type='text' value={userName} onChange={handleUserName} placeholder='Enter UserName' />
                {
                    formErrors.userName && <Form.Text className='text-danger'>{formErrors.userName} </Form.Text>
                }
                </Form.Group>
                <Form.Group>
                <Form.Control className='form-control mt-3' type='email' value={email} onChange={handleEmail} placeholder='Enter Email ' />
                {
                    formErrors.email && <Form.Text className='text-danger'>{formErrors.email} </Form.Text>
                }
                </Form.Group>
                <Form.Group>
                <Form.Control className='form-control mt-3' type='password' value={password} onChange={handlePassword} placeholder='Enter PassWord' />
                {
                    formErrors.password&&<Form.Text className='text-danger'>{formErrors.password} </Form.Text>
                }
                </Form.Group>
                <Form.Group>
                <input className='mt-3 btn btn-success' type='submit' value='Register' />

                <button onClick={()=>setToggle(true)} className='mt-3 ml-2 btn btn-secondary '>Cancel</button>  
                {
                    toggle && <Redirect to='/' />
                }  
                </Form.Group>
            </Form>
            </Col>
            </Row>
            </div>
    )
}

export default Register