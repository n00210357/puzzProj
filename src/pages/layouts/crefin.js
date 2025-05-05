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
            setTimeout(function()
            {
                window.location.href = '/search';
            }, 10000); 
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

    console.log(form.puzzleCode)
    //displays the finalize page
    return (
    <UserContextProvider>
    <form className="align-items-center text-center my-3 row" encType="multipart/form">
    <div className="col-md-3 col-12"></div>
        <div className="col-md-6 col-12">
            <input type="file" className="max-logo" placeholder="Image path" onChange={handleChange} id='file'/> 

            <h4 className='align-items-center text-center my-3'>What do you want to name your puzzle</h4>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100 maxLen" placeholder="Puzzle name" value={form.name} onChange={handleChange} id='name'/>

            <h3 className='align-items-center text-center my-3 redText'>{error}</h3>

            <div className="align-items-center text-center flex-fill butHov p-0 mx-3 my-3">
                <button id="clickMe" className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" value="CREATE" type="button" onClick={handleSubmit}>
                    <a href="../yourPuzzles">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <p className='my-0'>
                                Create
                            </p>
                        </div>
                    </a>
                </button>
            </div>

            <div className="align-items-center text-center flex-fill butHov p-0 mx-3 my-3">
                <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark">
                    <a href="/create">
                        <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                            <p className='my-0'>
                                Back
                            </p>
                        </div>
                    </a>
                </button>
            </div>
        </div>
    </form>
    </UserContextProvider>
    );
}