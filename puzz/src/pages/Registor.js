import { useState } from "react";
import { SessionProvider, useSess } from '../contexts/AuthContext.tsx';
import axios from 'axios';

//the registor form

function RegistorForm()
{
    const [form, setForm] = useState(
    {
        rank: "",
        username: "",
        email: "",
        password: "",
        about: "",
        //image_path: string;
    })

    const [error, setError] = useState("");

    //const { signIn } = useSess();
    //console.log("eee")
    //console.log(useSess())

    const handleChange = (e) =>//: any) => 
    {
        setForm(prevState => (
        {
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handlePress = () =>
    {       
        axios.post('https://puz-sable.vercel.app/api/users/register', 
        {
            rank: form.rank,
            username: form.username,
            email: form.email,
            password: form.password,
            about: form.about,
        })
        .then(response =>
        {
            autoLogin(response)
        })
        .catch(e =>
        {
            setError(e.response.data.message.message);
        })
    }

    async function autoLogin(resp)//: any)
    {
        axios.post('https://puz-sable.vercel.app/api/users/login', 
        {
            email: form.email,
            password: form.password
        })

            
        //signIn(resp.data.token);
    }
    
    return(
        <SessionProvider>
        <div className="align-items-center text-center my-3">
            <h6 className="fw-bold">rank</h6>
            <input type="text" className="max-logo" placeholder="Rank" value={form.rank} onChange={handleChange} id='rank'/>
            <div className="mb-3">should be your rank</div>

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
        </div>
        </SessionProvider>
    )
}

export default RegistorForm;

/*
//the styles
const styles = StyleSheet.create(
{
    container: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input:
    {
        height: 40,
        borderWidth: 1,
    },

    smallText:
    {
        fontSize: 10,
        fontWeight: 300, 
        marginBottom: 10
    },

    bigText:
    {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold", 
    },

    startBut:
    {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },

    text:
    {
        fontSize: 32,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: "white"
    },

    border:
    {
        borderWidth:  5,
        borderStyle: "solid",
        borderRadius: 12,
        borderColor: "black",
        marginVertical: 10,
    },
});
*/