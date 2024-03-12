import React, { useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { setGlobal } from "./globals";

const LoginForm = ({onLogin}) => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    
    const navigate = useNavigate();

    const[error,setError] = useState('');
    const[message,setMessage] = useState('');

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if(username.trim() === ""){
            newErrors.username = "Please enter user name";
            isValid = false;
        }

        if(password.trim() === ''){
            newErrors.password = "Please enter password";
            isValid = false;
        }

        setError(newErrors);
        return isValid;
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(validateForm){
            try{

                const response = await axios.post("http://localhost:3000/login",{username,password});
                //console.log(response);
                setMessage('Login successful ');
                if(response.data.success)
                alert('success');
              //  const data = await response.json();
                  setGlobal({ USER_NAME : username });
                   setUsername("");
                   setPassword("");
                   onLogin(username);
               navigate('/movies');
            }
            catch(error){

                setError();
            }
        }
    };

    const handleFocus = () => {
        setError('');
        setMessage('')
    }

    return(
        <div>
            <h2 className='text-center text-warning p-5'>Login</h2>
            <form className='sign-log-form' onSubmit={handleSubmit} noValidate>
                <div>
                    <label className='form-label'>Username</label>
                    <input className='form-input' type="text" value={username} onFocus={handleFocus}
                    onChange={(e)=>{setUsername(e.target.value)}} 
                    required />
                    {error && <p className='error'>{error.username}</p>}
                </div>

                <div>
                    <label className='form-label'>Password</label>
                    <input className='form-input' type="password" value={password} onFocus={handleFocus}
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    required />
                    {error && <p className='error'>{error.password}</p>}
                </div>
                <div className='text-center'> 
                <button className='btn btn-warning' type="submit">Login</button>
                {error && <div style={{color:'red'}}>{error}</div>}
                {message && <div style={{color:'green'}}>{message}</div>}
                </div> 
            </form>
        </div>
    )
}

export default LoginForm ;
