import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN_USER } from '../api/mutations';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data } = await login({ variables: { email, password } });
        console.log(data, error);
        if (data) {
            localStorage.setItem('token', data.login.token);
            props.setLoggedIn(true);
        }

    }

    return (
        <div className='loginWrapper'>
            <form className='loginForm'>
                <div className='loginFormItem'>
                    <label htmlFor='email'>Email </label>
                    <input type='text' id='email' name='email' onChange={(el) => setEmail(el.target.value.trim())} />
                </div>
                <div className='loginFormItem'>
                    <label htmlFor='password'>Password </label>
                    <input type='password' id='password' name='password' onChange={(el) => setPassword(el.target.value)} />
                </div>
                <div className='buttonLogin'>
                    <button type='submit' onClick={handleLogin}>Login</button>
                    <button onClick={() => { }}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Login;