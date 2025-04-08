//imports
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useState, useContext } from "react";

//the login form
export default function LoginForm()
{
    //sets up variables
    const [form, setForm] = useState(
    {
        email: "",
        password: ""
    })

    const [error, setError] = useState("");
    const {signIn} = useContext(UserContext);

    //changes the data in the form
    const handleChange = (e) =>//: any) =>
    {
        setForm(prevState => 
        ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    //signs the user in
    const handlePress = () =>
    {
        axios.post('https://puz-sable.vercel.app/api/users/login', 
        {
            email: form.email,
            password: form.password
        })
        .then(response =>
        {
            //id = response.data._id
            signIn(response.data);
        })
        .catch(e =>
        {
            setError(e.response.data.message);
        })
    }

    //the login form
    return(
        <UserContextProvider>
            <div className="align-items-center text-center my-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-puzzle-fill align-items-center text-center notHov" viewBox="0 0 16 16">
                    <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.5.5 0 0 0-.115.118l-.012.025L6.5 4.5v.003l.003.01q.005.015.036.053a.9.9 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.9.9 0 0 0 .271-.194.2.2 0 0 0 .036-.054l.003-.01v-.008l-.012-.025a.5.5 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.5.5 0 0 0 .115-.118l.012-.025.001-.006v-.003l-.003-.01a.2.2 0 0 0-.036-.053.9.9 0 0 0-.27-.194C8.91 11.1 8.49 11 8 11s-.912.1-1.19.24a.9.9 0 0 0-.271.194.2.2 0 0 0-.036.054l-.003.01v.002l.001.006.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238z"/>
                </svg>

                <h1 className="align-items-center text-center m-3">
                    Puzzle Hoster
                </h1>
            </div>

            <div className="align-items-center text-center my-3">
                <h2 className="align-items-center text-center my-3">Email</h2>
                <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Email" value={form.email} onChange={handleChange} id='email'></input>

                <h2 className="align-items-center text-center my-3">Password</h2>
                <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Password" value={form.password} onChange={handleChange} id='password'></input>

                <h3 className='align-items-center text-center my-3 redText'>{error}</h3>

                <div className='align-items-center text-center'>
                    <div className="align-items-center text-center flex-fill butHov p-0 ms-1 my-4">
                        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark maxLen" data-toggle="tooltip" title="Sign in" onClick={handlePress}>
                            <div className='fw-bolder d-flex flex-row justify-content-center py-3'>                              
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-i me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>

                                <p className='my-0 d-none d-md-block'>
                                    Login
                                </p>
                            </div>
                        </button>
                    </div>  
                

                    <div className="align-items-center text-center flex-fill butHov p-0 ms-1 my-4">
                        <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark maxLen" data-toggle="tooltip" title="Go back to start">
                            <a href="https://puzzlehoster.netlify.app/">
                                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-l me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                    <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                                </svg>

                                    <p className='my-0 d-none d-md-block'>
                                        Back
                                    </p>
                                </div>
                            </a>
                        </button>
                    </div>  
                </div>  
            </div>
        </UserContextProvider>
    )
}