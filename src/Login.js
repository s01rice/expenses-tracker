import React, { useState } from 'react';
import { useFirebaseApp, useAuth } from 'reactfire';
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = (props) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        error: '',
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: '',
        })
    };

    const auth = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(result => {

            }).catch(error => {
                console.log(error);
                setUser({
                    ...user,
                    error: error.message,
                })
            })
    }

    return (
        <div className='w-full text-center'>
            <h1>Log In</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <input className='border border-blue-300 rounded m-1' type="text" placeholder="Email" name="email" onChange={handleChange} />
                <input className='border border-blue-300 rounded m-1' type="password" placeholder="Password" name="password" onChange={handleChange} />
                <button className='border border-blue-300 rounded m-1' type="submit">Log In</button>
            </form>
            <button className='' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            {user.error && <h4 className='text-red-700'>{user.error}</h4>}
        </div>
    )
};

export default Login;