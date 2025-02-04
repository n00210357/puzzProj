import React from "react";
import UserContext from "./userContext.js";
import { useStorageState } from '../hooks/useStorageState.ts';

const UserContextProvider = ({children}) => {
    const [[isLoading, session], setSession] = useStorageState('session');

    return(
        <UserContext.Provider value={{
            signIn: (token) => {
                toHome(setSession, token)
            },
            signOut: () => {
                setSession(null);
            },
            session,
            isLoading
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

async function toHome(setSession: (value: string | null) => void, token: string)
{
    setSession(token)
    window.location.href = '/home';
}