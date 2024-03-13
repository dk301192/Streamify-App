import React, { useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './LoginForm.css';



const LoginForm = ({onLogin}) => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    
    const navigate = useNavigate();

    const[error,setError] = useState('');
    const[message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for progress dialog

 

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!username || !password){
            setError("Please fill in all required fields");
            return;
        }
        setIsLoading(true); // Show progress dialog

            try{

                const response = await axios.post("http://localhost:3000/login",{username,password});
                console.log(response);
                if(response.data.success){
                alert('success');
              //  const data = await response.json();
                 setMessage('Login successful ');

                   setUsername("");
                   setPassword("");
                   onLogin(username);
                   navigate('/movies');
                }
                else
                {  
                       setError(response.data.message);

                }
            }
            catch(error){

                console.error('Error during login:', error);
                setError('An error occurred during login. Please try again.');
            }finally {
                setIsLoading(false); // Hide progress dialog regardless of success or failure

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
                <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
        <div className='modal-content'>
          <div className='loader'></div>
        </div>
      </div>
                
                </div> 
            </form>
        </div>
    )
}

export default LoginForm ;
