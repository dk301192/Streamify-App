import React, { useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[name,setName] = useState('');
    const[message,setMessage] = useState('');

    const handleSignup = async() => {
        try{

        if(!username || !password || !name){
            setMessage("Please fill in all required fields");
            return;
        }

        const response = await fetch('http://localhost:3000/signup', {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                name
            })
        });

        //parse the json response
        navigate('/login');

       
    }
    catch(error){
        console.log('Error during signup ' + error)
    }
}

return(
    <div>
        <h2 className='text-center text-warning p-5'>Sign Up</h2>
        <form className='sign-log-form'>
            <div className='container'>
                <div className='mb-3'>
                    <label className='form-label'>UserName:</label> <input type='text' className='form-input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='mb-3'>
                <label className='form-label'>password:</label> <input type='password' className='form-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='mb-3'>
                <label className='form-label'>Name:</label> <input type='text' className='form-input'
                    value={name}
                    onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='text-center'>                
                    <button className='btn btn-warning text-dark fw-bold' onClick={() => handleSignup}>Sign Up</button>
                    </div>


            </div>
            {message && <div class="alert alert-danger" role="alert">{message}</div>}
        </form>
       
    </div>
)
};
export default SignUpForm;