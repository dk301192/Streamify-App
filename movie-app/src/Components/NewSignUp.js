import React, { useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { setGlobal } from "./globals";

const NewSignUp = ({onLogin}) => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[name,setName] = useState('');

    const navigate = useNavigate();

    const[error,setError] = useState('');
    const[message,setMessage] = useState('');

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if(name.trim() === ''){
            newErrors.name = "Please enter name";
            isValid = false;
        }
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
        
        if(!username || !password || !name){
            setError("Please fill in all required fields");
            return;
        }
            
            try{
                const response = await axios.post("http://localhost:3000/signup",{username,password,name});
                if(response.data.success){
                   setMessage("Signup successfull");
                   alert("done");
                 
                   setUsername("");
                   setPassword("");
                   setName("");
                   onLogin(username);
                   navigate('/movies');
                }
               else
                   setError(response.data.message);

              //  const data = await response.json();
               
            }
            catch(error){
                setError("Something went wrong"+error);
            }
        
    };

    const handleFocus = () => {
        setError('');
        setMessage('')
    }

    return(
        <div>
            <h2 className='text-center text-warning p-5'>Sign Up</h2>
            <form className='sign-log-form' onSubmit={handleSubmit} noValidate>
            <div>
                    <label className='form-label'>Name</label>
                    <input className='form-input' type="text" value={name} onFocus={handleFocus}
                    onChange={(e)=>{setName(e.target.value)}} 
                    required />
                    {error && <p className='error'>{error.name}</p>}
                </div>
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
                {error && <div  className='alert alert-danger mt-3' role='alert'>{error}</div>}
                {message && <div className='alert alert-warning mt-3' role='alert' >{message}</div>}
                </div> 
            </form>
        </div>
    )
}

export default NewSignUp ;
