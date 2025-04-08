//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import Sketch from "react-p5";
import axios from 'axios';
import UserContext from "../../contexts/userContext.js";
import useAPI from '../../hooks/useAPI.tsx'
import { CommentItem } from "../comp/commComp.js"
import { useState, useEffect, useContext } from "react";
import { Outline, wordFiller, countOccurrences } from "../comPuz/puzLook.js";
import { mouseClicked} from "../comPuz/mousCont.js";

let start
let update

//GRID VARS
//grid box size
let boxSize = 50;

//the length of the grid
let xGridAmount = 10;
let yGridAmount = 10;

//the holds the cords for selected boxs
let recX = 0;
let recY = 0;
let boxed = false;


//DATA VARS
let letters = ""
let goal = [];
let goCheck = []
let lines = [];
let newLine = false;
let completion = true;


//MOUSE VARS
//stores if user clicked
let clicked = false;
let secCli = false;
let pause = false;

//CANVAS VARS
//A allows the canvase to be referenced
let border = 100;

//gets sketch size
let xSketchSize
let ySketchSize

//string that holds the placed in letters
let pros
let selectedGoal = -1;

let starter = ""

let comment;

//the puzzle page
export default function PuzPage()
{
  const { postRequest, putRequest } = useAPI();

  //sets up variables
  const [form, setForm] = useState({
    xGrid: 0,
    yGrid: 0,
    addGoal: "",
  });
  
  const [newComm] = useState({
    puzzle_id: "",
    user_id: "",
    text: "",
    file: null
  });

  const {id, session} = useContext(UserContext);
  const [puzzles, setPuzzles] = useState([]); 
  const [comm, setComm] = useState([]);
  const [replies, setReplies] = useState([]);
  const [puzzType, setPuzzType] = useState(0);
  const [errors, setError] = useState("");
  const [users, setUser] = useState([]);
  const _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  
  //gets the puzzle data
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/comments')
    .then(response => {
      let com = []
      let reply = []

      response.data.forEach(dat => {
        if (dat.puzzle_id === _id)
        {
          com.push(dat)
        }
      });

      response.data.forEach(dat => {
        com.forEach(rep => {
          if (dat.puzzle_id === rep._id)
          {
            reply.push(dat)
          }
        });  
      });

      setComm(com);      
      setReplies(reply);
    })
    .catch(e => {
      console.log(e);
    });

    axios.get(`https://puz-sable.vercel.app/api/puzzles/${_id}`)
         .then(response => {
          setPuzzles(response.data);
          starter = response.data.puzzleCode;
         })
         .catch(e => {
          console.log(e);
         });

  }, [_id]);

  //grabs all users that made the puzzles from the database
  useEffect(() => {
    axios.get('https://puz-sable.vercel.app/api/users')
      .then(response => {
        let use = []

        response.data.forEach(dat => 
        {
          for(let i = 0; i < comm.length; i++)
          {
            if (dat._id === comm[i].user_id)
            {
              use.push(dat);
              break;
            }
          };

          for(let i = 0; i < replies.length; i++)
            {
              if (dat._id === replies[i].user_id)
              {
                use.push(dat);
                break;
              }
            };
        });

        setUser(use)
      })
      .catch(e => {
        console.log(e);
      });
  });

  //runs the puzzles function
  if (puzzType === 1)
  {
    wordsearch()
  }
  else
  {
    start = null
    update = null
  }

  //creates a new comment
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
    }, 1000);   
  }

  //grabs all this puzzles comments
  useEffect(() => {
    const mp5 = <Sketch setup={start} draw={update}/>
    return mp5.remove;
  });

  function fillPopUpCom()
  {
    pause = true;

    if (document.querySelector(".popupEdit"))
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

    document.querySelector(".popupComm").style.display = "flex";
  }

  function fillPopUpEdit(comme)
  {
    pause = true;
    comment = comme;

    if (document.querySelector(".popupComm"))
    {
      document.querySelector(".popupComm").style.display = "none";
      document.getElementById("text comm").value = "";
      document.getElementById("file comm").value = null;
    }

    if (document.querySelector(".popupRep"))
    {
      document.querySelector(".popupRep").style.display = "none";
      document.getElementById("text rep").value = "";
      document.getElementById("file rep").value = null;
    }

    document.querySelector(".popupEdit").style.display = "flex";
  }

  function fillPopUpRep(commen)
  {
    pause = true;
    comment = commen

    if (document.querySelector(".popupComm"))
    {
      document.querySelector(".popupComm").style.display = "none";
      document.getElementById("text comm").value = "";
      document.getElementById("file comm").value = null;
    }

    if (document.querySelector(".popupEdit"))
    {
      document.querySelector(".popupEdit").style.display = "none";
      document.getElementById("edit com text").value = "";
      document.getElementById("edit com file").value = null;
    }

    document.querySelector(".popupRep").style.display = "flex";
  }

  function makeReply()
  {
    if (document.getElementById("text rep").value === null || document.getElementById("text rep").value === "") 
    {
      setError("no reply text empty")
    } 
    else
    {
      newComm.puzzle_id = comment._id;
      newComm.user_id = id;
      newComm.text = document.getElementById("text rep").value;
      newComm.file = document.getElementById("file rep").files[0];

      postRequest('https://puz-sable.vercel.app/api/comments', newComm, {
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

    setComm([])
    setReplies([])

    setTimeout(function()
    {
      noPopup();
    }, 1000); 
  }

  function noPopup()
  {
    pause = false;
    document.querySelector(".popupComm").style.display = "none";
    document.getElementById("text comm").value = "";
    document.getElementById("file comm").value = null;

    if (document.querySelector(".popupEdit"))
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

    axios.get('https://puz-sable.vercel.app/api/comments')
    .then(response => {
      let com = []
      let reply = []

      response.data.forEach(dat => {
        if (dat.puzzle_id === _id)
        {
          com.push(dat)
        }
      });

      response.data.forEach(dat => {
        com.forEach(rep => {
          if (dat.puzzle_id === rep._id)
          {
            reply.push(dat)
          }
        });  
      });

      setComm(com);      
      setReplies(reply);
    })
    .catch(e => {
      console.log(e);
    });
  }

  function editor()
  {
    editComm(comment)
  }

  //deletes the users comment
  function destroy(commm, reps)
  {
    comment = commm;

    if (reps !== undefined)
    {
      reps.forEach(rep => {
        axios.delete(`https://puz-sable.vercel.app/api/comments/${rep._id}`, {
        headers: {
          Authorization: `Bearer ${session}`
        }})  
      });
    }
 
    axios.delete(`https://puz-sable.vercel.app/api/comments/${comment._id}`, {
      headers: {
        Authorization: `Bearer ${session}`
    }}) 
      
    setTimeout(function()
    {  
      let com = []
      let reply = []

      axios.get('https://puz-sable.vercel.app/api/comments')
      .then(response => {    
        response.data.forEach(dat => {
          if (dat.puzzle_id === _id)
          {
            com.push(dat)
          }
        });
    
        response.data.forEach(dat => {
          com.forEach(rep => {
            if (dat.puzzle_id === rep._id)
            {
              reply.push(dat)
            }
          });  
        });
      })
      .catch(e => {
        console.log(e);
      });


      setComm(com);      
      setReplies(reply);
    }, 1500); 
  }

  //checks if puzzles exist
  if (!puzzles)
  {
    return(
      <UserContextProvider>
        <div className="align-items-center text-center">
          <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
        
          <div className='align-items-center text-center'>
            <div className="spinner-border" role="status"/>
          </div>
        </div>
      </UserContextProvider>
    )
  }

  //grabs the puzzles variables
  if (starter !== "" && letters === "")
  {
    setPuzzType(Number(starter.split('@ ')[0]))

    setForm(form.xGrid = Number(starter.split('@ ')[1]))
    setForm(form.yGrid = Number(starter.split('@ ')[2]))

    const star = starter.split('@ ')[3]

    for(let i = 0; i < countOccurrences(star, '# '); i++)
    {
      goal.push(star.split('# ')[i])
    }

    letters = star.split('# ')[countOccurrences(star, '# ')]
    xGridAmount = form.xGrid
    yGridAmount = form.yGrid
    xSketchSize = (boxSize * xGridAmount) + border * 2;
    ySketchSize = (boxSize * yGridAmount) + border * 2;  

    return(
      <UserContextProvider>
        <div className="align-items-center text-center">
          <h1 className='align-items-center text-center m-0 my-3'>Loading...</h1>
        
          <div className='align-items-center text-center'>
            <div className="spinner-border" role="status"/>
          </div>
        </div>
      </UserContextProvider>
    )
  }

  //displays the puzzle
  if (puzzType === 1)
  {
  //the puzzle page
  return(
    <UserContextProvider>
      <div className="align-items-center text-center">
        <div className="row">
          <div className="col-2">

          </div>

          <div className="col-8">
            <Sketch setup={start} draw={update}/>
          </div>

          <div className="col-2">

          </div>

          <div className="col-2"></div>

          <div className="col-8">
            <h3 className='align-items-center text-center my-3 redText'>{errors}</h3>

            <div className="align-items-center text-center flex-fill butHov p-0 ms-1">
              <button className="align-items-center text-center w-100 rounded-1 border border-4 border-dark" data-toggle="tooltip" title="Add a comment" onClick={fillPopUpCom}>
                <div className='fw-bolder d-flex flex-row justify-content-center py-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-right me-3 d-md-none d-lg-block" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                  </svg>

                  <p className='my-0 d-none d-md-block'>
                    Comment
                  </p>
               </div>
              </button>
            </div>  

            <ul className='align-items-center text-center'>
            {
              comm.map((s, index) => <li className='align-items-center text-center' key={index}>{CommentItem(true, s, replies, users, id, fillPopUpRep, fillPopUpEdit, destroy)}</li>)
            }
            </ul>
          </div>

          <div className="col-2"></div>
        </div>
      </div>

      <div className="popupComm m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Text" id='text comm'/>
          </div>
          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='file comm'/>
          </div>
      
          <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Back
                </p>
              </div>
            </button>
                
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Creates comment" onClick={makeComm}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Send
                </p>
              </div>
            </button>
          </div>  
        </div>
      </div>
      
      <div className="popupEdit m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Edit message" id='edit com text'/>
          </div>
      
          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='edit com file'/>
          </div>
      
          <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Back
                </p>
               </div>
            </button>
                
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Edits comment" onClick={editor}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Edit
                </p>
              </div>
            </button>
          </div>          
        </div>
      </div>

      <div className="popupRep m-5">
        <div className="popup-content">
          <div>
            <input type="text" className="align-items-center text-center rounded-1 border border-4 border-dark px-5 py-3 w-100" placeholder="Text" id='text rep'/>
          </div>
          <div>
            <input type="file" className="max-logo my-3" placeholder="Image path" id='file rep'/>
          </div>
      
          <div className="align-items-center text-center flex-fill d-flex flex-row butHov p-0 ms-1 my-3">
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark me-2" data-toggle="tooltip" title="Cancel new message" onClick={noPopup}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Back
                </p>
              </div>
            </button>
                
            <button className="align-items-center w-100 text-center rounded-1 border border-4 border-dark ms-2" data-toggle="tooltip" title="Creates comment" onClick={makeReply}>
              <div className='fw-bolder justify-content-center py-3'>
                <p className='my-0'>
                  Send
                </p>
              </div>
            </button>
          </div>  
        </div>
      </div>
    </UserContextProvider>
  )
  }
}

function wordsearch()
{
  //draws once at start
  start = (p5, canvasParentRef) => {
    //draws sketch
    p5.createCanvas(xSketchSize, ySketchSize).parent(canvasParentRef)
    pros = p5

    goal.forEach(go => 
    {
      goCheck.push(false);    
    });
  }
  
  update = (p5) => {
    if (pause === false)
    {
      if (p5.mouseButton === "left")
      {
        let clic = mouseClicked(p5, clicked, boxed, secCli)
        pros = clic[0]
        clicked = clic[1]
        boxed = clic[2]
        secCli = clic[3]
      }

      //moves the text over to the left
      p5.textAlign(p5.LEFT);
      p5.fill(0)

      //refreshs the background
      p5.background(220);
      wordFiller(p5, letters, boxSize, border, countOccurrences)

      //highlights a boxs if the mouse is over it or clicked
      if ((p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border)) || (clicked === true && selectedGoal === -1 && boxed === true))
      {    
        p5.fill(150);
        //draws the square to darken
        p5.rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
  
        p5.fill(0)
        p5.textSize(32);
        p5.textAlign(p5.CENTER, p5.CENTER);
        //console.log(letters.charAt(6 + (9 * ((recY - (border / boxSize)) + ((recX - (border / boxSize)) * ((yGridAmount - 1) * (yGridAmount - 1)))))))

        p5.text(letters.charAt(6 + (9 * ((recY - (border / boxSize)) + ((recX - (border / boxSize)) * yGridAmount)))),
        (recX - (border / boxSize)) * boxSize + border + (boxSize / 2), 
        (recY - (border / boxSize)) * boxSize + border + (boxSize / 2))
    
        //checks if clicked of just hovering over
        if (clicked === false)
        {
          p5.fill(150);
        }
      }  

      if (clicked === true && pros.mouseX >= (0 + border) && pros.mouseX <= (pros.width - border) && pros.mouseY >= (0 + border) && pros.mouseY <= (pros.height - border))
      {
        p5.stroke('black');
        newLine = true;
      }    
      else if (clicked === true && newLine === true)
      {
        p5.stroke('red');
      }

      if (newLine === true)
      {
        searcher(p5)
      }

      if (clicked === true && pros.mouseX >= (0 + border) && pros.mouseX <= (pros.width - border) && pros.mouseY >= (0 + border) && pros.mouseY <= (pros.height - border))
      {
        p5.stroke('black');
        newLine = true;
      }     
      else if (clicked === true && newLine === true)
      {
        p5.stroke('red');
      }
  
      if (secCli === true && clicked === true)
      {
        newLine = false;
        clicked = false;
        secCli = false;
      }

      //draws the outline
      let all = Outline(p5, xGridAmount, yGridAmount, border, clicked, boxSize, selectedGoal, recX, recY)
  
      p5 = all[0]
      xGridAmount = all[1]
      yGridAmount = all[2]
      border = all[3]
      clicked = all[4]
      boxSize = all[5]
      selectedGoal = all[6]
      recX = all[7]
      recY = all[8]

      p5.fill(255)
      p5.textSize(12)
      p5.text(letters, 2, 650, 700)

      //creates borders
      p5.fill(0)
      p5.rect(0, 0, xSketchSize, border)
      p5.rect(0, 0, border, ySketchSize)
      p5.rect(p5.width - border, 0, border, ySketchSize)
      p5.rect(0, p5.height - border, xSketchSize, border)

      //draws all the words in the goal
      completion = true  

      for(let i = 0; i < goal.length; i++)
      {
        p5.textSize(20);
        p5.textAlign(p5.LEFT, p5.CENTER);
        p5.fill(255);
        p5.text(i + 1, 4, border + i * 40 + 20)
        p5.text(goal[i], 16, border + i * 40 + 20)

        if (goCheck[i] === true)
        {
          p5.fill(0);
          p5.strokeWeight(5);
          p5.line(0, border + i * 40 + 20, border, border + i * 40 + 20);
        }
        else
        {
          completion = false
        }
   
        if (i === (goal.length - 1) && goCheck[i] === true && completion === true)
        {
          console.log("Victory")
        }
    
        p5.strokeWeight(0.25);
      }

      p5.stroke('black');
      p5.strokeWeight(5);

      for(let i = 0; i <= lines.length / 4; i++)
      {
        p5.line((lines[i * 4] * boxSize) + border + (boxSize / 2), (lines[1 + (i * 4)] * boxSize) + border + (boxSize / 2), (lines[2 + (i * 4)] * boxSize) + border + (boxSize / 2), (lines[3 + (i * 4)] * boxSize) + border + (boxSize / 2));
      }

      p5.stroke(0);
      p5.strokeWeight(0.25);
    }
  }
}

//hightlights the letters
function searcher(p5)
{
  p5.strokeWeight(5);

  p5.line(recX * boxSize + (boxSize / 2),
       recY * boxSize + (boxSize / 2), 
       p5.mouseX, 
       p5.mouseY)

  if (newLine === true)
  {
    let lengthX = p5.int((p5.mouseX - border) / boxSize) - (recX - 2);
    let lengthY = p5.int((p5.mouseY - border) / boxSize) - (recY - 2);

    if (lengthX < 0)
    {
      lengthX = lengthX * -1
    }

    if (lengthY < 0)
    {
      lengthY = lengthY * -1
    }

    const start = 6 + (9 * ((recY - 2) + ((recX - 2) * yGridAmount)));
    const end = 6 + (9 * (p5.int((p5.mouseY - border) / boxSize) + (p5.int((p5.mouseX - border) / boxSize) * yGridAmount)));
    let exitFor = false;

    for (let c = 0; c < goal.length; c++)
    {  
      if (secCli === true && (goal[c].charAt(0) === letters.charAt(start) || goal[c].charAt(0) === letters.charAt(end)) && goCheck[c] === false && exitFor === false)
      {
        if ((goal[c].length - 1) === lengthX && recY - 2 === p5.int((p5.mouseY - border) / boxSize))    
        { 
          let breaker = false;
          
          for (let i = 1; i < goal[c].length; i++)
          {
            if (((goal[c].charAt(goal[c].length - 1) === letters.charAt(start) && goal[c].charAt(0) === letters.charAt(end)) || (goal[c].charAt(0) === letters.charAt(start) && goal[c].charAt(goal[c].length - 1) === letters.charAt(end))) && breaker === false 
            && (goal[c].charAt(i) === letters.charAt(6 + (9 * ((recY - 2) + (((recX - 2) + i) * yGridAmount)))) 
            || goal[c].charAt((goal[c].length - 1) - i) === letters.charAt(6 + (9 * ((recY - 2) + (((recX - 2) - i) * yGridAmount))))
            || goal[c].charAt((goal[c].length - 1) - i) === letters.charAt(6 + (9 * ((recY - 2) + (((recX - 2) + i) * yGridAmount))))
            || goal[c].charAt(i) === letters.charAt(6 + (9 * ((recY - 2) + (((recX - 2) - i) * yGridAmount))))))
            {
              if (i === goal[c].length - 1)
              {
                goCheck[c] = true
                lines.push(recX - 2,
                  recY - 2, 
                  p5.int((p5.mouseX - border) / boxSize), 
                  p5.int((p5.mouseY - border) / boxSize))
                clicked = false;
                secCli = false;
                newLine = false;
                exitFor = true;
              }
            }
            else
            {
              breaker = true
            }  
          }                
        }
    
        if ((goal[c].length - 1 === lengthY) && recX - 2 === p5.int((p5.mouseX - border) / boxSize))
        {
          let breaker = false;
          for (let i = 1; i < goal[c].length; i++)
          {
            if (((goal[c].charAt(goal[c].length - 1) === letters.charAt(start) && goal[c].charAt(0) === letters.charAt(end)) || (goal[c].charAt(0) === letters.charAt(start) && goal[c].charAt(goal[c].length - 1) === letters.charAt(end))) && breaker === false 
            && (goal[c].charAt(i) === letters.charAt(6 + (9 * (((recY - 2) + i) + ((recX - 2) * yGridAmount)))) 
            || goal[c].charAt(((goal[c].length - 1) - i)) === letters.charAt(6 + (9 * (((recY - 2) - i) + ((recX - 2) * yGridAmount))))
            || goal[c].charAt(((goal[c].length - 1) - i)) === letters.charAt(6 + (9 * (((recY - 2) + i) + ((recX - 2) * yGridAmount))))
            || goal[c].charAt(i) === letters.charAt(6 + (9 * (((recY - 2) - i) + ((recX - 2) * yGridAmount))))))
            {
              console.log("c")              
              if (i === goal[c].length - 1)
              {
                console.log("g")
                goCheck[c] = true
                lines.push(recX - 2,
                  recY - 2, 
                  p5.int((p5.mouseX - border) / boxSize), 
                  p5.int((p5.mouseY - border) / boxSize))
                clicked = false;
                secCli = false;
                newLine = false;
                exitFor = true;
              }
            }
            else
            {
              breaker = true
            }
          }      
        } 
        
        if ((goal[c].length - 1) === lengthY && (goal[c].length - 1) === lengthX && recX - 2 !== p5.int((p5.mouseX - border) / boxSize) && recY - 2 !== p5.int((p5.mouseY - border) / boxSize))
        {          
          let breaker1 = false;
          for (let i = 0; i < goal[c].length; i++)
          {                      
            if (((goal[c].charAt(goal[c].length - 1) === letters.charAt(start) && goal[c].charAt(0) === letters.charAt(end)) || (goal[c].charAt(0) === letters.charAt(start) && goal[c].charAt(goal[c].length - 1) === letters.charAt(end))) && breaker1 === false 
            && (goal[c].charAt((goal.length - 1) - i) === letters.charAt(6 + (9 * (((recY - 2) - i) + (((recX - 2) - i) * yGridAmount)))) || goal[c].charAt((goal.length - 1) - i) === letters.charAt(6 + (9 * (((recY - 2) + i) + (((recX - 2) + i) * yGridAmount))))
            || goal[c].charAt((goal.length - 1) - i) === letters.charAt(6 + (9 * (((recY - 2) + i) + (((recX - 2) - i) * yGridAmount)))) || goal[c].charAt((goal.length - 1) - i) === letters.charAt(6 + (9 * (((recY - 2) - i) + (((recX - 2) + i) * yGridAmount))))       
            || goal[c].charAt(i) === letters.charAt(6 + (9 * (((recY - 2) - i) + (((recX - 2) - i) * yGridAmount)))) || goal[c].charAt(i) === letters.charAt(6 + (9 * (((recY - 2) + i) + (((recX - 2) + i) * yGridAmount))))
            || goal[c].charAt(i) === letters.charAt(6 + (9 * (((recY - 2) + i) + (((recX - 2) - i) * yGridAmount)))) || goal[c].charAt(i) === letters.charAt(6 + (9 * (((recY - 2) - i) + (((recX - 2) + i) * yGridAmount))))))
            {
              if (i === goal[c].length - 1 && goal[c].charAt(goal[c].length - 1))
              {
                goCheck[c] = true;
                lines.push(recX - 2,
                  recY - 2, 
                  p5.int((p5.mouseX - border) / boxSize), 
                  p5.int((p5.mouseY - border) / boxSize))
                clicked = false;
                secCli = false;
                newLine = false;
                exitFor = true;
              }
            }
            else
            {
              breaker1 = true
            }
          }   
        }     
      }
      else if (exitFor === true)
      {
        break;
      }
    }
  }

  p5.stroke(0);
  p5.strokeWeight(0.25);
}