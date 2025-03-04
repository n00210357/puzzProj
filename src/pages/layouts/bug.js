//imports
import axios from 'axios';
import BugItem from '../comp/bugComp.js';
import { useEffect, useState } from 'react';

//shows all the accounts pages
export default function BugReport() {
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
    return ( 
      <div className="align-items-center text-center">
        <button id="clickMe" className="mx-3 my-2" value="INSERT" type="button" onClick={console.log("clicked")}>
          <h6>
            REPORT BUG
          </h6>
        </button>

        <h1>Loading...</h1>
      </div>
    );
  }

  //displays the bugs
  return (
    <div>
      <ul className='row align-items-center text-center'>
      {
        bugs.map((bug, index) => <li className='col-4 align-items-center text-center' key={index}>{BugItem(bug)}</li>)
      }
    </ul>
    </div>
  );
}