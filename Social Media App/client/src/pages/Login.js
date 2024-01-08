import React, { useState } from 'react'
import './Login.scss'
import { Link, Navigate } from 'react-router-dom'
import { axiosClient } from '../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../utils/localStorageManager';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axiosClient.post('/auth/login', {
                email,
                password
            });

            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            Navigate('/');
        } catch (error) {
            console.log(error)
        }



    }

    return (
        <div className='Login'>
            <div className='Login-Box'>
                <h2 className='heading'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email' >Email</label>
                    <input type='email' className='email' id='email' onChange={(e) => { setEmail(e.target.value) }}></input>

                    <label htmlFor='password' >password</label>
                    <input type='password' className='password' id='password' onChange={(e) => { setPassword(e.target.value) }}></input>

                    <input type='submit' className='submit' />
                </form>
                <p className='subheading'>Do not have account? <Link to='/signup'>SignUp</Link></p>
            </div>

        </div>
    )
}

export default Login
