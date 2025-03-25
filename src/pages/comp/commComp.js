//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx"
import img from '../../hooks/userPlaceholder.png'
import { RepItem } from "./repComp.js";

//the comment item       
export function CommentItem(isComm, comment, replies, users, id, fillPopUpRep, fillPopUpEdit, destroy, isMess){
    //sets up the image
    let image = null;
    let user = null;
    let messagedUser = null
    let userImage = null;
    let reps = []
    let repUsers = [];

    if (image === null)
    {
        if (comment.image_path && comment.image_path !== null && comment.image_path !== undefined)
        {
          image = `http://api-image.s3.eu-west-1.amazonaws.com/${comment.image_path}`;
        }
        else
        {
          image = null
        }
    }

    if ((user === null || user === undefined) && isComm === true)
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
    else if (user === null || user === undefined)
    {
        user = users[0];
        messagedUser = users[1];
    }

    if (replies !== undefined)
    {
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
    }
    
    if (user && user !== null && user !== undefined && comment.user_id === user._id)
    {
        if (user.image_path && user.image_path !== null && user.image_path !== undefined)
        {
            if (user.image_path.charAt(0) === "h" && user.image_path.charAt(1) === "t" && user.image_path.charAt(2) === "t" && user.image_path.charAt(3) === "p")
            {
                userImage = user.image_path;
            }
            else if (user.image_path === undefined)
            {
                userImage = img
            }
            else
            {
                userImage = `http://api-image.s3.eu-west-1.amazonaws.com/${user.image_path}`;
            }
        }
        else
        {
          userImage = img
        }
    }
    else if (messagedUser !== null && messagedUser !== undefined && comment.user_id === messagedUser._id)
    {
        if (messagedUser.image_path && messagedUser.image_path !== null && messagedUser.image_path !== undefined)
        {
            if (messagedUser.image_path.charAt(0) === "h" && messagedUser.image_path.charAt(1) === "t" && messagedUser.image_path.charAt(2) === "t" && messagedUser.image_path.charAt(3) === "p")
            {
                userImage = messagedUser.image_path;
            }
            else if (messagedUser.image_path === undefined)
            {
                userImage = img
            }
            else
            {
                userImage = `http://api-image.s3.eu-west-1.amazonaws.com/${messagedUser.image_path}`;
            }
        }
        else
        {
            userImage = img
        }
    }
    else
    {
        userImage = img
    }

    if (userImage.charAt(44) === "u" && userImage.charAt(45) === "n" && userImage.charAt(46) === "d" && userImage.charAt(47) === "e")
    {
        userImage = img
    }

    function runMake()
    {
      fillPopUpRep(comment)
    }

    function editorForm()
    {
      fillPopUpEdit(comment)
    }
    
    //warns user of deleting their comment
    function warn() 
    {
      if (window.confirm("Are you sure you want to DELETE your comment")) 
      {
        destroy(comment, reps)
      } 
    }   

    if (users[0] !== undefined && users[0] !== null && users[1] !== undefined && users[1] !== null && isComm === true &&((comment.user_id === users[1]._id && comment.puzzle_id === users[0]._id) || (comment.user_id === users[0]._id && comment.puzzle_id === users[1]._id)))
    {
        
    }
    else if (isComm === false)
    {
        return;
    }

    //displays the comment
    if (user !== null && userImage !== null && user._id === id && comment.user_id === id && isComm === false)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <div className="d-flex flex-row position-relative">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{user.username}</p>
        
                        <div className="d-flex flex-row position-absolute end-0">
                            <p className="mx-2 mt-2" onClick={editorForm}>Edit</p>
                            <p className="mx-2 mt-2" onClick={warn}>Delete</p>
                        </div>
                    </div>
        
                    <img style={{maxwidth: '100px', maxheight: '100px', width:'100%', height: 'auto'}} src={image} alt=""/>
                    <p className="card-text">{comment.text}</p>
                </div>
            </UserContextProvider>
        );
    }
    else if (isComm === false && messagedUser !== undefined && messagedUser !== null)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <div className="d-flex flex-row position-relative">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{messagedUser.username}</p>
                    </div>
    
                    <img style={{maxwidth: '200px', maxheight: '200px', width:'100%', height: 'auto'}} src={image} alt=""/>
                    <p className="card-text">{comment.text}</p>
                </div>
            </UserContextProvider>
        );
    }

    //displays the comment
    if (user !== null && userImage !== null && user._id === id && comment.user_id === id)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <div className="d-flex flex-row position-relative">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{user.username}</p>

                        <div className="d-flex flex-row position-absolute end-0">
                            <p className="mx-2 mt-2" onClick={runMake}>Reply</p>
                            <p className="mx-2 mt-2" onClick={editorForm}>Edit</p>
                            <p className="mx-2 mt-2" onClick={warn}>Delete</p>
                        </div>
                    </div>

                    <img style={{maxwidth: '200px', maxheight: '200px', width:'100%', height: 'auto'}} src={image} alt=""/>
                    <p className="card-text">{comment.text}</p>

                    <ul className='align-items-center text-center'>
                    {
                        reps.map((rep, index) => <li className='align-items-center text-center' key={index}>{RepItem(rep, repUsers, id, fillPopUpEdit, destroy)}</li>)
                    }
                    </ul>
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

                    <img style={{maxwidth: '200px', maxheight: '200px', width:'100%', height: 'auto'}} src={image} alt=""/>
                    <p className="card-text">{comment.text}</p>

                    <ul className='align-items-center text-center'>
                    {
                        reps.map((rep, index) => <li className='align-items-center text-center' key={index}>{RepItem(rep, repUsers, id, fillPopUpEdit, destroy)}</li>)
                    }
                    </ul>
                </div>
            </UserContextProvider>
        );
    }
}