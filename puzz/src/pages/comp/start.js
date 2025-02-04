import { useContext } from "react";
import UserContext  from "../../contexts/userContext.js";
import UserContextProvider from "../../contexts/userContextProvider.tsx";

export default function StartForm()
{
    const {session, signOut} = useContext(UserContext);

    const handlePress = () =>
    {  
        signOut();
    }

    //the start form
    if (session) return(
    <UserContextProvider>
        <div className="align-items-center text-center my-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-star-fill max-logo" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>

            <h1 className="fw-bold display-1">
                NAME
            </h1>
        </div>

        <div className="container align-items-center text-center">
            <div>
                <button className="mx-3 my-2">
                    <a href="../home">
                        <h3 className="but">
                            Already LOGGED IN
                        </h3>
                    </a>
                </button>
            </div>

            <div>
                <button id="clickMe" className="mx-3 my-2" value="LOGOUT" type="button" onClick={handlePress}>
                    <h3 className="but">
                        LOGOUT
                    </h3>
                </button>
            </div>
        </div>
    </UserContextProvider>
    );

    return(
        <UserContextProvider>
            <div className="align-items-center text-center my-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-star-fill max-logo" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>

                <h1 className="fw-bold display-1">
                    NAME
                </h1>
            </div>

            <div className="container align-items-center text-center my-2">
                <button className="mx-3 my-2">
                    <a href="../login">
                        <h3 className="but">
                            LOGIN
                        </h3>
                    </a>
                </button>
      
                <button className="mx-3 my-3">
                    <a href="../register">
                        <h3 className="but">
                            REGISTER
                        </h3>
                    </a>
                </button>

            </div>
        </UserContextProvider>
    )
}