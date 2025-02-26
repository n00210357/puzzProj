//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReplyItem from "./replyComp.js";

/*
export function CallCommItem(_id)
{
    //sets up variables
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);

    //grabs the replies from the database
    useEffect(() => {
        axios.get('https://puz-sable.vercel.app/api/comments')
        .then(response => {
          let da = []
          response.data.forEach(d => {
            
            if (d.puzzle_id === _id)    
            {
              da.push(d)
            }  
            
          });
          setComments(da);
        })
        .catch(e => {
         console.log(e);
        });

        axios.get('https://puz-sable.vercel.app/api/replies')
        .then(response => {
            let da = []
            response.data.forEach(data => {
              
                comments.forEach(comment => {
                    if (data.comment_id === comment._id)    
                    {
                        da.push(data)
                    }    
                });
                
                setReplies(da);
            })
        }, [])
        .catch(e => {
            console.log(e);
        })
    })

    const coRe = [comments, replies]
    return (coRe)       
}*/

//the comment item
export function CommentItem(comment){
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

    //displays the comment
    return (
        <UserContextProvider>            
            <div className="card-body align-items-center text-center">
                <p className="card-text">{comment.text}</p>

                <ul className='row align-items-center text-center'>
                {
                    //replies.map((reply, index) => <li className='col-4 align-items-center text-center' key={index}>{ReplyItem(reply)}</li>)
                }
                </ul>
            </div>
        </UserContextProvider>
    );
}