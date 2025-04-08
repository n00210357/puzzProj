//imports
import axios from 'axios';
import UserItem from '../comp/accountComp.js';
import { useEffect, useState } from 'react';

//shows all the accounts pages
export default function UsersLayout() {
  //sets up variables
  const [users, setUsers] = useState([]);

  //grabs the users from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/users')
         .then(response => {
          setUsers(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  //checks for the users
  if (!users[0])
  {
    return (
      <div>
        <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
        <div className='align-items-center text-center'>
          <div className="spinner-border" role="status"/>
        </div>
      </div>
    );
  }

  //displays the users
  return (
    <div>
      <ul className='row align-items-center text-center'>
      {
        users.map((user, index) => <li className='col-sm-12 col-md-4 align-items-center text-center my-3' key={index}>{UserItem(user)}</li>)
      }
    </ul>
    </div>
  );
}