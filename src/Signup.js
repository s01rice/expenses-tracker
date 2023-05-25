import React, { useState } from 'react';
import { useAuth } from 'reactfire';
import { createUserWithEmailAndPassword } from 'firebase/auth'

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
                result.user.updateProfile({
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
        <div className='w-full text-center'>
            <h1>Sign Up</h1>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <input className='border border-blue-300 rounded m-1' type="text" placeholder="Name" name="name" onChange={handleChange} />
                <input className='border border-blue-300 rounded m-1' type="text" placeholder="Email" name="email" onChange={handleChange} />
                <input className='border border-blue-300 rounded m-1' type="password" placeholder="Password" name="password" onChange={handleChange} />
                <button className='border border-blue-300 rounded m-1' type="submit">Sign Up</button>
            </form>
            <button className='' onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
            {user.error && <h4 className='text-red-700'>{user.error}</h4>}
        </div>
    )
};

export default Signup;