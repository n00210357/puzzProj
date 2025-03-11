//imports
import axios from 'axios';
import PuzzleItem from '../comp/puzzleComp.js';
import UserContext from '../../contexts/userContext.js';
import { useEffect, useState, useContext } from 'react';

//the search page
export default function SeaPage() {
  //sets up variables
  const [puzzles, setPuzzles] = useState([]);
  const [users, setUser] = useState([]);
  const { session, id } = useContext(UserContext);

  //grabs all puzzles from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/puzzles')
      .then(response => {
        setPuzzles(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  //grabs all users that made the puzzles from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/users')
      .then(response => {
        let use = []

        response.data.forEach(dat => 
        {
          for(let i = 0; i < puzzles.length; i++)
          {
            if (dat._id === puzzles[i].user_id)
            {
              use.push(dat);
              break;
            }
          };
        });

        setUser(use)
      })
      .catch(e => {
        console.log(e);
      });
  });

  //checks for puzzles
  if (!puzzles[0])
  {
    return <h1 className='align-items-center text-center'>Loading...</h1>
  }

  //displays the search page
  return (
    <div>
      <ul className='row align-items-center text-center'>
      {
        puzzles.map((puzzle, index) => <li className='col-4 align-items-center text-center' key={index}>{PuzzleItem(puzzle, users, session, id)}</li>)
      }
      </ul>
    </div>
  );
}