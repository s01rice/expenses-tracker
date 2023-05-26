import React from 'react';
import { useFirebaseApp, useAuth } from 'reactfire';
import { signOut } from 'firebase/auth'

const Logout = () => {
    const auth = useAuth();

    const handleClick = () => {
        signOut(auth);
    }

    return (
        <>
            <button className='border border-blue-300 rounded m-2 py-1 px-4 transition ease-in-out hover:text-white hover:bg-sky-400 duration-100' type="button" onClick={handleClick}>Log Out</button>
        </>
    )
};

export default Logout;