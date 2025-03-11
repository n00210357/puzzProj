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
    return <h1>Error</h1>
  }

  //displays the users
  return (
    <div>
      <ul className='row align-items-center text-center'>
      {
        users.map((user, index) => <li className='col-4 align-items-center text-center' key={index}>{UserItem(user)}</li>)
      }
    </ul>
    </div>
  );
}