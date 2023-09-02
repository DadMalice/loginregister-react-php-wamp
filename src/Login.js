import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost/loginAuth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.text();
  
        try {
          const jsonData = JSON.parse(data);
  
          if (jsonData.success) {
            // Pass the username as state to the /home route
            navigate('/home', { state: { username } });
  
            alert("You are logged in");
            console.log(jsonData.message);
          } else {
            setErrorMessage(jsonData.message); // Set the error message
          }
        } catch (error) {
          setErrorMessage('Invalid response from server'); // Set the error message for invalid JSON format
          console.error('error', error);
        }
      } else {
        setErrorMessage('Network error'); // Set the error message for network errors
      }
    } catch (error) {
      setErrorMessage('An error occurred'); // Set a generic error message for other errors
      console.error('error', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white px-6 pt-5 pb-8 shadow-xl sm:max-w-lg sm:rounded-lg sm:px-10'>
        <div className='40-w p-10 rounded'>
          <form>
            <h1 className='text-black text-4xl text-center pb-5'>Taters Exam Sign In</h1>
            {errorMessage && <div className='text-red-500 text-center mb-2'>{errorMessage}</div>}
            <div className='mb-2 text-black pb-1 pt-1 text-center'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                placeholder='Enter Username'
                className='input input-bordered input-primary w-full max-w-lg text-white'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-2 text-black pb-1 pt-1 text-center'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                className='input input-bordered input-primary w-full max-w-lg text-white'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-2 text-center'>
              <input type='checkbox' className='form-check-input' id='check' />
              <label htmlFor='check' className='form-check-label text-black'>
                {' '}
                Remember me
              </label>
            </div>
            <div className='d-grid text-center'>
              <button
                className='btn btn-wide bg-green-500 text-black'
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <p className='text-right'>
          Not yet registered?{' '}
          <Link to='/signup' className='ms-2 text-blue-500'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
