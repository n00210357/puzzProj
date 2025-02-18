import UserContextProvider from "../../contexts/userContextProvider.tsx";
import img from '../../hooks/placeholder.png'

//the puzzle item
export default function PuzzleItem(puzzle){
    let image;

    if (puzzle.image_path)
    {
        image = puzzle.image_path;
    }
    else
    {
        image = img
    }
    let url = String("puzz/"+`${puzzle._id}`)
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