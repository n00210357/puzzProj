//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import UserContext from '../../contexts/userContext';
import useAPI from '../../hooks/useAPI.tsx'
import { useState, useContext } from 'react';

//the create conformation page
export default function CreFinPage() {
    //creates variables
    const {session, id, puzzCode} = useContext(UserContext);

    const { postRequest, loading, error } = useAPI();

    const [form, setForm] = useState({
        user_id: id,
        name: "",
        puzzleCode: puzzCode,
        file: null
    });

    //updates the forms variables
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

    //submits the users puzzle to the database
    const handleSubmit = () => {
        console.log(form);

        postRequest('https://puz-sable.vercel.app/api/puzzles', form, {
            headers: {
                "Content_type":"Mulipart/form-data",
                Authorization: `Bearer ${session}`
            }
        }, (data) => {
            window.location.href = '/search';
        });
    }

    //sets up new puzzle details
    if (form.user_id == null || form.user_id === '')
    {
        form.user_id = id
    }

    if (form.puzzleCode == null || form.puzzleCode === '')
    {
        form.puzzleCode = puzzCode
    }

    if(loading === true) return <h1>Loading API...</h1>

    //displays the finalize page
    return (
    <UserContextProvider>
    <form className="align-items-center text-center my-3" encType="multipart/form">
        <input type="file" className="max-logo" placeholder="Image path" onChange={handleChange} id='file'/> 

        <h6 className="fw-bold">Name</h6>
        <input type="text" className="max-logo" placeholder="Name" value={form.name} onChange={handleChange} id='name'></input>
        <div className="mb-3">Name</div>

            <h6 className="fw-bold">{error}</h6>

            <button id="clickMe" className="mx-3 my-2" value="CREATE" type="button" onClick={handleSubmit}>
                <h3 className="but">
                    Create
                </h3>
            </button>

            <div>
                <button className="mx-3 my-2">
                    <a href="/create">
                        <h3 className="but">
                            Back
                        </h3>
                    </a>
                </button>
            </div>

    </form>
    </UserContextProvider>
    );
}