//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
//import img from '../../hooks/placeholder.png'

//the comment item
export default function CommentItem(comment){
    //sets up the image

    /*
    let image;

    if (comment.image_path)
    {
        image = comment.image_path;
    }
    else
    {
        image = img
    }
    */

    //displays the comment
    return (
        <UserContextProvider>            
            <div className="card-body align-items-center text-center">
                <p className="card-text">{comment.text}</p>
            </div>
        </UserContextProvider>
    );
}