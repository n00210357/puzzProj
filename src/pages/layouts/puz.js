//imports
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import Sketch from "react-p5";
import axios from 'axios';
import UserContext from "../../contexts/userContext.js";
import CommentItem from "../comp/commComp.js";
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

//the puzzle page
export default function PuzPage()
{
  //sets up variables
  const [form, setForm] = useState({
    xGrid: 0,
    yGrid: 0,
    addGoal: "",
  });
  
  const {id, session} = useContext(UserContext);
  const [puzzles, setPuzzles] = useState([]);  
  const [comments, setComments] = useState([]);
  const [puzzType, setPuzzType] = useState(0);
  const [newComm, setNewComm] = useState(String)
  const [error, setError] = useState("");
  var _id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

  //gets the puzzle data
  useEffect(() => {
    axios.get(`https://puz-sable.vercel.app/api/puzzles/${_id}`)
         .then(response => {
          setPuzzles(response.data);
          starter = response.data.puzzleCode;
         })
         .catch(e => {
          console.log(e);
         });

  }, [_id]);

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

  //changes comments text
  const handleChange = (e) =>//: any) => 
  {
    setNewComm(e.target.value)
  }

  //creates a new comment
  const handlePress = () =>
  {       
    axios.post('https://puz-sable.vercel.app/api/comments/', 
    {
      puzzle_id: _id,
      user_id: id,
      text: newComm
    },
    {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
    .catch(e =>
    {
      setError(e.response.data.message.message);
    })
      
    setNewComm("")
  }

  //grabs all this puzzles comments
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

    const mp5 = <Sketch setup={start} draw={update}/>
    return mp5.remove;
  });

  //checks if puzzles exist
  if (!puzzles)
  {
    return(
      <UserContextProvider>
        <div className="align-items-center text-center">
          <h1>LOADING...</h1>
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
          <h1>LOADING...</h1>
          
          <ul className='align-items-center text-center'>
            {
              comments.map((comment, index) => <li className='align-items-center text-center' key={index}>{CommentItem(comment)}</li>)
            }
          </ul>
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
            <div>
              <p>Add a comment</p>
              <h6 className="fw-bold">{error}</h6>
              <input type="text" className="max-logo" placeholder="New comment" value={newComm} onChange={handleChange} id='newComm'></input>
            </div>
          
            <button id="clickMe" className="mx-3 my-2" value="REGISTER" type="button" onClick={handlePress}>
              Submit comment
            </button>

            <ul className='align-items-center text-center'>
            {
              comments.map((comment, index) => <li className='align-items-center text-center' key={index}>{CommentItem(comment)}</li>)
            }
            </ul>
          </div>

          <div className="col-2"></div>
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
    if (p5.mouseButton === "left")
    {
      let clic = mouseClicked(p5, clicked, boxed, secCli)
      pros = clic[0]
      clicked = clic[1]
      boxed = clic[2]
      secCli = clic[3]
    }
    
    /*
    if (clicked === true && p5.mouseButton == null)
    {
      window.addEventListener("mouseup", function(e)
      {
        let rele = mouseReleased(pros, clicked, border, newLine)
        pros = rele[0]
        clicked = rele[1]
        border = rele[2]
        newLine = rele[3]
      }, false);
    }*/

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