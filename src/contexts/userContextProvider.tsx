//imports
import React from "react";
import UserContext from "./userContext.js";
import { useStorageState } from '../hooks/useStorageState.ts';

//runs the user context
const UserContextProvider = ({children}) => {
    //sets store data
    const [[isLoading, session ], setSession] = useStorageState('session');
    const [[ isIdLoad, id ], setId] = useStorageState('id');
    const [[ isEmailLoad, email ], setEmail] = useStorageState('email');
    const [[ isPuzzLoad, puzzCode ], setPuzzCode] = useStorageState('puzz');

    //returns the data and nessary functions
    return(
        <UserContext.Provider value={{
            signIn: (data) => {
                toHome(setSession, setId, data, setEmail)
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
            isEmailLoad,
            email,
            isPuzzLoad,
            puzzCode
            }}>
            {children}
        </UserContext.Provider>
    )
}

//signs the user in an brings them to the home page
async function toHome(setSession: (value: string | null) => void, setId: (value: string | null) => void, tokId: { _id: string, token: string, email }, setEmail: (value: string | null) => void)
{
    setId(tokId._id)
    setEmail(tokId.email)
    setSession(tokId.token)
    window.location.href = '/home';
}

//exports context provider
export default UserContextProvider;