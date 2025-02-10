import { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from '../comp/accountComp.js';

export default function AccoPage() {
  const [users, setUsers] = useState([]);

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
    return <h1>Error</h1>
  }

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