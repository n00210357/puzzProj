import { useState, useEffect, useContext } from "react";
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import Sketch from "react-p5";
import UserContext from '../../contexts/userContext';

import { Outline, wordFiller, countOccurrences } from "../comPuz/puzLook.js";
import { mouseClicked } from "../comPuz/mousCont.js";

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
let filling = 0;
let dragDropDir = 0;
let boxed = false;
let droppable = false;
let hovingOverButton = false;
let letters = "0, 0, A"//, 0, 1, C, 0, 2, E, 0, 5, F, 0, 9, G";
let inputError = "";
let goal = [];
let goCheck = []

//MOUSE VARS
//stores if user clicked
let clicked = false;


//CANVAS VARS
//A allows the canvase to be referenced
let border = 100;

//gets sketch size
let xSketchSize
let ySketchSize

//string that holds the placed in letters
const regex = /[^A-Za-z0-9]/;
let pros
let selectedGoal = -1;

export default function CrePage()
{
  const {rememberedPuz, puzzCode} = useContext(UserContext);

  hovingOverButton = false;

  function dontDeselect()
  {
    hovingOverButton = true;
  }

  const [form, setForm] = useState({
    xGrid: 0,
    yGrid: 0,
    addGoal: "",
  });

  const [puzzType, setPuzzType] = useState(0);

  const [puzVal, setPuzVal] = useState(0)

  if (puzzType === 1)
  {
    window.setInterval(rememberWork, 10000);
    wordsearch()
  }
  else if (puzzCode !== null)
  {
    start = null
    update = null
    //recoverWork()
  }
  else
  {
    start = null
    update = null
  }

  function goalAdder()
  {
    if (selectedGoal !== -1)
    {
      clicked = true
    }

    //inserts if text box not empty
    if (form.addGoal !== "" && form.addGoal != null)
    {
      //when pressed will attempt to insert the input boxs value into the goal 
      addToGoal(pros, form.addGoal)
    }  
  }

  //when button pressed it will delete the selected goal
  function removal()
  {
    if (selectedGoal !== -1)
    {
      clicked = true
    }

    if (selectedGoal >= 0 && selectedGoal <= goal.length - 1)
    {
      removeFromGoal(pros)
    } 
  } 

  //allows the fill button to be pressed
  function gridFiller()
  {
    if (selectedGoal !== -1)
    {
      clicked = true
    }

    filling = 1;
    checkAllGrid(pros)  
  }
    
  //allows the finsh button to be pressed
  function lastCheck()
  {
    if (selectedGoal != -1)
    {
      clicked = true
    }
    
    rememberWork()
    finalCheck(pros)
  }

  function rememberWork()
  {
    let puzCoding = String(puzzType) + "@ "
    puzCoding = puzCoding + xGridAmount + "@ " + yGridAmount + "@ "
    
    for(let x = 0; x < goal.length; x++)
    {
      if (x <= goal.length - 1)
      {
        puzCoding = puzCoding + goal[x] + "# "
      }
    }

    puzCoding = puzCoding + letters

    if (puzzCode !== puzCoding)
    {
      rememberedPuz(puzCoding)
    }
  }

  function recoverWork()
  {
    if (Number(puzzCode.split('@ ')[0]) === 1)
    {
      setPuzzType(Number(puzzCode.split('@ ')[0]))

      setForm(form.xGrid = Number(puzzCode.split('@ ')[1]))
      setForm(form.yGrid = Number(puzzCode.split('@ ')[2]))
      
      const star = puzzCode.split('@ ')[3]

      for(let i = 0; i < countOccurrences(star, '# '); i++)
      {
        goal.push(star.split('# ')[i])
      }

      letters = star.split('# ')[countOccurrences(star, '# ')]
      xGridAmount = form.xGrid
      yGridAmount = form.yGrid
      xSketchSize = (boxSize * xGridAmount) + border * 2;
      ySketchSize = (boxSize * yGridAmount) + border * 2;
    }
    else
    {
      rememberedPuz(null)
    }
  }

  function labelPuzzleType()
  {
    if (puzVal === 0)
    {
      return(<p className="align-items-center text-center m-0">Choose a puzzle</p>)
    }
    else if (puzVal === 1)
    {
      return(<p className="align-items-center text-center m-0">Wordsearch</p>)
    }
  }

  async function startPuz()
  {
    xGridAmount = form.xGrid
    yGridAmount = form.yGrid

    xSketchSize = (boxSize * xGridAmount) + border * 2;
    ySketchSize = (boxSize * yGridAmount) + border * 2;
    
    if (puzVal == 0)
    {
      setPuzzType(0)
    }
    else if (puzVal == 1)
    {
      setPuzzType(1)
    }
  }

  function wrongPuz()
  {
    xSketchSize = undefined
    rememberedPuz(null)
    setPuzzType(0)
  }

  const handleChange = (e) => {
    setForm(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }));
  }

  function handleSelect(event)
  {
    setPuzVal(event.target.value)
  }

  useEffect((puzzType) => {
    if (puzzType !== 0)
    {
      const mp5 = <Sketch setup={start} draw={update}/>
      return mp5.remove;
    }
  }, []);

  if (puzzType === 0)
  {
    return(
      <UserContextProvider>
        <div className="align-items-center text-center my-3 row">
          <h2>Select the puzzles details</h2>   
          <div className="row"> 
            <div className="col-4"></div>

            <div className="col-4">
            
            <label className="my-3">
              {labelPuzzleType()}

              <select id="puzSel" onChange={handleSelect}>
                <option value={0}>Not selected</option>
                <option value={1}>Wordsearch</option>
              </select>
            </label>

              <p>The amount of boxes on the X axis</p>
              <div>
                <input type="text" className="max-logo" placeholder="xGrid" value={form.xGrid} onChange={handleChange} id='xGrid'                  
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) 
                    {
                      event.preventDefault();
                    }}
                  }>
                </input>
              </div>

              <p>The amount of boxes on the Y axis</p>
              <div>
                <input type="text" className="max-logo" placeholder="yGrid" value={form.yGrid} onChange={handleChange} id='yGrid'                  
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) 
                    {
                      event.preventDefault();
                    }}
                  }>
                </input>
              </div>

              <button id="start" className="mx-3 my-2" type="button" onClick={startPuz}>
                <h6>
                  START
                </h6>
              </button>
            </div>

            <div className="col-4"></div>
          </div>
        </div>
      </UserContextProvider>
    );
  }

    //the word search page
    if (puzzType === 1)
    {
    return(
      <UserContextProvider>
        <div className="align-items-center text-center my-3 row">
          <div className="col-2 align-items-center text-center ">
            <input type="text" className="max-logo position-relative top-50 start-50" placeholder="addGoal" value={form.addGoal} onChange={handleChange} id='addGoal'></input>

            <button id="clickMe" className="mx-3 my-2 position-relative top-50 start-50" value="INSERT" type="button" onMouseEnter={dontDeselect} onClick={goalAdder}>
              <h6>
                insert into goal
              </h6>
            </button>

            <button id="clickMe" className="mx-3 my-2 position-relative top-50 start-50" value="INSERT" type="button" onMouseEnter={dontDeselect} onClick={removal}>
              <h6>
                delete from goal
              </h6>
            </button>

            <button id="clickMe" className="mx-3 my-2 position-relative top-50 start-50" value="INSERT" type="button" onMouseEnter={dontDeselect} onClick={gridFiller}>
              <h6>
                fill grid gaps
              </h6>
            </button>

            <button id="clickMe" className="mx-3 my-2 position-relative top-50 start-50" value="INSERT" type="button" onMouseEnter={dontDeselect} onClick={lastCheck}>
              <h6>
                finshed puzzle
              </h6>
            </button>

            <button id="clickMe" className="mx-3 my-2 position-relative top-50 start-50" value="INSERT" type="button" onMouseEnter={dontDeselect} onClick={wrongPuz}>
              <h6>
                back
              </h6>
            </button>
          </div>

          <div className="col-8">
            <Sketch setup={start} draw={update}/>
          </div>

          <div className="col-2">

          </div>
        </div>
      </UserContextProvider>
    )
}}

