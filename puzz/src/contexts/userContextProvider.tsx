import React, { useState } from "react";
import UserContext from "./userContext.js";
import { useStorageState } from '../hooks/useStorageState.ts';

const UserContextProvider = ({children}) => {
    const [[isLoading, session ], setSession] = useStorageState('session');
    const [[ isIdLoad, id ], setId] = useStorageState('id');
    const [[ isPuzzLoad, puzzCode ], setPuzzCode] = useStorageState('puzz');

    return(
        <UserContext.Provider value={{
            signIn: (data) => {
                toHome(setSession, setId, data)
            },
            signOut: () => {
                setSession(null);
                window.location.href = '/';
            },
            rememberedPuz: (data) => {
                setPuzzCode(data)
            },
            forgetPuz: () => {
                setPuzzCode(null)
            },
            session,
            isLoading,
            isIdLoad,
            id,
            isPuzzLoad,
            puzzCode
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