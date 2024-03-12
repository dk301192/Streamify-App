import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { Navigate, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[name,setName] = useState('');
    const[message,setMessage] = useState('');

    const handleSignup = async(e) => {
        e.preventDefault();
        try{

        if(!username || !password || !name){
            setMessage("Please fill in all required fields");
            return;
        }
        const response = await axios.post("http://localhost:3000/signup",{username,password,name});
        

        //parse the json response
        //const data = await response.json();
        alert('success');
        //  const data = await response.json();
         navigate('/movies');
      }
      catch(error){
          setMessage("error.response.data.message");
      }
}

return(
    <div>
        <h2>SignUpForm</h2>
        <form>
            <div className='sign-log-form' onSubmit={handleSignup} noValidate>
                <div className='mb-3'>
                    UserName: <input type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    password: <input type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    Name: <input type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)} required />
                </div>

                <button  type='submit'>Sign Up</button>

            </div>
        </form>
        {message && <p>{message}</p>}
    </div>
)
}
export default SignUpForm;