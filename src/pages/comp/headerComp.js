//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import UserContext from "../../contexts/userContext.js";
import { useContext } from "react";

//the header function
export default function Top()
{
    //sets up the abiliy to sign out
    const {email, signOut} = useContext(UserContext);

    const handlePress = () =>
    {  
        signOut();
    }

    //the header
    return(
    <UserContextProvider>
        <nav className="row align-items-center text-center m-2">
            <div className="col-0 col-lg-3 d-flex flex-row">
                <h4 className='align-items-center text-center my-3 d-none d-xl-block pe-1'>Greetings</h4>
                <h4 className='align-items-center text-center my-3 d-none d-lg-block ps-1'>{email}</h4>
            </div>

            <div className="col-4 col-lg-3">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="A page that only shows your puzzles">
                    <a href="/yourPuzzles">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-puzzle-fill me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.5.5 0 0 0-.115.118l-.012.025L6.5 4.5v.003l.003.01q.005.015.036.053a.9.9 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.9.9 0 0 0 .271-.194.2.2 0 0 0 .036-.054l.003-.01v-.008l-.012-.025a.5.5 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.5.5 0 0 0 .115-.118l.012-.025.001-.006v-.003l-.003-.01a.2.2 0 0 0-.036-.053.9.9 0 0 0-.27-.194C8.91 11.1 8.49 11 8 11s-.912.1-1.19.24a.9.9 0 0 0-.271.194.2.2 0 0 0-.036.054l-.003.01v.002l.001.006.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238z"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Your puzzles
                            </p>
                        </div>
                    </a>
                </button>
            </div> 
            </div>

            <div className="col-4 col-lg-3">
            <div className="ms-1 align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="The most recent survey">
                    <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=e5V92hEVQkqy9Xj4R_jIes5I7qOcfq1Ni9f-_MqUtaRUMlk4OFJEMFFOV1ZURE5QTExOV0YwODVFOS4u">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-newspaper me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"/>
                            <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"/>
                        </svg>

                        <div className='d-flex flex-row my-0'>                                
                                <p className='my-0 d-none d-xl-block pe-1'>
                                    User testing
                                </p>
                                

                                <p className='my-0 d-none d-md-block ps-1'>
                                    Survey
                                </p>
                            </div>
                        </div>
                    </a>
                </button>
            </div>       
            </div>  

            <div className="col-4 col-lg-3">
            <div className="align-items-center text-center flex-fill butHov p-0">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Logout and return to start page" onClick={handlePress}>
                    <a href="/">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-l me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                            </svg>

                            <p className='my-0 d-none d-md-block'>
                                Logout
                            </p>
                        </div>
                    </a>
                </button>
            </div>  
            </div>
        </nav>
    </UserContextProvider>
    )
}