function wordsearch()
{    
  //draws once at start
  start = (p5, canvasParentRef) => {
    //draws sketch
    p5.createCanvas(xSketchSize, ySketchSize).parent(canvasParentRef)
    pros = p5
  }

  update = (p5) => {
    if (p5.mouseButton === "left")
    {
      let clic = mouseClicked(p5, clicked, boxed)
      pros = clic[0]
      clicked = clic[1]
      boxed = clic[2]
    }

    //moves the text over to the left
    p5.textAlign(p5.LEFT);

    //refreshs the background
    p5.background(220);

    //highlights a boxs if the mouse is over it or clicked
    if ((p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border)) || (clicked === true && selectedGoal === -1 && boxed === true))
    {
      //checks if clicked of just hovering over
      if (clicked === false)
      {
        p5.fill(150);
      }
      else if ((clicked === true && selectedGoal === -1) || boxed === true)
      {
        boxed = true;
        p5.fill(50);
      }

      //draws the square to darken
      p5.rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
    }  
    else if(selectedGoal !== -1 && ((p5.mouseX >= p5.width || p5.mouseX >= 0) || (p5.mouseY >= p5.width || p5.mouseY >= 0)))
    {
      boxed = false;

      if (clicked === false && hovingOverButton === false)
      {
        selectedGoal = -1;
      }
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
  
    //refreshs selected goal
    if (p5.clicked === false && droppable === false)
    {
      selectedGoal = -1
    }
  
    //when space bar click it checks the grid
    if (selectedGoal === -1 && p5.keyIsPressed && p5.keyCode === 32)
    {
      checkAllGrid(p5)
    }

    wordFiller(p5, letters, boxSize, border)
    puzzleKey(p5);

    //fills the grid
    p5.fill(255)
    p5.textAlign(p5.CENTER)
    p5.textSize(12);
    p5.text(letters, 1, p5.height - (border - 24), xSketchSize)

    //allows the user to add to the grid
    if (clicked === true && selectedGoal === -1 && (p5.keyIsPressed && ((p5.keyCode >= 65 && p5.keyCode <= 90) || (p5.keyCode >= 97 && p5.keyCode <= 122))))
    {
      addToGrid(null, p5)
      p5.keyCode = null;
      clicked = false;    
    }
  }
    if (pros !== undefined)
    {
      let clic = mouseClicked(pros, clicked, boxed)
      pros = clic[0]
      clicked = clic[1]
      boxed = clic[2]
    }
}

