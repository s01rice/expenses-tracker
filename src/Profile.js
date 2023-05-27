import { useFirebaseApp, useUser } from 'reactfire'
import React, { useState } from "react";

import Logout from "./Logout";
import Tracker from "./Tracker";

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
        <div id='container' className="w-5/6 max-w-screen-xl m-auto border border-blue-300 rounded-3xl flex flex-col">
            <div id="header" className="flex justify-between">
                <div id="profile-name" className="flex flex-col mx-8">
                    <h2 className="text-lg text-gray-200">Welcome back!</h2>
                    <h1 className="text-3xl font-semibold">{profile.name}</h1>
                </div>
                <Logout />
            </div>
            <Tracker />
        </div>
    </>
}

export default Profile;