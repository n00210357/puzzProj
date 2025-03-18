//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import img from '../../hooks/userPlaceholder.png';
import { useEffect, useState, useContext } from 'react';

//account pages function
export default function AccoPage() {
  //sets up variables
  const [user, setUser] = useState(null);
  const { session, id, signOut } = useContext(UserContext);
  const [comm, setComm] = useState([]);

  //grabs user from database
  useEffect(() => {
    if (id !== null)
    {
      axios.get(`https://puz-sable.vercel.app/api/users/${id}`,
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

  //warns user of deleting their account
  function warn() 
  {
    if (window.confirm("Are you sure you want to DELETE your account")) 
    {
      destroy()
    } 
  }

  //deletes the users account
  function destroy()
  {
    axios.delete(`https://puz-sable.vercel.app/api/users/${id}`, {
    headers: {
        Authorization: `Bearer ${session}`
    }})
    .then()
    setTimeout(function()
    {
      signOut();
    }, 2000);    
  }
  
  //sets up image
  let image;

  if (user.image_path && user.image_path !== null && user.image_path !== undefined && user.image_path !== "http://api-image.s3.eu-west-1.amazonaws.com/undefined")
  {
    image = user.image_path;
  }
  else
  {
    image = img
  }

  //displays the users account
  return (
    <UserContextProvider>            
      <div className='row align-items-center text-center'>
      <div className="col-4"></div>

        <div className="col-4">
          <div className="card-body align-items-center text-center">
            <img src={image} alt="profile"/>
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.about}</p>
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
        </div>

        <div className="col-4 overflow-scroll">
          <h4>{user.username} & your messages </h4>
          <ul className='align-items-center text-center'>
          {
            //comm.map((s, index) => <li className='align-items-center text-center' key={index}>{CommentItem(s, undefined, user, id, undefined, fillPopUpEdit, destroy)}</li>)
          }
          </ul>
        </div>       
      </div>
    </UserContextProvider>
  );
}