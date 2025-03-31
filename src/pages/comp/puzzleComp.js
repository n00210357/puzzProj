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

  if (user === null && (users[1] !== null && users[1] !== undefined))
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
        <div className ="card border border-4 border-darkalign-items-center text-center" style={{minwidth: '400px', minheight: '400px'}}>
          <a className="card-body align-items-center text-center p-0" href={url}>
            <img className='rounded-1 border border-4 border-dark bigImg' src={image} alt="Puzzles pic"/>
            <h4 className='align-items-center text-center my-3'>{puzzle.name}</h4>
            <p className='align-items-center text-center notHov'>Made by {user.username}</p>
            <p className='align-items-center text-center notHov'>Created at {puzzle.createdAt.slice(0, 10)}</p>
          </a>
        </div>
      </UserContextProvider>
    );
  }

  if (user != null)
  //displays the puzzle with the edit and delete buttons
  return (
    <UserContextProvider className="align-items-center text-center">  
      <div className ="card border border-4 border-dark align-items-center text-center" style={{minwidth: '400px', minheight: '400px'}}>
        <a className="card-body align-items-center text-center p-0" href={url}>
          <img className='rounded-1 border border-4 border-dark bigImg' src={image} alt="Your puzzles pic"/>
          <h4 className='align-items-center text-center my-3'>{puzzle.name}</h4>
          <p className='align-items-center text-center notHov'>Made by {user.username}</p>
          <p className='align-items-center text-center notHov'>Created at {puzzle.createdAt.slice(0, 10)}</p>
        </a>

        <div className="align-items-center text-center my-2 d-flex flex-row">
          <div className="col-2 align-items-center text-center flex-fill butHov p-0 ms-1">
            <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Edit this puzzle">
              <a href={editUrl}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>

                  <p className='my-0 d-none d-md-block'>
                    Edit
                  </p>
                </div>
              </a>
            </button>
          </div>   

          <div className="col-2 align-items-center text-center flex-fill butHov p-0 ms-1">
            <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Delete this puzzle" onClick={warn}>
              <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-0-circle-fill me-2 d-md-none d-lg-block" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>

                <p className='my-0 d-none d-md-block'>
                  Delete
                </p>
              </div>
            </button>
          </div>         
        </div>
      </div>
    </UserContextProvider>
  );
}