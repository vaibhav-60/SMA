import React, { useState } from 'react'
import './Signup.scss'
import { Link } from 'react-router-dom'
import { axiosClient } from '../utils/axiosClient';

function SignUp() {
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axiosClient.post('/auth/signup', {
                name,
                email,
                password
            });
            console.log(result);
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <div className='Signup'>
            <div className='Signup-Box'>
                <h2 className='heading'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name' >Name</label>
                    <input type='text' className='name' id='name' onChange={(e) => { setName(e.target.value) }} ></input>
                    <label htmlFor='email' >Email</label>
                    <input type='email' className='email' id='email' onChange={(e) => { setEmail(e.target.value) }}></input>

                    <label htmlFor='password' >password</label>
                    <input type='password' className='password' id='password' onChange={(e) => { setPassword(e.target.value) }}></input>

                    <input type='submit' className='submit' />
                </form>
                <p className='subheading'>Aleardy have an account? <Link to='/login'>Login</Link></p>
            </div>

        </div>
    )
}

export default SignUp
