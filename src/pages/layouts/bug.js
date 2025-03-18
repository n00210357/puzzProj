//imports
import axios from 'axios';
import BugItem from '../comp/bugComp.js';
import useAPI from '../../hooks/useAPI.tsx'
import UserContext from "../../contexts/userContext.js";
import { useEffect, useState, useContext } from 'react';

let bug;

//shows all the accounts pages
export default function BugReport() {
  //sets up variables
  const [newBug] = useState({
    puzzle_id: "",
    user_id: "",
    text: "",
    fixed: false,
    file: null
  });

  const { postRequest, putRequest } = useAPI();
  const { id, session } = useContext(UserContext);
  const [errors, setError] = useState("");
  const [bugs, setBugs] = useState([]);
  const [users, setUser] = useState([]);

  //grabs the bugs from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/bugs')
         .then(response => {
          setBugs(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

    //grabs all users that made the puzzles from the database
    useEffect(() => {
      axios.get('https://puz-sable.vercel.app/api/users')
        .then(response => {
          let use = []
  
          response.data.forEach(dat => 
          {
            for(let i = 0; i < bugs.length; i++)
            {
              if (dat._id === bugs[i].user_id)
              {
                use.push(dat);
                break;
              }
            };
          })
  
          setUser(use)
        })
        .catch(e => {
          console.log(e);
        });
    });

  //creates a new bug
  const makeBug = () =>
    {       
      newBug.puzzle_id = null;
      newBug.user_id = id;
      newBug.text = document.getElementById("text comm").value;
      newBug.fixed = false;
      newBug.file = document.getElementById("file comm").files[0];
  
      postRequest('https://puz-sable.vercel.app/api/bugs', newBug, {
        headers: {
            "Content_type":"Mulipart/form-data",
            Authorization: `Bearer ${session}`
        }
      })  
  
      setTimeout(function()
      {
        noPopup();
      }, 1000);   
    }

    function fillPopUpCom()
    {
      if (document.querySelector(".popupEdit"))
      {
        document.querySelector(".popupEdit").style.display = "none";
        document.getElementById("edit com text").value = "";
        document.getElementById("edit com file").value = null;  
      }

      document.querySelector(".popupComm").style.display = "flex";
    }

  function fillPopUpEdit(bu)
  {
    bug = bu;

    if (document.querySelector(".popupComm").style.display)
    {
      document.querySelector(".popupComm").style.display = "none";
      document.getElementById("text comm").value = "";
      document.getElementById("file comm").value = null;
    }

    document.querySelector(".popupEdit").style.display = "flex";
  }

  function editComm(s)
  {
    newBug.puzzle_id = s.puzzle_id;
    newBug.user_id = s.user_id;

    if (document.getElementById("edit com text").value && document.getElementById("edit com text").value !== "" && document.getElementById("edit com text").value !== null && document.getElementById("edit com text").value !== undefined)
    {
      newBug.text = document.getElementById("edit com text").value;
    }
    else
    {
      newBug.text = s.text;
    }

    newBug.fixed = false
    newBug.file = document.getElementById("edit com file").files[0];

    if (newBug.text === null || newBug.text === "") 
    {
      setError("no reply text empty")
    } 
    else 
    {
      putRequest(`https://puz-sable.vercel.app/api/bugs/${s._id}`, newBug, {
        headers: {
          "Content_type":"Mulipart/form-data",
          Authorization: `Bearer ${session}`
        }
      })
    }

    setBugs([])

    setTimeout(function()
    {
      noPopup();
    }, 1000); 
  }

  //deletes the users bug
  function destroy(bu)
  {
    bug = bu;
 
    axios.delete(`https://puz-sable.vercel.app/api/bugs/${bug._id}`, {
      headers: {
        Authorization: `Bearer ${session}`
    }}) 
      
    setTimeout(function()
    {  
      axios.get('https://puz-sable.vercel.app/api/bugs')
      .then(response => {    
        setBugs(response.data);      
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

    axios.get('https://puz-sable.vercel.app/api/bugs')
    .then(response => {
      setBugs(response.data)  
    })
    .catch(e => {
      console.log(e);
    });
  }

  function editor()
  {
    editComm(bug)
  }

  //checks for the bugs
  if (!bugs[0])
  {
    return ( 
      <div className="align-items-center text-center">
        <button id="clickMe" className="mx-3 my-2" value="INSERT" type="button" onClick={fillPopUpCom}>
          <h6>
            REPORT BUG
          </h6>
        </button>

        <h4>{errors}</h4>

        <h1>Loading...</h1>

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

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={makeBug}>
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
    );
  }

  //displays the bugs
  return (
    <div className="align-items-center text-center">
      <button id="clickMe" className="mx-3 my-2" value="INSERT" type="button" onClick={fillPopUpCom}>
        <h6>
          REPORT BUG
        </h6>
      </button>

      <h4>{errors}</h4>

      <ul className='row align-items-center text-center'>
      {
        bugs.map((bug, index) => <li className='col-4 align-items-center text-center' key={index}>{BugItem(bug, users, id, fillPopUpEdit, destroy)}</li>)
      }
    </ul>

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

          <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={makeBug}>
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

    
  );
}