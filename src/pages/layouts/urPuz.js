//imports
import axios from 'axios';
import PuzzleItem from '../comp/puzzleComp.js';
import UserContext from '../../contexts/userContext.js';
import { useEffect, useState, useContext } from 'react';

//the search page
export default function UrPuzzPage() {
  //sets up variables
  const [puzzles, setPuzzles] = useState([]);
  const [users, setUser] = useState([]);
  const { session, id } = useContext(UserContext);
  let puzCheck = false;
  let useCheck = false;

  //grabs all puzzles from the database
  useEffect(() => {
    if (id !== null && puzCheck === false)
    {
      axios.get('https://puz-sable.vercel.app/api/puzzles')
      .then(response => {
        let puz = []

        response.data.forEach(dat => {
          if (dat.user_id === id)
          {
            puz.push(dat)
          }
        });

        setPuzzles(puz)
        puzCheck = true;
      })
      .catch(e => {
        console.log(e);
      });
    }
  });

    //grabs all users that made the puzzles from the database
    useEffect(() => {
      if (id !== null && useCheck === false)
      {
        axios.get(`https://puz-sable.vercel.app/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${session}`
        }})
        .then(response => {  
          const you = [response.data]
          setUser(you)
          useCheck = true;
        })
        .catch(e => {
          console.log(e);
        });
      }
    });

  //checks for puzzles
  if (puzzles[0])
  {
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

  return <h1 className='align-items-center text-center'>Loading...</h1>
}