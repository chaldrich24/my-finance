import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const createUser = async (userInfo) => {
    //     try {
    //         setDoc((db, 'users', userInfo.uid), {
    //             email: userInfo.email,
    //             uid: userInfo.uid
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // const handleSignup = async (e) => {
    //     // setPassword((password) => hashPassword(password));
    //     e.preventDefault();
    //     console.log(email, password);
    //     try {
    //         const {user} = await createUserWithEmailAndPassword(auth, email, password);
    //         await setDoc(doc(db, 'users', user.uid), {
    //             email: user.email,
    //             uid: user.uid
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((user) => {
    //             console.log(user.user);
    //         })
    //         .catch(err => console.log(err));
    // }

    useEffect(() => {

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
                    <button onClick={() => {}}>Login</button>
                    <button onClick={() => {}}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Login;