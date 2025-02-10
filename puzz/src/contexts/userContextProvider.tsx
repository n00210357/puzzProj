import React, { useState } from "react";
import UserContext from "./userContext.js";
import { useStorageState } from '../hooks/useStorageState.ts';

const UserContextProvider = ({children}) => {
    const [[isLoading, session ], setSession] = useStorageState('session');
    const [[ isIdLoad, id ], setId] = useStorageState('id');


    return(
        <UserContext.Provider value={{
            signIn: (data) => {
                toHome(setSession, setId, data)
            },
            signOut: () => {
                setSession(null);
                window.location.href = '/';
            },
            session,
            isLoading,
            isIdLoad,
            id
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

async function toHome(setSession: (value: string | null) => void, setId: (value: string | null) => void, tokId: object)
{
    setId(tokId._id)
    setSession(tokId.token)
    window.location.href = '/home';
}