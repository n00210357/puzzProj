//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import img from '../../hooks/userPlaceholder.png';
import { useEffect, useState, useContext } from 'react';

//account pages function
export default function UseLayout() {
  //sets up variables
  const [user, setUser] = useState(null);
  const { session} = useContext(UserContext);
  var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

  //grabs user from database
  useEffect(() => {
    if (_id !== null)
    {
      axios.get(`https://puz-sable.vercel.app/api/users/${_id}`,
      {
        headers: {
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
  });

  //checks for user
  if (user == null)
  {
    return <h1 className="card-body align-items-center text-center">Loading...</h1>
  }
  
  //sets up image
  let image;

  if (user.image_path && user.image_path !== null && user.image_path !== undefined)
  {
    image = user.image_path;
  }
  else
  {
    image = img
  }

  //displays the users account
  return (
    <div>
      <div className='row align-items-center text-center'>
      {
        <UserContextProvider>            
          <div className="card-body align-items-center text-center">
            <img src={image} alt="profile"/>
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.about}</p>
          </div>

          <div className="container align-items-center text-center my-2">      
            <button id="click" className="mx-3 my-2" value="check" type="button">
                <h3 className="but">
                    message
                </h3>
            </button>
          </div>
        </UserContextProvider>
      }
      </div>
    </div>
  );
}