//allows the user to add a Letter to the grid
function addToGrid(dragged, p5)
{  
  //checks if user is draggin a word form goal or just adding a single letter
  if (dragged === undefined || dragged === null)
  {
    letters = `${letters}, ${String(recX - (border / boxSize),)}, ${String(recY - (border / boxSize),)}, ${String.fromCharCode(p5.keyCode)}`
    lettSorter(String.fromCharCode(p5.keyCode))
  }
  else
  {
    letters = `${letters}, ${dragged}`
    lettSorter(dragged)
  }

  pros.keyCode = null;
}

//draws the border and the puzzle key
function puzzleKey(p5)
{
  //creates borders
  p5.fill(0)
  p5.rect(0, 0, xSketchSize, border)
  p5.rect(0, 0, border, ySketchSize)
  p5.rect(p5.width - border, 0, border, ySketchSize)
  p5.rect(0, p5.height - border, xSketchSize, border)
    
  //draws currently assign goal
  p5.fill(255);
  p5.textSize(20);
  p5.textAlign(p5.LEFT, p5.CENTER);

  //draws all the words in the goal
  for(let i = 0; i < goal.length; i++)
  {
    //checks if a goal has been selected
    if (selectedGoal === -1)
    {
      goalSelect(i, p5)
    }
    else if (i === selectedGoal && clicked === true)
    {
      p5.fill(150, 150, 255)      
      p5.text(i, 4, border + i * 40 + 20)
      p5.text(goal[i], 16, border + i * 40 + 20)
    }
    
    if (i !== selectedGoal)
    {    
      p5.text(i, 4, border + i * 40 + 20)
      p5.text(goal[i], 16, border + i * 40 + 20)
    }

    p5.fill(255)
  }

  //draws the input and delete from goal inputs
  p5.fill(255, 0, 0);
  p5.textSize(9);
  p5.text(inputError, p5.width - border, border + (goal.length + 1) * 40 + 30);

  //if a goal is selected the user will be able to drag a word from to goal to the grid
  if (selectedGoal !== -1)
  {
    dragDropWord(p5)
  }
}

