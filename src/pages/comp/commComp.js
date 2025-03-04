//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import { useEffect, useState } from 'react';



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

                }
                </ul>
            </div>
        </UserContextProvider>
    );
}