//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/puzzlePlaceholder.png'
import UserContext from '../../contexts/userContext.js';
import axios from 'axios';
import {useContext } from 'react';

//the puzzle item
export default function PuzzleItem(puzzle, session, id){
  //sets up image
  let image;

  if (puzzle.image_path && puzzle.image_path !== null && puzzle.image_path !== undefined)
  {
    image = `http://api-image.s3.eu-west-1.amazonaws.com/${puzzle.image_path}`;
  }
  else
  {
    image = img
  }

    //creates the urls
    const url = `puzz/${puzzle._id}`
    const editUrl = `editPuzz/${puzzle._id}`

    //warns user of deleting their puzzle
    function warn() 
    {
      if (window.confirm("Are you sure you want to DELETE your puzzle")) 
      {
        destroy()
      } 
    }

    //deletes the user's puzzle
    function destroy()
    {
      axios.delete(`https://puz-sable.vercel.app/api/puzzles/${puzzle._id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }})  
    }

    //displays the puzzle
    if (puzzle.user_id != id)
    {
      return (
        <UserContextProvider>            
          <a className="card-body align-items-center text-center" href={url}>
            <div>
              <img src={image} alt="profile"/>
              <h5 className="card-title">{puzzle.name}</h5>
              <p className="card-text">{puzzle.puzzleCode}</p>
            </div>
          </a>
        </UserContextProvider>
      );
    }

    //displays the puzzle with the edit and delete buttons
    return (
      <UserContextProvider>            
        <a className="card-body align-items-center text-center" href={url}>
          <div>
            <img src={image} alt="profile"/>
            <h5 className="card-title">{puzzle.name}</h5>
            <p className="card-text">{puzzle.puzzleCode}</p>
          </div>
        </a>

        <div className="container align-items-center text-center my-2">
          <button className="mx-3 my-2">
            <a href={editUrl}>
              <h3 className="but">
                EDIT
              </h3>
            </a>
          </button>

          <button id="click" className="mx-3 my-2" value="check" type="button" onClick={warn}>
            <h3 className="but">
              DELETE
            </h3>
          </button>
        </div>
      </UserContextProvider>
    );
}