//select a goal with the mouse
function goalSelect(i, p5)
{
  //allows the user to select a goal
  if ((p5.mouseX <= border && p5.mouseX >= 0) && (p5.mouseY >= (border + i * 40 + 20 / 2) && p5.mouseY <= (20 + (border + i * 40 + 20 / 2))))
  {
    if (selectedGoal === -1 && clicked === true && boxed === false)
    {
      selectedGoal = i
    }

    p5.fill(0, 0, 255)
  }
}

//adds a new goal
function addToGoal(p5, neGo)
{
  //checks that the new goal is allowed
  let inp = regex.test(neGo)

  //removes spacing
  const s = neGo.split(" ").join("")

  //if new goal is good it is added to the goal
  if (inp === false)
  {
    p5.append(goal, s.toUpperCase())
    inputError = " ";
  }
  else
  {
    inputError = "Only letters are allowed"
  }
}

//removes a selected goal
function removeFromGoal()
{
  let newGoal = []

  //adds all non deleting goal to the new goal
  goal.forEach(sel => 
  {
    if (sel !== goal[selectedGoal])
    {
      newGoal.push(sel)
    }
  });

  //add replaces goal with new goal 
  newGoal.push(goal[selectedGoal])
  newGoal.pop();
  goal = newGoal;
  selectedGoal = -1;
}

//allows users to drag words from goal into the crossword grid
function dragDropWord(p5)
{
  //rotates the placing of the words letters with space bar
  if (p5.keyIsPressed && p5.keyCode === 32 && selectedGoal !== -1)
  {
    if (dragDropDir <= 6)
    {
      dragDropDir = dragDropDir + 1
    }
    else
    {
      dragDropDir = 0
    }

    p5.keyIsPressed = false
  }

  //checks if mouse is on grid
  if (p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border) && selectedGoal !== -1)
  {    
    p5.fill(255)
    let lett;

    p5.textSize(32);
    p5.textAlign(p5.CENTER, p5.CENTER);

    //desides the angle of the word EAST
    if (dragDropDir === 0)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal] && goal[selectedGoal].length + (recX - (1 + (border / boxSize))) >= xGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word SOUTH EAST
    else if (dragDropDir === 1)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recX - (1 + (border / boxSize))) >= xGridAmount || goal[selectedGoal].length + (recY - (1 + (border / boxSize))) >= yGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word SOUTH
    else if (dragDropDir === 2)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recY - 3) >= yGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word SOUTH WEST
    else if (dragDropDir === 3)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - (border / boxSize))) * -1 <= -1 || goal[selectedGoal].length + (recY - ((1 + border / boxSize))) >= yGridAmount)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word WEST
    else if (dragDropDir === 4)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word NORTH WEST
    else if (dragDropDir === 5)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - (border / boxSize))) * -1 <= -1 || ((goal[selectedGoal].length - 1) - (recY - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }//desides the angle of the word NORTH
    else if (dragDropDir === 6)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recY - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    } //desides the angle of the word NORTH EAST
    else if (dragDropDir === 7)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recX - (1 + (border / boxSize))) >= xGridAmount || ((goal[selectedGoal].length - 1) - (recY - (border / boxSize))) * -1 <= -1)
      {
        p5.fill(255, 0, 0)
        droppable = false;
      }
      else
      {
        p5.fill(0, 255, 0)
        droppable = true;
      }
    }

    //places the indivdual letters
    if (goal[selectedGoal])
    {
    for (let i = 0; i < goal[selectedGoal].length; i++) 
    {
      lett = goal[selectedGoal].charAt(i);

      //desides the angle of the word EAST
      if (dragDropDir === 0)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor(recY - (border / boxSize)) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) + i) + ', ' + ((recY - (border / boxSize)))  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH EAST
      else if (dragDropDir === 1)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) + i) + ', ' + ((recY - (border / boxSize)) + i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH
      else if (dragDropDir === 2)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize))) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize))) + ', ' + ((recY - (border / boxSize)) + i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH WEST
      else if (dragDropDir === 3)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) - i) + ', ' + ((recY - (border / boxSize)) + i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word WEST
      else if (dragDropDir === 4)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize))) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) - i) + ', ' + ((recY - (border / boxSize)))  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH WEST
      else if (dragDropDir === 5)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) - i) + ', ' + ((recY - (border / boxSize)) - i)  + ', ' + lett), p5)
  
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH
      else if (dragDropDir === 6)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize))) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize))) + ', ' + ((recY - (border / boxSize)) - i)  + ', ' + lett), p5)
    
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH EAST
      else if (dragDropDir === 7)
      {
        p5.text(lett, 
        Math.floor((recX - (border / boxSize)) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - (border / boxSize)) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable === true && clicked === false)
        {
          addToGrid(String(((recX - (border / boxSize)) + i) + ', ' + ((recY - (border / boxSize)) - i)  + ', ' + lett), p5)
  
          if (i === goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }
    }
  }
  }

  p5.fill(255)
}

