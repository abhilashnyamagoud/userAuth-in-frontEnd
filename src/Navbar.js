import React from 'react'
import { Route,Link,withRouter} from "react-router-dom";
    import Home from './Home'
    import Register from './Register'
    import Login from './Login'
    import Account from './Account'
    import Notes from './Notes'
    import swal from 'sweetalert';


const NavBar=(props)=>{
    const{userLoggedIn,handleAuth}=props 

    return(
        <div>
            <ul style={{display:'inline-block',color:'white',padding:'20px',textDecoration:'None',overflow:'hidden',listStyleType:'none',justifyContent:'space-around'}}>
                <li><Link to='/'>Home</Link></li>
                    {
                        userLoggedIn ? (
                            <React.Fragment>
                                <li><Link to='/account'>Account</Link> </li>
                                <li><Link to='/' onClick={()=>{
                                    localStorage.removeItem('token')
                                    swal("Good job!", "You Successfully LoggedOut!", "success");
                                    handleAuth()
                                    props.history.push('/')
                                }} >Logout</Link> </li>
                                <li><Link to='/notes'>My Notes </Link>  </li>
                            </React.Fragment>
                        ):(
                            <React.Fragment>
                            <li> <Link to='/register'>Register</Link> </li>
                            <li><Link to='/login'>Login</Link> </li>
                            </React.Fragment>
                        )
                    }
            </ul>
            
            
            
            <Route path='/' component={Home} exact={true} />
      <Route path='/register' exact={true} component={Register} />
      <Route path='/login'  render={(props)=>{
          return <Login {...props}
           handleAuth={handleAuth} />
      }} />
      <Route path='/account' exact={true} component={Account} />
      <Route path='/notes' exact={true} component={Notes} />
      
        
        </div>
    )
}
// const WrappedComponent=withRouter(NavBar)

export default withRouter(NavBar)