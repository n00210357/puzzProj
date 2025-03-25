//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/puzzlePlaceholder.png'
import axios from 'axios';

//the puzzle item
export default function PuzzleItem(puzzle, users, session, id){
  //sets up image
  let image = null;
  let user = null;

  if (image === null)
  {
    if (puzzle.image_path && puzzle.image_path !== null && puzzle.image_path !== undefined)
    {
      image = `http://api-image.s3.eu-west-1.amazonaws.com/${puzzle.image_path}`;
    }
    else
    {
      image = img
    }
  }

  if (user === null && (users[1] !== null || users[1] !== undefined))
  {
    for(let i = 0; i < users.length; i++)
    {
      if (puzzle.user_id === users[i]._id)
      {
        user = users[i];
        break;
      }
    }
  } 
  else
  {
    user = users
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
    if (puzzle.user_id !== id && user != null)
    {
      return (
        <UserContextProvider className="align-items-center text-center">  
          <div className ="card border border-5 align-items-center text-center" style={{minwidth: '400px', minheight: '400px'}}>
            <a className="card-body align-items-center text-center p-0" href={url}>
              <img style={{maxwidth: '400px', maxheight: '400px', width:'100%', height: 'auto'}} src={image} alt="profile"/>
              <h5 className="card-title">{puzzle.name}</h5>
              <p className="card-text m-0">Made by {user.username}</p>
              <p className="card-text m-0">Created at {puzzle.createdAt.slice(0, 10)}</p>
            </a>
          </div>
        </UserContextProvider>
      );
    }

    if (user != null)
    //displays the puzzle with the edit and delete buttons
    return (
      <UserContextProvider className="align-items-center text-center">  
        <div className ="card border border-5 align-items-center text-center" style={{minwidth: '400px', minheight: '400px'}}>
          <a className="card-body align-items-center text-center p-0" href={url}>
            <img style={{maxwidth: '400px', maxheight: '400px', width:'100%', height: 'auto'}} src={image} alt="profile"/>
            <h5 className="card-title">{puzzle.name}</h5>
            <p className="card-text m-0">Made by {user.username}</p>
            <p className="card-text m-0">Created at {puzzle.createdAt.slice(0, 10)}</p>
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
        </div>
      </UserContextProvider>
    );
}