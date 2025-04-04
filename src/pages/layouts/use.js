//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import axios from 'axios';
import UserContext  from "../../contexts/userContext.js";
import img from '../../hooks/userPlaceholder.png';
import PuzzleItem from '../comp/puzzleComp.js';
import useAPI from '../../hooks/useAPI.tsx'
import { CommentItem } from "../comp/commComp.js";
import { useEffect, useState, useContext } from 'react';

let comment;
let comCheck = false;

//account pages function
export default function UseLayout() {
  //sets up variables
  const { postRequest, putRequest, loading, error } = useAPI();
  const [user, setUser] = useState([]);
  const [puzzles, setPuzzles] = useState([]); 
  const { session, id } = useContext(UserContext);
  const [comm, setComm] = useState([]);
  const [errors, setError] = useState("");
  const [newComm] = useState({
    puzzle_id: "",
    user_id: "",
    text: "",
    file: null
  });

  var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  
  //grabs user from database
  useEffect(() => {
    if (_id !== null && id !== null && (user[0] === null || user[0] === undefined))
    {
      let users = []
      axios.get(`https://puz-sable.vercel.app/api/users/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        users[0] = response.data
      })
      .catch(e => {
        console.log(e);
      });

      axios.get(`https://puz-sable.vercel.app/api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      .then(response => {
        users[1] = response.data
        setUser(users)
      })
      .catch(e => {
        console.log(e);
      });
    }

    //grabs all puzzles from the database
    if (puzzles[0] == null)
    {
      axios.get('https://puz-sable.vercel.app/api/puzzles')
      .then(response => {
        let puz = []

          response.data.forEach(pu => {
            if (pu.user_id === _id)
            {
              puz.push(pu);
            }
          });

          setPuzzles(puz);
        })
        .catch(e => {
          console.log(e);
        });
    }

    axios.get('https://puz-sable.vercel.app/api/comments')
    .then(response => {
      if (comm.length === 0)
      {
        let com = []
    
        response.data.forEach(dat => {
          if ((dat.puzzle_id === _id && dat.user_id === id) || (dat.puzzle_id === id && dat.user_id === _id))
          {              
            com.push(dat)
          }
        });

        setComm(com);      
      }
    })
    .catch(e => {
      console.log(e);
    });
  });

  if (comCheck === true && comm.length === 0)
  {
    setTimeout(function()
    {  
      comCheck = false;
    }, 2000); 
  }

  function fillPopUpCom()
  {
    document.querySelector(".popupEdit").style.display = "none";
    document.getElementById("edit com text").value = "";
    document.getElementById("edit com file").value = null;
    document.querySelector(".popupComm").style.display = "flex";
  }

  function fillPopUpEdit(comme)
  {
    comment = comme;

    document.querySelector(".popupComm").style.display = "none";
    document.getElementById("text comm").value = "";
    document.getElementById("file comm").value = null;
    document.querySelector(".popupEdit").style.display = "flex";
  }

  //creates a new s
  const makeComm = () =>
    {       
      newComm.puzzle_id = _id;
      newComm.user_id = id;
      newComm.text = document.getElementById("text comm").value;
      newComm.file = document.getElementById("file comm").files[0];
  
      postRequest('https://puz-sable.vercel.app/api/comments', newComm, {
        headers: {
            "Content_type":"Mulipart/form-data",
            Authorization: `Bearer ${session}`
        }
      })  
  
      setTimeout(function()
      {
        noPopup();
      }, 1500);   
    }

  function editor()
  {
    editComm(comment)
  }

  function editComm(s)
  {
    newComm.puzzle_id = s.puzzle_id;
    newComm.user_id = s.user_id;

    if (document.getElementById("edit com text").value && document.getElementById("edit com text").value !== "" && document.getElementById("edit com text").value !== null && document.getElementById("edit com text").value !== undefined)
    {
      newComm.text = document.getElementById("edit com text").value;
    }
    else
    {
      newComm.text = s.text;
    }

    newComm.file = document.getElementById("edit com file").files[0];

    if (newComm.text === null || newComm.text === "") 
    {
      setError("no reply text empty")
    } 
    else 
    {
      putRequest(`https://puz-sable.vercel.app/api/comments/${s._id}`, newComm, {
        headers: {
          "Content_type":"Mulipart/form-data",
          Authorization: `Bearer ${session}`
        }
      })
    }

    setTimeout(function()
    {
      noPopup();
    }, 1000); 
  }

  //deletes the users comment
  function destroy(commm)
  {
    comment = commm;
 
    axios.delete(`https://puz-sable.vercel.app/api/comments/${comment._id}`, {
      headers: {
        Authorization: `Bearer ${session}`
    }}) 
      
    setTimeout(function()
    {  
      axios.get('https://puz-sable.vercel.app/api/comments')
      .then(response => {
          let com = []
      
          response.data.forEach(dat => {
            if ((dat.puzzle_id === _id && dat.user_id === id) || (dat.puzzle_id === id && dat.user_id === _id))
            {              
              com.push(dat)
            }
          });
          
          setComm(com);    
      })
      .catch(e => {
        console.log(e);
      });     
    }, 1500); 
  }

  function noPopup()
  {
    document.querySelector(".popupComm").style.display = "none";
    document.getElementById("text comm").value = "";
    document.getElementById("file comm").value = null;

    if (document.querySelector(".popupEdit"))
    {
      document.querySelector(".popupEdit").style.display = "none";
      document.getElementById("edit com text").value = "";
      document.getElementById("edit com file").value = null;
    }

    if (document.querySelector(".popupEditRep"))
      {
        document.querySelector(".popupEdit").style.display = "none";
        document.getElementById("edit com text").value = "";
        document.getElementById("edit com file").value = null;
      }

    if (document.querySelector(".popupRep"))
    {
      document.querySelector(".popupRep").style.display = "none";
      document.getElementById("text rep").value = "";
      document.getElementById("file rep").value = null;
    }

    setTimeout(function()
    {  
      axios.get('https://puz-sable.vercel.app/api/comments')
      .then(response => {
        let com = []
    
        response.data.forEach(dat => {
          if ((dat.puzzle_id === _id && dat.user_id === id) || (dat.puzzle_id === id && dat.user_id === _id))
          {              
            com.push(dat)
          }
        });
        
        setComm(com);      
      })
      .catch(e => {
        console.log(e);
      });
    }, 1500); 
  }

  //checks for user
  if (user[0] == null || loading)
  {
    return <h1 className="card-body align-items-center text-center">Loading...</h1>
  }
  
  //sets up image
  let image;

  if (user[0].image_path && user[0].image_path !== null && user[0].image_path !== undefined)
  {
    image = user[0].image_path;
  }
  else
  {
    image = img
  }

    if (image.charAt(44) === "u" && image.charAt(45) === "n" && image.charAt(46) === "d" && image.charAt(47) === "e")
    {
      image = img
    }

  //displays the users account
  return (
    <UserContextProvider>    
      <div>   
          <div className="row"> 
            <div className="col-4 overflow-scroll">
              <h4 className="align-items-center text-center">{user[0].username}'s Puzzles </h4>
              <ul className='align-items-center text-center'>
              {
                puzzles.map((puzzle, index) => <li className='align-items-center text-center my-3' key={index}>{PuzzleItem(puzzle, user, session, id)}</li>)
              }
              </ul>
            </div>
            
            <div className="col-4 align-items-center text-center">
              <div className="card-body align-items-center text-center">
                <img src={image} alt="profile"/>
                <h5 className="card-title">{user[0].username}</h5>
                <p className="card-text">{user[0].email}</p>
                <p className="card-text">{user[0].about}</p>

                <p className="card-text">{error}</p>
                <p className="card-text">{errors}</p>
              </div>     
            </div>

            <div className="col-4 overflow-scroll align-items-center text-center">
              <h4>{user[0].username} & your messages </h4>

              <button id="clickMe" className="align-items-center text-center mx-3 my-2" value="makeComment" type="button" onClick={fillPopUpCom}>
                Message
              </button>     

              <ul className='align-items-center text-center'>
              {
                comm.map((s, index) => <li className='align-items-center text-center' key={index}>{CommentItem(false, s, undefined, user, id, undefined, fillPopUpEdit, destroy)}</li>)
              }
              </ul>
            </div>
          </div>    

      <div className="popupComm m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Text" id='text comm'/>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='file comm'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={makeComm}>
              Confirm
          </button>
        </div>
      </div>

      <div className="popupEdit m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="max-logo m-3" placeholder="Edit comment" id='edit com text'/>
          </div>
          <div>
            <input type="file" className="max-logo" placeholder="Image path" id='edit com file' name='file'/>
          </div>

          <button id="clickMe" className="mx-3 my-2" type="button" onClick={noPopup}>
              Cancel
          </button>

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={editor}>
              Confirm
          </button>
        </div>
      </div>
    </div>
    </UserContextProvider>

    
  );
}