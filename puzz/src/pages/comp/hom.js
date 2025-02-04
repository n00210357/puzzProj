import { useContext } from "react";
import UserContext  from "../../contexts/userContext.js";
import UserContextProvider from "../../contexts/userContextProvider.tsx";

export default function HomPage()
{
    const { signOut } = useContext(UserContext);

    const handlePress = () =>
    {  
        signOut();
    }

    //the home page
    return(
        <UserContextProvider>
        <div>
            <nav className="row align-items-center text-center m-2">
                <div className="col-3">
                    <ul className="nav justify-content-start align-items-center text-center">
                        <li className="nav-item px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-star-fill min-logo" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>  
                        </li>

                        <li className="nav-item px-2">
                            <h4 className="fw-bold align-items-center text-center">
                                NAME
                            </h4>  
                        </li>
                    </ul>
                </div>

                <div className="col-6">

                </div>

                <div className="col-3">
                    <button id="clickMe" className="justify-content-end" value="LOGOUT" type="button" onClick={handlePress}>
                        <h3 className="but2">
                            LOGOUT
                        </h3>
                    </button>
                </div>
            </nav>

            <div className="align-items-center text-center">
                <h3>
                    UPDATES
                </h3>

                <h4>
                    Application Version 0.0
                </h4>
            </div>
        </div>
        </UserContextProvider>
    )
}
