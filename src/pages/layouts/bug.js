//imports
import axios from 'axios';
import BugItem from '../comp/bugComp.js';
import { useEffect, useState } from 'react';

//shows all the accounts pages
export default function AccoPage() {
  //sets up variables
  const [bugs, setBugs] = useState([]);

  //grabs the bugs from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/bugs')
         .then(response => {
          setBugs(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  //checks for the bugs
  if (!bugs[0])
  {
    return <h1>Error</h1>
  }

  //displays the bugs
  return (
    <div>
      <ul className='row align-items-center text-center'>
      {
        bugs.map((bug, index) => <li className='col-4 align-items-center text-center' key={index}>{UserItem(bug)}</li>)
      }
    </ul>
    </div>
  );
}