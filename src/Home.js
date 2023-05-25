import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";
import { useUser, useSigninCheck } from "reactfire";
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
        return <Logout />
    } else {
        return <>
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
            }
        </>

    }
}

export default Home;