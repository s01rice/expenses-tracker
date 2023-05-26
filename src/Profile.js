import { useFirebaseApp, useUser } from 'reactfire'
import React, { useState } from "react";

import Logout from "./Logout";

function Profile() {
    const auth = useUser();
    const firebase = useFirebaseApp();

    const profile = {
        name: auth.data.displayName ? auth.data.displayName : "undefined",
        email: auth.data.email,
        uid: auth.data.uid,
    }

    console.log(auth);
    return <>
        <div id='header' className="w-5/6 m-auto border border-blue-300 rounded-lg flex">
            <h1 className="text-xl m-auto">Welcome, {profile.name}!</h1>
            <Logout />
        </div>
    </>
}

export default Profile;