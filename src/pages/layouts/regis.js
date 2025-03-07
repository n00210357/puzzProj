//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import useAPI from '../../hooks/useAPI.tsx'
import UserContext  from "../../contexts/userContext.js";
import { useState, useContext } from "react";

//the registor form
function Registor()
{
    //sets up variables
    const [form, setForm] = useState(
    {
        username: "",
        email: "",
        password: "",
        about: "",
        file: null
    })

    const {signIn} = useContext(UserContext);

    //updates the forms variables
    const handleChange = (e) =>//: any) => 
    {
        if (e.target.id !== "file")
        {
            setForm(prevState => ({
                ...prevState,
                [e.target.id]: e.target.value
            }));
        }
        else
        {
            setForm(prevState => ({
                ...prevState,
                [e.target.id]: e.target.files[0]
            }));
        }
    }
     
    //sets up editing functions
    const { postRequest, loading, error } = useAPI();

    //creates the users new account
    const handlePress = () =>
    {     
        postRequest('https://puz-sable.vercel.app/api/users/register', form, {
            headers: {
                "Content_type":"Mulipart/form-data",
            }
        }, (resp) => {
            console.log(resp)
            autoLogin(resp)
        });
    }

    //logs the new user in
    async function autoLogin(resp)//: any)
    {
        axios.post('https://puz-sable.vercel.app/api/users/login', 
        {
            email: form.email,
            password: form.password
        })
        .then(response =>
        {
            signIn(response.data);
        })
    }

    if (loading) return <h1>Loading</h1>

    //displays the register page
    return(
        <UserContextProvider>
        <form className="align-items-center text-center my-3" action="/upload" method="POST" encType="multipart/form">
            <h6 className="fw-bold">Username</h6>
            <input type="text" className="max-logo" placeholder="Username" value={form.username} onChange={handleChange} id='username'></input>
            <div className="mb-3">Your accounts username</div>

            <h6 className="fw-bold">Email</h6>
            <input type="text" className="fmax-logo" placeholder="Email" value={form.email} onChange={handleChange} id='email'></input>
            <div className="mb-3">An email can only be used once</div>

            <h6 className="fw-bold">Password</h6>
            <input type="text" className="max-logo" placeholder="Password" value={form.password} onChange={handleChange} id='password'></input>
            <div className="mb-3">Should be 6 or more characters</div>

            <h6 className="fw-bold">About</h6>
            <input type="text" className="max-logo" placeholder="About" value={form.about} onChange={handleChange} id='about'></input>
            <div className="mb-3">About</div>

            <h6 className="fw-bold">Image</h6>
            <input type="file" className="max-logo" placeholder="Image path" onChange={handleChange} id='file' name='file'/>
            <div className="mb-3">Optional image must be a jpg, jpeg, png or a gif</div>

            <h6 className="fw-bold">{error}</h6>

            <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={handlePress}>
                <h3 className="but">
                    Register
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
        </form>
        </UserContextProvider>
    )
}

//exports the registor form
export default Registor;