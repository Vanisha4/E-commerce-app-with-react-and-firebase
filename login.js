import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../Config/config'
import {useHistory} from'react-router-dom'
export const Login = () => {
    const history = useHistory();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[errormsg, setErrorMsg]=useState('');
    const[successMsg, setSuccessMsg]=useState('');
    const handleLogin=(e)=>{
        e.preventDefault();
        // console.log(email, password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Successfull. You will now get automatically redirected to Hpme page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/');
            },3000)
        }).catch(error=>setErrorMsg(error.Message));
    }
    return (
        <div className='container'>
          <br></br>
          <br></br>
          <h1>LOG IN</h1>
          <hr></hr>
          {successMsg&&<>
            <div className='success-msg'>{successMsg}</div>
            <br></br>
          </>}
          <form className='form-group' autoComplete='off'
          onSubmit={handleLogin}>
          <label>Email</label>
          <input type ='email'className='form-control' required
          onChange={(e)=>setEmail(e.target.value)} value={email}></input>
          <br></br>
          <label>Password</label>
          <input type ='password'className='form-control' required
          onChange={(e)=>setPassword(e.target.value)} value={password}></input>
          <br></br>
          <div className='btn-box'>
            <span>Don't have an account SignUp
                <Link to = 'signup' className='link'>Here</Link></span>
                <button type= 'Submit' className='btn btn-success btn-md'>LOGIN</button>
          </div>
          </form>
          {errormsg&&<>
            <br></br>
            <div className='error-msg'>{errormsg}</div>
            
          </>}
        </div>
    )
}