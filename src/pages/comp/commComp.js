//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx"
import img from '../../hooks/userPlaceholder.png'
import axios from "axios";
import { RepItem } from "./repComp.js";

//the comment item
export function CommentItem(comment, replies, users, id, makeReply, session, editComm, noPopup){
    //sets up the image
    let image = null;
    let user = null;
    let userImage = null;
    let reps = []
    let repUsers = [];

    if (comment.image_path)
    {
        image = comment.image_path;
    }

    if (user === null)
    {
        for(let i = 0; i < users.length; i++)
        {
            if (comment.user_id === users[i]._id)
            {
              user = users[i];
              break;
            }
        }
    }  

    for(let i = 0; i < replies.length; i++)
    {

        if (replies[i].puzzle_id === comment._id)
        {
            reps.push(replies[i])
        }
    }

    for(let i = 0; i < reps.length; i++)
    {
        for(let x = 0; x < users.length; x++)
        {
            if (reps[i].user_id === users[x]._id)
            {
                repUsers[i] = users[x]
            }
        }
    }

    if (userImage === null && user !== null)
    {
        if (user.image_path && user.image_path !== null && user.image_path !== undefined)
        {
          userImage = `http://api-image.s3.eu-west-1.amazonaws.com/${user.image_path}`;
        }
        else
        {
          userImage = img
        }
    }

    function runMake()
    {
        makeReply(comment._id)
    }

    function editor()
    {
        editComm(comment)
    }

    //deletes the users comment
    function destroy()
    {
        reps.forEach(rep => {
            axios.delete(`https://puz-sable.vercel.app/api/comments/${rep._id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }})  
        });

        axios.delete(`https://puz-sable.vercel.app/api/comments/${comment._id}`, {
        headers: {
            Authorization: `Bearer ${session}`
        }}) 
    }
    
    //warns user of deleting their comment
    function warn() 
    {
        if (window.confirm("Are you sure you want to DELETE your comment")) 
        {
            destroy()
        } 
    }        

    //displays the comment
    if (user !== null && userImage !== null && user._id === id)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <div className="d-flex flex-row position-relative">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{user.username}</p>

                        <div className="d-flex flex-row position-absolute end-0">
                            <p className="mx-2 mt-2" onClick={runMake}>Reply</p>
                            <p className="mx-2 mt-2" onClick={editor}>Edit</p>
                            <p className="mx-2 mt-2" onClick={warn}>Delete</p>
                        </div>
                    </div>

                    <p className="card-text m-0">{image}</p>
                    <p className="card-text">{comment.text}</p>

                    <ul className='align-items-center text-center'>
                    {
                        reps.map((rep, index) => <li className='align-items-center text-center' key={index}>{RepItem(rep, repUsers, id, session, editComm)}</li>)
                    }
                    </ul>
                </div>

                <div className="popupEdit m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Text" id='text edit'></input>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='file edit' name='file'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={editComm}>
              Confirm
          </button>
        </div>
      </div>

      <div className="popupRep m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Text" id='text rep'></input>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='file rep' name='file'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={makeReply}>
              Confirm
          </button>
        </div>
      </div>
            </UserContextProvider>
        );
    }
    else if (user !== null && userImage !== null)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <div className="d-flex flex-row position-relative">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{user.username}</p>

                        <div className="d-flex flex-row position-absolute end-0">
                            <p className="mx-2 mt-2" onClick={runMake}>Reply</p>
                        </div>
                    </div>

                    <p className="card-text m-0">{image}</p>
                    <p className="card-text">{comment.text}</p>

                    <ul className='align-items-center text-center'>
                    {
                        reps.map((rep, index) => <li className='align-items-center text-center' key={index}>{RepItem(rep, repUsers, id, session, editComm)}</li>)
                    }
                    </ul>
                </div>

                <div className="popupRep m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Text" id='text rep'></input>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='file rep' name='file'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={makeReply}>
              Confirm
          </button>
        </div>
      </div>
            </UserContextProvider>
        );
    }
}