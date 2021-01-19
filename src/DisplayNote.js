import React,{useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert';

const DisplayNote=(props)=>{
const{title,body,_id,removeNote}=props
const[userData,setUserData]=useState([])


const result=JSON.parse(localStorage.getItem('token'))||[]

const hanldeClick=()=>{
    axios.get(`https://dct-user-auth.herokuapp.com/api/notes/${_id}`,{
        headers: {'x-auth': result.token },
    })
    .then((responce)=>{
        const value=responce.data
        setUserData(value)
        swal({
            title:`${value.title}`,
            text:`${value.body}`
        })
    })
    
}
    return(
        <>
        <div className='row'>
            <div className='col'>
        <div className='card text-white bg-secondary mt-3 '>
            <div>
            <div className='card-title bg-info border border-primary rounded' >
            <h3 onClick={hanldeClick} className='text-center p-3'>{title} </h3>
            </div>
        <button onClick={()=>{
           
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    removeNote(_id)
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
         
             }} className='btn-danger m-1'>Delete </button>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}


export default DisplayNote