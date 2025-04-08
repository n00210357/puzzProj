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
        });

        setTimeout(function()
        {
            autoLogin()
        }, 1500); 
    }

    //logs the new user in
    async function autoLogin()//: any)
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
        <form className="align-items-center text-center my-3 container" encType="multipart/form">
            <h6 className='align-items-center text-center mt-4 mb-0'>Username</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Username" value={form.username} onChange={handleChange} id='username'/>
            <p className="align-items-center text-center notHov">What do you want to be referred to as</p>

            <h6 className='align-items-center text-center mt-4 mb-0'>Email</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Email" value={form.email} onChange={handleChange} id='email'/>
            <p className="align-items-center text-center notHov">Each email can only be used once</p>

            <h6 className='align-items-center text-center mt-4 mb-0'>Password</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Password" value={form.password} onChange={handleChange} id='password'/>
            <p className="align-items-center text-center notHov">Should be 6 or more characters</p>

            <h6 className='align-items-center text-center mt-4 mb-0'>About</h6>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="About" value={form.about} onChange={handleChange} id='about'/>
            <p className="align-items-center text-center notHov">What do you want users to know about you</p>

            <h6 className='align-items-center text-center mt-4 mb-0'>Image</h6>
            <input type="file" className="max-logo" placeholder="Image path" onChange={handleChange} id='file' name='file'/>
            <p className="align-items-center text-center notHov">OPTIONAL, image must be a jpg, jpeg, png or a gif</p>

            <h3 className='align-items-center text-center my-3 redText'>{error}</h3>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1 my-3">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Make account" onClick={handlePress}>
                    <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-i me-md-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>

                        <p className='my-0 d-none d-md-block'>
                            Register
                        </p>
                    </div>
                </button>
            </div>    

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1 my-3">
                <a href="https://puzzlehoster.netlify.app/">
                    <div className='fw-bolder d-flex flex-row justify-content-center py-3 align-items-center text-center w-100 rounded-1 border border-4 border-dark startLink'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left me-md-3 d-md-none d-lg-block" me-md-3 d-md-none d-lg-block viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>

                        <p className='my-0 d-none d-md-block'>
                            Back
                        </p>
                    </div>
                </a>
            </div>   
        </form>
        </UserContextProvider>
    )
}

//exports the registor form
export default Registor;