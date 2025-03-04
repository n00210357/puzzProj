//imports
import axios from 'axios';
import PuzzleItem from '../comp/puzzleComp.js';
import UserContext from '../../contexts/userContext.js';
import { useEffect, useState, useContext } from 'react';

//the search page
export default function UrPuzzPage() {
  //sets up variables
  const [puzzles, setPuzzles] = useState([]);
  const { session, id } = useContext(UserContext);

  //grabs all puzzles from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/puzzles')
      .then(response => {
        let puz = []

        response.data.forEach(dat => {
            console.log("")
          if (dat.user_id == id)
          {
            puz.push(dat)
          }
        });

        setPuzzles(puz)
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

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
        puzzles.map((puzzle, index) => <li className='col-4 align-items-center text-center' key={index}>{PuzzleItem(puzzle, session, id)}</li>)
      }
      </ul>
    </div>
  );
}