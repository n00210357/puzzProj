//imports
import axios from 'axios';
import PuzzleItem from '../comp/puzzleComp.js';
import { useEffect, useState } from 'react';

//the search page
export default function SeaPage() {
  //sets up variables
  const [puzzles, setPuzzles] = useState([]);

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
        puzzles.map((puzzle, index) => <li className='col-4 align-items-center text-center' key={index}>{PuzzleItem(puzzle)}</li>)
      }
      </ul>
    </div>
  );
}