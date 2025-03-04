//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/puzzlePlaceholder.png'

//the puzzle item
export default function PuzzleItem(puzzle){
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

    //creates the url
    let url = `puzz/${puzzle._id}`

    //displays the puzzle
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