//sorts the letters on the letters string
function lettSorter(newby)
{
  let lett = [];

  //goes through all letters removing those on the same grid box
  for(let i = 0; i < countOccurrences(letters, ', ') / 3; i++)
  {
    let z = i * 3

    //checks if newby is just a letter or is from the user dragging in the word
    if (newby.length === 1)
    {
      //checks for letter on the same space as the new one
      if (letters.split(', ')[0 + z] === String(recX - (border / boxSize)) && 
      letters.split(', ')[1 + z] === String(recY - (border / boxSize)) && 
      letters.split(', ')[2 + z].toUpperCase() !== String(newby).toUpperCase())
      {

      }
      else
      {
        //sets up future letters
        let t = letters.split(', ')[0 + z]
        t = t + ', '
        t = t + letters.split(', ')[1 + z]
        t = t + ', '
        t = t + letters.split(', ')[2 + z]
        t = t + ', '
        lett.push(t) 
      }   
    } 
    else
    {
      //checks for letter on the same space as the new one
      if (letters.split(', ')[0 + z] === newby.split(', ')[0] && 
      letters.split(', ')[1 + z] === newby.split(', ')[1] && 
      letters.split(', ')[2 + z].toUpperCase() !== String(newby.split(', ')[2]).toUpperCase())
      {

      }
      else
      {
        //sets up future letters
        let t = letters.split(', ')[0 + z]
        t = t + ', '
        t = t + letters.split(', ')[1 + z]
        t = t + ', '
        t = t + letters.split(', ')[2 + z]
        t = t + ', '
        lett.push(t)  
      } 
    }
  }

  //sorts letters
  lett.sort()
  
  //removes the ', ' of the final letter in letters
  let finLet = lett[lett.length - 1].split(', ')[0]
  finLet = finLet + ', '
  finLet = finLet + lett[lett.length - 1].split(', ')[1]
  finLet = finLet + ', '
  finLet = finLet + lett[lett.length - 1].split(', ')[2]
  lett[lett.length - 1] = finLet

  let ley = null
  
  //puts the new letter sorted and filtered in to the letter string
  lett.forEach(le => 
  {
    if (lett[0] !== le)
    {
      ley = ley + le
    }
    else
    {
      ley = le
    }
  });
  
  lett = null
  
  letters = ley
  letters = letters.toUpperCase()
}

