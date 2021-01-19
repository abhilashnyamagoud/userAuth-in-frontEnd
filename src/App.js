import React,{useState,useEffect} from 'react'
import NavBar from './Navbar'
// import SweetAlert from 'react-bootstrap-sweetalert';
import swal from 'sweetalert';

const App=(props)=>{
const[userLoggedIn,setUserLoggedIn]=useState(false)

const handleAuth=()=>{
  setUserLoggedIn(!userLoggedIn)
}

useEffect(()=>{
  if(localStorage.getItem('token')){
    handleAuth()
  }
},[])
  return(
    <div className='container mt-5 '>
      <h1 className='display-4'>User Auth</h1>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
    </div>
  )
}


export default App