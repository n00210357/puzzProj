//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx"
import img from '../../hooks/userPlaceholder.png'
import { RepItem } from "./repComp.js";

//the comment item       
export function CommentItem(comment, replies, users, id, fillPopUpRep, fillPopUpEdit, destroy){
    //sets up the image
    let image = null;
    let user = null;
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

    if (user === null && users === Array)
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
    else
    {
        user = users;
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

    if (userImage === null && user !== null)
    {
        if (user.image_path && user.image_path !== null && user.image_path !== undefined)
        {
            if (user.image_path.charAt(0) === "h" && user.image_path.charAt(1) === "t" && user.image_path.charAt(2) === "t" && user.image_path.charAt(3) === "p")
            {
                userImage = user.image_path;
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

    //displays the comment
    if (user !== null && userImage !== null && user._id === id && users !== Array)
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
    else if (user !== null && userImage !== null && users !== Array)
    {
        return (
            <UserContextProvider>            
                <div className="card-body align-items-center text-center border border-5 m-3">
                    <div className="d-flex flex-row position-relative">
                        <img className="mx-2 mt-2" style={{maxWidth: '50px', height: 'auto'}} src={userImage} alt="profile"/>
                        <p className="mx-0 mt-2">{user.username}</p>
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