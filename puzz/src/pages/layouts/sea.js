import { useEffect, useState } from 'react';
import axios from 'axios';
import PuzzleItem from '../comp/puzzleComp.js';

export default function SeaPage() {
  const [puzzles, setPuzzles] = useState([]);

  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/puzzles')
         .then(response => {
          setPuzzles(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if (!puzzles[0])
  {
    return <h1>Error</h1>
  }

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