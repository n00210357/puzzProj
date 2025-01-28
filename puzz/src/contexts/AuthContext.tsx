import { createContext, useContext, PropsWithChildren } from 'react';
import { IAuthContext } from '../types';
import { useStorageState } from '../hooks/useStorageState.ts';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import HomePage from '../pages/Home';

const AuthContext = createContext<IAuthContext | null>(null);

// this hook can be used to access the session info
export function useSess() {
    
    const value = useContext(AuthContext);

    if(process.env.NODE_ENV !== 'production')
    {
        if(!value) 
        {
            throw new Error('useSess must be wrapped in a <SessionProvider>');
        }    
    }
    return value as IAuthContext
}

export function SessionProvider(props: PropsWithChildren){
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: (token) => {
                    toHome(setSession, token)
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

async function toHome(setSession: (value: string | null) => void, token: string)
{
    setSession(token);
    
    <Router>
        <Routes>
                <Route
                    path="home"
                    element={<HomePage/>}
                />
        </Routes>
    </Router>
}