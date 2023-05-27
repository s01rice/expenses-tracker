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
        <div className='w-96 m-auto text-center border border-blue-300 rounded-3xl py-20 px-14 bg-sky-50 shadow-lg'>
            <h1 className="text-2xl">Log In</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <h1 className='text-left mx-2 mt-2 px-1'>email</h1>
                <input className='border border-blue-300 rounded-md mx-2 mb-2 p-1 shadow-md focus:outline-none focus:ring-1 focus:ring-sky-400' type="text" placeholder="smith@example.com" name="email" onChange={handleChange} />
                <h1 className='text-left mx-2 mt-2 px-1'>password</h1>
                <input className='border border-blue-300 rounded-md mx-2 mb-2 p-1 shadow-md focus:outline-none focus:ring-1 focus:ring-sky-400' type="password" placeholder="********" name="password" onChange={handleChange} />
                <button className='bg-white border border-blue-300 rounded-md m-2 p-1 shadow-md transition ease-in-out hover:text-white hover:bg-sky-400 duration-200' type="submit">Log In</button>
            </form>
            <button className='text-xs' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            {user.error && <h4 className='text-red-700 text-xs'>{user.error}</h4>}
        </div>
    )
};

export default Login;