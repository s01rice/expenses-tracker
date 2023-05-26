import React, { useState } from 'react';
import { useAuth } from 'reactfire';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const Signup = (props) => {
    const [user, setUser] = useState({
        name: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: user.name,
                })
            }).catch(error => {
                console.log(error);
                setUser({
                    ...user,
                    error: error.message,
                })
            })
    }

    return (
        <div className='w-96 m-auto text-center border border-blue-300 rounded-3xl py-20 px-14 bg-sky-50'>
            <h1 className="text-2xl">Sign Up</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <h1 className='text-left mx-2 mt-2 px-1'>name</h1>
                <input className='border border-blue-300 rounded-md mx-2 mb-2 p-1 focus:outline-none focus:ring-1 focus:ring-sky-400' type="text" placeholder="John" name="name" onChange={handleChange} />
                <h1 className='text-left mx-2 mt-2 px-1'>email</h1>
                <input className='border border-blue-300 rounded-md mx-2 mb-2 p-1 focus:outline-none focus:ring-1 focus:ring-sky-400' type="text" placeholder="smith@example.com" name="email" onChange={handleChange} />
                <h1 className='text-left mx-2 mt-2 px-1'>password</h1>
                <input className='border border-blue-300 rounded-md mx-2 mb-2 p-1 focus:outline-none focus:ring-1 focus:ring-sky-400' type="password" placeholder="********" name="password" onChange={handleChange} />
                <button className='bg-white border border-blue-300 rounded-md m-2 p-1 transition ease-in-out hover:text-white hover:bg-sky-400 duration-200' type="submit">Sign Up</button>
            </form>
            <button className='text-xs' onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
            {user.error && <h4 className='text-red-700 text-xs'>{user.error}</h4>}
        </div>
    )
};

export default Signup;