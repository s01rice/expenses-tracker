import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import { useSigninCheck } from "reactfire";
import React, { useState } from "react";

function Home(props) {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }


    const { status, data: signInCheckResult } = useSigninCheck();

    if (status === 'loading') {
        return <span>loading...</span>
    }

    if (signInCheckResult.signedIn === true) {
        return <div className="w-full flex h-screen">
            <Profile />
        </div>
    } else {
        return <div className="w-full flex h-screen">
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
            }
        </div>

    }
}

export default Home;