//checks the whole grid
function checkAllGrid(p5)
{
  let breaker = false;

  //checks the x axis
  for(let x = 0; x < xGridAmount; x++)
  {
    //stops x when called
    if (breaker === true)
    {
      break;
    }

    //checks the y axis
    for(let y = 0; y < yGridAmount; y++)
    {      
      //console.log(letters.split(', ')[0 + ((x * yGridAmount) * 3)] + ', ' + letters.split(', ')[1 + ((y + (x * yGridAmount)) * 3)])

      if (x == letters.split(', ')[0 + ((x * yGridAmount) * 3)] && y == letters.split(', ')[1 + ((y + (x * yGridAmount)) * 3)] && x == letters.split(', ')[0 + ((y + (x * yGridAmount)) * 3)])
      {
        if (filling == 0 || filling == 1 || filling == 2)
        {
          for (let c = 0; c < goal.length; c++)
          {            
            if (goCheck[c] == false)
            {
              //a direction checks from all potential angles
              let dirCheck = [false, false, false, false, false, false, false, false]

              if (goal[c].charAt(0) == letters.charAt(6 + (9 * (y + (x * yGridAmount)))))
              { 
                for (let i = 1; i < goal[c].length; i++) 
                {
                  //checks if goal exist EAST wards
                  if (dirCheck[0] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * (y + ((x + i) * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[0] = true
                  }   
                  
                  //checks if goal exist SOUTH EAST wards
                  if (dirCheck[1] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * ((y + i) + ((x + i) * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[1] = true
                  }  

                  //checks if goal exist SOUTH wards
                  if (dirCheck[2] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * ((y + i) + (x * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[2] = true
                  }  

                  //checks if goal exist SOUTH WEST wards
                  if (dirCheck[3] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * ((y + i) + ((x - i) * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[3] = true
                  }  

                  //checks if goal exist WEST wards
                  if (dirCheck[4] == false && goal[c].charAt(i) === letters.charAt(6 + (9 * (y + ((x - i) * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[4] = true
                  }   

                  //checks if goal exist NORTH WEST wards
                  if (dirCheck[5] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * ((y - i) + ((x - i) * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[5] = true
                  }  

                  //checks if goal exist NORTH wards
                  if (dirCheck[6] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * ((y - i) + ((x) * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[6] = true
                  }  

                  //checks if goal exist NORTH EAST wards
                  if (dirCheck[7] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * ((y - i) + ((x + i) * yGridAmount)))))
                  {
                    if (i == goal[c].length - 1)
                    {
                      goCheck[c] = true
                    }
                  }
                  else
                  {
                    dirCheck[7] = true
                  }  
                  
                  if (goCheck[c] == true)
                  {
                    break;
                  }
                }
              }   
            }            
          };
        }
      }
      else
      {
        //informs the users that their is a problem with some grid boxs
        if (filling === 0)
        {
          alert('GRID BOX ' + x  + ', ' + y + ' error');
          breaker = true;
          break;
        }
        
        var ran;
        if (filling === 1 || filling === 3)
        {
          //adds random letters to the grid     

          if (countOccurrences(letters, String(x+', '+y+', ')) === 0)
          {
            ran = (Math.floor(Math.random() * (91 - 65)) + 65);
            addToGrid(String(x + ', ' + y  + ', ' + String.fromCharCode(ran).toUpperCase()), p5)
          }
        }
        else
        {
          //asks the user if they want the random gaps to be automatically filled
          if (window.confirm(x + ' ' + y + ' are empty grid boxes do you want to randomly fill all the empty ones')) 
          {
            if (countOccurrences(letters, String(x+', '+y+', ')) === 0)
            {
              ran = (Math.floor(Math.random() * (91 - 65)) + 65);
              addToGrid(String(x + ', ' + y  + ', ' + String.fromCharCode(ran).toUpperCase()), p5)
            }

            filling = 3
            window.txt = "You pressed OK!";
          } 
          else 
          {
            window.txt = "You pressed Cancel!";
            breaker = true;
            break;
          }
        }
      }
    }    
  }

  //checks if all goal checks are true
  if (filling === 2 || filling === 3)
  {
    for (let i = 0; i < goCheck.length; i++) 
    {
      //informs the user that they are missing some goals
      if (goCheck[i] === false)
      {
        alert(goal[i] + ' is cannot be found in the grid')
        break;
      }
      else if (i === goCheck.length - 1 && goCheck[i] === true)
      {
        //ask the user if they are finshed
        if (window.confirm("All goals are included do you want to upload")) 
        {
          window.txt = window.location.href = '/creFin';
        } 
        else 
        {
          window.txt = "You pressed Cancel!";
        }
      }
    }
  }

  //refreshes filling and goal check list
  filling = 0;
  goCheck = []
}

//does the final check of the crossword
function finalCheck(p5)
{
  filling = 2;

  //adds a check for each goal
  goal.forEach(go => 
  {
    goCheck.push(false);
  });

  checkAllGrid(p5);
}
