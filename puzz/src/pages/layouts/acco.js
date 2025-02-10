import { useEffect, useState, useContext } from 'react';
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import img from '../../hooks/placeholder.png'

export default function AccoPage() {
  const [users, setUsers] = useState([]);
  const { session, id, signOut } = useContext(UserContext);
  
  let allow = false;
  let ID = null;
  let image;

  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/users')
         .then(response => {
          setUsers(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if (!users[0])
  {
    return <h1>Loading...</h1>
  }

  if (allow === false)
  {
    for (let i = 0; i < users.length; i++) 
    {
      if (users[i]._id === id)
      {
        allow = true;
        ID = i;
        break;
      }

      allow = false;
    }
  }

  function warn() 
  {
    if (window.confirm("Are you sure you want to DELETE your account")) 
    {
      destroy()
    } 
  }

  function destroy()
  {
    axios.delete(`https://puz-sable.vercel.app/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${session}`
    }})
    .then()
    {
      setTimeout(function(){
        signOut();
      }, 2000);
    }
 }

  if (allow === false) 
  {
    return <h1>Data not found try resigning in</h1>
  }
  
  if (users[ID].image_path)
  {
      image = users[ID].image_path;
  }
  else
  {
    image = img
  }

  return (
    <div>
      <div className='row align-items-center text-center'>
      {
        <UserContextProvider>            
          <div className="card-body align-items-center text-center">
            <img src={image} alt="profile"/>
            <h5 className="card-title">{users[ID].username}</h5>
            <p className="card-text">{users[ID].email}</p>
            <p className="card-text">{users[ID].about}</p>
          </div>

          <div className="container align-items-center text-center my-2">
            <button className="mx-3 my-2">
              <a href="../accoEdit">
                <h3 className="but">
                  EDIT
                </h3>
              </a>
            </button>
      
            <button id="click" className="mx-3 my-2" value="check" type="button" onClick={warn}>
                <h3 className="but">
                    DELETE
                </h3>
            </button>

            </div>
        </UserContextProvider>
      }
      </div>
    </div>
  );
}