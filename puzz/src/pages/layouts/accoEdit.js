import { useEffect, useState, useContext } from 'react';
import useAPI from '../../hooks/useAPI.tsx'
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import UserContextProvider from "../../contexts/userContextProvider.tsx";

export default function AccoEdit() {
    const [user, setUser] = useState(null);
    const { session, id } = useContext(UserContext); 

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
                console.log(response.data);
                setUser(response.data);
             })
             .catch(e => {
                console.log(e);
             });
        }
    
      }, [session, id]);
    
    const [form, setForm] = useState({
        username: "",
        email: "",
        about: "",
    });

    if (user && (form.username === "" || form.username == null || form.username === undefined))
    {
        form.username = user.username
    }

    if (user && (form.email === "" || form.email == null || form.email === undefined))
    {
        form.email = user.email
    }

    if (user && (form.about === "" || form.about == null || form.about === undefined))
    {
        form.about = user.about
    }

    const { putRequest, loading, error } = useAPI();

    const handleChange = (e) => {

        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handleSubmit = () => {

        if (user != null)
        {
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
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            window.location.href = '/account';
        });
    }

    function warn() 
    {
        if (window.confirm("Are you sure you want to save these edits")) 
        {
            handleSubmit()
        } 
    }

    if(loading === true) return <h3>Loading API...</h3>
    if(!user) return <h3>user not found</h3>

    return(
        <UserContextProvider>
        <div className="align-items-center text-center my-3">
            <h6 className="fw-bold">Username</h6>
            <input type="text" className="max-logo" placeholder="Username" value={form.username} onChange={handleChange} id='username'></input>
            <div className="mb-3">Your accounts username</div>

            <h6 className="fw-bold">Email</h6>
            <input type="text" className="fmax-logo" placeholder="Email" value={form.email} onChange={handleChange} id='email'></input>
            <div className="mb-3">An email can only be used once</div>

            <h6 className="fw-bold">About</h6>
            <input type="text" className="max-logo" placeholder="About" value={form.about} onChange={handleChange} id='about'></input>
            <div className="mb-3">About</div>

            <h6 className="fw-bold">{error}</h6>

            <button id="click" className="mx-3 my-2" value="check" type="button" onClick={warn}>
                <h3 className="but">
                    SUBMIT
                </h3>
            </button>
        </div>
        </UserContextProvider>
    )
}