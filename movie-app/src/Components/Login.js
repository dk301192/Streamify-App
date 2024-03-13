import React, { useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = ({onLogin}) => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    
    const navigate = useNavigate();

    const[error,setError] = useState('');
    const[message,setMessage] = useState('');

 

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!username || !password){
            setError("Please fill in all required fields");
            return;
        }
        
            try{

                const response = await axios.post("http://localhost:3000/login",{username,password});
                //console.log(response);
                setMessage('Login successful ');
                if(response.data.success)
                alert('success');
              //  const data = await response.json();
                   setUsername("");
                   setPassword("");
                   onLogin(username);
               navigate('/movies');
            }
            catch(error){

                setError();
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
                {error && <div  className='alert alert-danger mt-3' role='alert'>{error}</div>}
                {message && <div className='alert alert-warning mt-3' role='alert' >{message}</div>}
                </div> 
            </form>
        </div>
    )
}

export default LoginForm ;
