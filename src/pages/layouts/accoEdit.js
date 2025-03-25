//imports
import useAPI from '../../hooks/useAPI.tsx'
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import { useEffect, useState, useContext } from 'react';

//the account edit page
export default function AccoEdit() {
    //sets up the variables
    const [user, setUser] = useState(null);
    const { session, id } = useContext(UserContext); 

    //grabs the users acount data
    useEffect(() => 
    { 
        if (id != null)
        {
            axios.get(`https://puz-sable.vercel.app/api/users/${id}`, {
            headers: 
            {
                Authorization: `Bearer ${session}`
            }
            })
            .then(response => {
                setUser(response.data);
             })
             .catch(e => {
                console.log(e);
             });
        }
    
    }, [session, id]);
    
    //sets up form data
    const [form, setForm] = useState({
        username: "",
        email: "",
        about: "",
        file: null
    });

    //assigns form data with user data
    if (user)
    {
        if (!user.image_path || user.image_path == null || user.image_path === undefined)
        {
            form.file = null
        }

        if (form.username === "" || form.username == null || form.username === undefined)
        {
            form.username = user.username
        }

        if (form.email === "" || form.email == null || form.email === undefined)
        {
            form.email = user.email
        }

        if (form.about === "" || form.about == null || form.about === undefined)
        {
            form.about = user.about
        }
    }

    //sets up editing functions
    const { putRequest, loading, error } = useAPI();

    //changes the form
    const handleChange = (e) => {
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

    //updates the users account
    const handleSubmit = () => {

        if (user != null)
        {
            if (!user.image_path || user.image_path == null || user.image_path === undefined)
            {
                form.file = null
            }

            if (form.username == null || form.username === '')
            {
                form.username = user.username
            }
    
            if (form.email == null || form.email === '')
            {
                form.email = user.email
            }
    
            if (form.about == null || form.about === '')
            {
                form.about = user.about
            }
        }

        putRequest(`https://puz-sable.vercel.app/api/users/${id}`, form, {
            headers: {
                "Content_type":"Mulipart/form-data",
                Authorization: `Bearer ${session}`
            }
        });

        if (error === null)
        {
            window.location.href = '/account';
        }
    }

    //warns the user that the are about to change their accounts details
    function warn() 
    {
        if (window.confirm("Are you sure you want to save these edits")) 
        {
            handleSubmit()
        } 
    }

    //displays the page
    if(loading === true) return <h3>Loading API...</h3>
    if(!user) return <h3>user not found</h3>

    return(
        <UserContextProvider>
        <form className="align-items-center text-center my-3" encType="multipart/form">
            <h6 className="fw-bold">Username</h6>
            <input type="text" className="max-logo" placeholder="Username" value={form.username} onChange={handleChange} id='username'></input>
            <div className="mb-3">Your accounts username</div>

            <h6 className="fw-bold">Email</h6>
            <input type="text" className="fmax-logo" placeholder="Email" value={form.email} onChange={handleChange} id='email'></input>
            <div className="mb-3">An email can only be used once</div>

            <h6 className="fw-bold">About</h6>
            <input type="text" className="max-logo" placeholder="About" value={form.about} onChange={handleChange} id='about'></input>
            <div className="mb-3">About</div>

            <input type="file" className="max-logo" placeholder="Image path" onChange={handleChange} id='file' name='file'/>

            <h6 className="fw-bold">{error}</h6>

            <button id="click" className="mx-3 my-2" value="check" type="button" onClick={warn}>
                <h3 className="but">
                    SUBMIT
                </h3>
            </button>
        </form>
        </UserContextProvider>
    )
}