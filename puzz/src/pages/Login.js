import { useState } from 'react';
import axios from 'axios';
import { useSess } from '../contexts/AuthContext.tsx';

export default function LoginForm()
{
    const [form, setForm] = useState(
    {
        email: "",
        password: ""
    })

    const [error, setError] = useState("");
    //const { signIn } = useSess();

    const handleChange = (e) =>//: any) =>
    {
        setForm(prevState => 
        ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handlePress = () =>
    {
        axios.post('https://puz-sable.vercel.app/api/users/login', 
        {
            email: form.email,
            password: form.password
        })
        .then(response =>
        {
            //signIn(response.data.token);
        })
        .catch(e =>
        {
            setError(e.response.data.message);
        })
    }

    //the login form
    return(
        <div className="align-items-center text-center my-3">
            <div className="align-items-center text-center my-3">
                <div className="align-items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-star-fill max-logo-2" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>

                    <h1 className="fw-bold display-5">
                        Login
                    </h1>
                </div>
            </div>

            <h6 className="fw-bold">Email</h6>
            <input type="text" className="fmax-logo" placeholder="Email" value={form.email} onChange={handleChange} id='email'></input>

            <h6 className="fw-bold">Password</h6>
            <input type="text" className="max-logo" placeholder="About" value={form.password} onChange={handleChange} id='password'></input>

            <h6 className="fw-bold">{error}</h6>

            <button id="clickMe" className="mx-3 my-2" value="Login" type="button" onClick={handlePress}>
                <h3 className="but">
                    Login
               </h3>
            </button>

            <div>
                <button className="mx-3 my-2">
                    <a href="../">
                        <h3 className="but">
                            Back
                        </h3>
                    </a>
                </button>
            </div>
        </div>
    )
}