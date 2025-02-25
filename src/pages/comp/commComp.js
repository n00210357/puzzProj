//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import ReplyItem from "./replyComp.js";
import { useEffect, useState } from 'react';

//the comment item
export default function CommentItem(comment){
    //sets up the image

    let image;

    if (comment.image_path)
    {
        image = comment.image_path;
    }
    else
    {
        image = null
    }

      //sets up variables
    const [replies, setReplies] = useState([]);

    //grabs the replies from the database
    useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/replies')
         .then(response => {
            if (response.data.comment_id == comment._id)
            {
                setReplies(response.data);
            }
         })
         .catch(e => {
          console.log(e);
         });
    }, []);

    //displays the comment
    return (
        <UserContextProvider>            
            <div className="card-body align-items-center text-center">
                <p className="card-text">{comment.text}</p>

                <ul className='row align-items-center text-center'>
                {
                    replies.map((reply, index) => <li className='col-4 align-items-center text-center' key={index}>{ReplyItem(reply)}</li>)
                }
                </ul>
            </div>
        </UserContextProvider>
    );
}