import React,{useState} from 'react'
import {auth,fs} from '../Config/config'
import {Link} from 'react-router-dom'
import {useHistory} from'react-router-dom'
export const Signup = () => {
    const history = useHistory();
    const[fullName, setfullname]=useState('');
    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const[errormsg, setErrorMsg]=useState('');
    const[successMsg, setSuccessMsg]=useState('');

        const handelSignup=(e)=>{
            e.preventDefault();
            // console.log(fullName , email , password)
            auth.createUserWithEmailAndPassword(email,password).then((Credentials)=>{
                console.log(Credentials);
                fs.collection('users').doc(Credentials.user.uid).set({
                    fullName: fullName,
                    Email: email,
                    password: password
                }).then(()=>{
                    setSuccessMsg('SignUp Successfull. You will now get automatically redirected to Login');
                    setfullname('');
                    setEmail('');
                    setPassword('');
                    setErrorMsg('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                        history.push('/login');
                    },3000)
                }).catch(error=>setErrorMsg(error.Message));
            }).catch((error)=>{
                setErrorMsg(error.message)
            })
        }
    return (
        <div className='container'>
          <br></br>
          <br></br>
          <h1>SIGN UP</h1>
          <hr></hr>
          {successMsg&&<>
            <div className='success-msg'>{successMsg}</div>
            <br></br>
          </>}
          <form className='form-group' autoComplete='off' onSubmit={handelSignup}>
          <label>Full Name</label>
          <input type ='text'className='form-control' required
          onChange={(e)=>setfullname(e.target.value)} value={fullName}></input>
          <br></br>
          <label>Email</label>
          <input type ='email'className='form-control' required
          onChange={(e)=>setEmail(e.target.value)} value={email}></input>
          <br></br>
          <label>Password</label>
          <input type ='password'className='form-control' required
          onChange={(e)=>setPassword(e.target.value)} value={password}></input>
          <br></br>
          <div className='btn-box'>
            <span>Already have an account Login
                <Link to = 'login' className='link'>Here</Link></span>
                <button type ='Submit' className='btn btn-success btn-md'>SIGN UP</button>
          </div>
          </form>
          {errormsg&&<>
            <br></br>
            <div className='error-msg'>{errormsg}</div>
            
          </>}
        </div>
    )
}