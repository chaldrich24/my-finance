import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        // setPassword((password) => hashPassword(password));
        e.preventDefault();
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user.user);
            })
            .catch(err => console.log(err));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user.user);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        props.authListener();
    }, [])

    return (
        <div className='loginWrapper'>
            <form className='loginForm'>
                <div className='loginFormItem'>
                    <label htmlFor='email'>Email </label>
                    <input type='text' id='email' name='email' onChange={(el) => setEmail(el.target.value)} />
                </div>
                <div className='loginFormItem'>
                    <label htmlFor='password'>Password </label>
                    <input type='password' id='password' name='password' onChange={(el) => setPassword(el.target.value)} />
                </div>
                <div className='buttonLogin'>
                    <button onClick={(e) => handleLogin(e)}>Login</button>
                    <button onClick={(e) => handleSignup(e)}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Login;