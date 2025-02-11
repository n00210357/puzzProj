import { useState } from "react";
import UserContextProvider from "../../contexts/userContextProvider.tsx";
import Sketch from "react-p5";

let puzzType = 0
let setup
let draw

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
let droppable = false;
let letters = "0, 0, A"//, 0, 1, C, 0, 2, E, 0, 5, F, 0, 9, G";
let inputError = "";
let addingToGoal
let goal = ["BEE", "CAT", "DOG"];
let goCheck = []

//MOUSE VARS
//stores if user clicked
let clicked = false;


//CANVAS VARS
//A allows the canvase to be referenced
let border = 100;

//gets sketch size
let xSketchSize = (boxSize * xGridAmount) + border * 2;
let ySketchSize = (boxSize * yGridAmount) + border * 2;


//string that holds the placed in letters
const regex = /[^A-Za-z0-9]/;
let selectedGoal = -1;

export default function CrePage()
{
  const [form, setForm] = useState({
    addGoal: "",
  });

  addingToGoal = form.addGoal

  if (puzzType === 0)
  {
    wordsearch()
  }
  else
  {
    setup = null
    draw = null
  }

  function goalAdder()
  {
    //inserts if text box not empty
    if (form.addGoal != "" && form.addGoal != null)
    {
      //when pressed will attempt to insert the input boxs value into the goal 
      addToGoal(setup.p5, form.addGoal)
    }  
  }

  //when button pressed it will delete the selected goal
  function removal()
  {
    if (selectedGoal >= 0 && selectedGoal <= goal.length - 1)
    {
      removeFromGoal(setup.p5)
    } 
  } 

  //allows the fill button to be pressed
  function gridFiller()
  {
    fillGrid(setup.p5)
  }
    
  //allows the finsh button to be pressed
  function lastCheck()
  {
    finalCheck(setup.p5)
  }

  const handleChange = (e) => {
    setForm(prevState => ({
        ...prevState,
        [e.target.id]: e.target.value
    }));
  }

    //the create page
    return(
      <UserContextProvider>
        <div className="align-items-center text-center my-3">
          <Sketch setup={setup} draw={draw} />

            <button id="clickMe" className="mx-3 my-2" value="INSERT" type="button" onClick={goalAdder}>
                <h3>
                  insert into goal
                </h3>
            </button>

            <input type="text" className="max-logo" placeholder="addGoal" value={form.addGoal} onChange={handleChange} id='addGoal'></input>

            <button id="clickMe" className="mx-3 my-2" value="INSERT" type="button" onClick={""}>
                <h3>
                  delete
                </h3>
            </button>

            <button id="clickMe" className="mx-3 my-2" value="INSERT" type="button" onClick={goalAdder}>
                <h3>
                  fill grid gaps
                </h3>
            </button>

            <button id="clickMe" className="mx-3 my-2" value="INSERT" type="button" onClick={goalAdder}>
                <h3>
                  finshed puzzle
                </h3>
            </button>
        </div>
      </UserContextProvider>
    )
}

//checks to see if the user has clicked
function mousePressed(p5)
{
  if (clicked == false)
  {
    clicked = true;
  }
  else
  {
    clicked = false;
  }  

  p5.mouseButton = null
}


function wordsearch()
{
    //WORDSEARCH
    let dragDropDir = 0;

    //inputs an buttons
    let fillBut;
    let finshBut;
    
    //draws once at start
    setup = (p5, canvasParentRef) => {
        //draws sketch
        p5.createCanvas(xSketchSize, ySketchSize).parent(canvasParentRef)
    }

    draw = (p5) => {
        if (p5.mouseButton === "left")
        {
            mousePressed(p5)
        }

        //moves the text over to the left
        p5.textAlign(p5.LEFT);

        //refreshs the background
        p5.background(220);

        //highlights a boxs if the mouse is over it or clicked
        if (p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border) || (clicked == true && selectedGoal == -1))
        {
            //checks if clicked of just hovering over
            if (clicked == false)
            {
                p5.fill(150);
            }
            else if (clicked == true && selectedGoal == -1)
            {
                p5.fill(50);
            }

            //draws the square to darken
            p5.rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
        }  

        //draws the outline
        outline(p5)
        wordFiller(p5);
        puzzleKey(p5, dragDropDir);

        //fills the grid
        p5.fill(255)
        p5.textAlign(p5.CENTER)
        p5.textSize(12);
        p5.text(letters, 1, p5.height - border / 2, 700)

        //allows the user to add to the grid
        if (clicked == true && selectedGoal == -1 && (p5.keyIsPressed && ((p5.keyCode >= 65 && p5.keyCode <= 90) || (p5.keyCode >= 97 && p5.keyCode <= 122))))
        {
            addToGrid(null, p5)
            p5.keyCode = null;
            clicked = false;    
        }
    }
}

//produces the outline
function outline(p5)
{
  //outlines the grids
  p5.fill(0);
  for(let x = 0; x < xGridAmount; x++)
  {
    //draws the xAxis outlines
    p5.rect(x * boxSize + border, 0 + border, 1, yGridAmount * boxSize);

    //detects which x grid the mouse is hovering over
    if (Math.trunc(((p5.mouseX - border) / boxSize)) === x && ((clicked === false && selectedGoal === -1) || (clicked === true && selectedGoal !== -1)))
    {
        recX = x + (border / boxSize);
    }

    for(let y = 0; y < yGridAmount; y++)
    {
      //draws the yAxis outlines
      p5.rect(0 + border, y * boxSize + border, xGridAmount * boxSize, 1);

      //detects which y grid the mouse is hovering over
      if (Math.trunc((p5.mouseY - border) / boxSize) == y  && ((clicked == false && selectedGoal == -1) || (clicked == true && selectedGoal != -1)))
      {
        recY = y + (border / boxSize);
      }

      //draws the grid number in to their grid
      p5.fill(0);
      p5.textSize(8);
      p5.text(x + " " + y, x * boxSize + 6 + border, y * boxSize + 9 + border)
    }
  }

  //refreshs selected goal
  if (p5.clicked == false && droppable == false)
  {
    p5.selectedGoal = -1
  }

  //when space bar click it checks the grid
  if (selectedGoal == -1 && p5.keyIsPressed && p5.keyCode == 32)
  {
    checkAllGrid(p5)
  }
}

//allows the user to add a Letter to the grid
function addToGrid(dragged, p5)
{  
  //checks if user is draggin a word form goal or just adding a single letter
  if (dragged == undefined)
  {
    letters = `${letters}, ${String(recX - 2,)}, ${String(recY - 2,)}, ${String.fromCharCode(p5.keyCode)}`
    lettSorter(String.fromCharCode(p5.keyCode))
  }
  else
  {
    letters = `${letters}, ${dragged}`
    lettSorter(dragged)
  }

  p5.keyCode = null;
}

//draws the border and the puzzle key
function puzzleKey(p5, dragDropDir)
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
    if (selectedGoal == -1)
    {
      goalSelect(i, p5)
    }
    else if (i == selectedGoal && clicked == true)
    {
        p5.fill(150, 150, 255)      
        p5.text(i, p5.width - border, border + i * 40 + 20)
        p5.text(goal[i], p5.width - border + 20, border + i * 40 + 20)
    }

    if (i != selectedGoal)
    {    
        p5.text(i, p5.width - border, border + i * 40 + 20)
        p5.text(goal[i], p5.width - border + 20, border + i * 40 + 20)
    }

    p5.fill(255)
  }

  //draws the input and delete from goal inputs
  p5.fill(255, 0, 0);
  p5.textSize(9);
  p5.text(inputError, p5.width - border, border + (goal.length + 1) * 40 + 30);

  //if a goal is selected the user will be able to drag a word from to goal to the grid
  if (selectedGoal != -1)
  {
    dragDropWord(p5, dragDropDir)
  }
}

//select a goal with the mouse
function goalSelect(i, p5)
{
  //allows the user to select a goal
  if (p5.mouseX >= (p5.width - border + 20) && p5.mouseY >= (border + i * 40 + 20 / 2) && p5.mouseY <= (20 + (border + i * 40 + 20 / 2)))
  {
    if (selectedGoal == -1 && clicked == true)
    {
      selectedGoal = i
    }

    p5.fill(0, 0, 255)
  }
}

//adds a new goal
function addToGoal(p5)
{
  //checks that the new goal is allowed
  let inp = regex.test(addingToGoal)

  //removes spacing
  const s = addingToGoal.split(" ").join("")

  //if new goal is good it is added to the goal
  if (inp == false)
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
function removeFromGoal(p5)
{
  let newGoal = []

  //adds all non deleting goal to the new goal
  goal.forEach(sel => 
  {
    if (sel != goal[selectedGoal])
    {
      newGoal.push(sel)
    }
  });

  //add replaces goal with new goal 
  newGoal.push(goal[selectedGoal])
  newGoal.pop();
  goal = newGoal;
}

//allows users to drag words from goal into the crossword grid
function dragDropWord(p5, dragDropDir)
{
  //rotates the placing of the words letters with space bar
  if (p5.keyIsPressed && p5.keyCode == 32 && selectedGoal != -1)
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
  if (p5.mouseX >= (0 + border) && p5.mouseX <= (p5.width - border) && p5.mouseY >= (0 + border) && p5.mouseY <= (p5.height - border) && selectedGoal != -1)
  {    
    p5.fill(255)
    let lett;

    p5.textSize(32);
    p5.textAlign(p5.CENTER, p5.CENTER);

    //desides the angle of the word EAST
    if (dragDropDir == 0)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recX - 3) >= xGridAmount)
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
    else if (dragDropDir == 1)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recX - 3) >= xGridAmount || goal[selectedGoal].length + (recY - 3) >= yGridAmount)
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
    else if (dragDropDir == 2)
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
    else if (dragDropDir == 3)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - 2)) * -1 <= -1 || goal[selectedGoal].length + (recY - 3) >= yGridAmount)
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
    else if (dragDropDir == 4)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - 2)) * -1 <= -1)
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
    else if (dragDropDir == 5)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recX - 2)) * -1 <= -1 || ((goal[selectedGoal].length - 1) - (recY - 2)) * -1 <= -1)
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
    else if (dragDropDir == 6)
    {
      //checks if the whole word is on the grid
      if (((goal[selectedGoal].length - 1) - (recY - 2)) * -1 <= -1)
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
    else if (dragDropDir == 7)
    {
      //checks if the whole word is on the grid
      if (goal[selectedGoal].length + (recX - 3) >= xGridAmount || ((goal[selectedGoal].length - 1) - (recY - 2)) * -1 <= -1)
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
    for (let i = 0; i < goal[selectedGoal].length; i++) 
    {
      lett = goal[selectedGoal].charAt(i);

      //desides the angle of the word EAST
      if (dragDropDir == 0)
      {
        p5.text(lett, 
        Math.floor((recX - 2) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor(recY - 2) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2) + i) + ', ' + ((recY - 2))  + ', ' + lett), p5)
    
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH EAST
      else if (dragDropDir == 1)
      {
        p5.text(lett, 
        Math.floor((recX - 2) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - 2) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2) + i) + ', ' + ((recY - 2) + i)  + ', ' + lett), p5)
    
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH
      else if (dragDropDir == 2)
      {
        p5.text(lett, 
        Math.floor((recX - 2)) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - 2) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2)) + ', ' + ((recY - 2) + i)  + ', ' + lett), p5)
    
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word SOUTH WEST
      else if (dragDropDir == 3)
      {
        p5.text(lett, 
        Math.floor((recX - 2) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - 2) + i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2) - i) + ', ' + ((recY - 2) + i)  + ', ' + lett), p5)
    
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word WEST
      else if (dragDropDir == 4)
      {
        p5.text(lett, 
        Math.floor((recX - 2) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - 2)) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2) - i) + ', ' + ((recY - 2))  + ', ' + lett), p5)
    
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH WEST
      else if (dragDropDir == 5)
      {
        p5.text(lett, 
        Math.floor((recX - 2) - i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - 2) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2) - i) + ', ' + ((recY - 2) - i)  + ', ' + lett), p5)
  
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH
      else if (dragDropDir == 6)
      {
        p5.text(lett, 
        Math.floor((recX - 2)) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - 2) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2)) + ', ' + ((recY - 2) - i)  + ', ' + lett), p5)
    
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }//desides the angle of the word NORTH EAST
      else if (dragDropDir == 7)
      {
        p5.text(lett, 
        Math.floor((recX - 2) + i) * (boxSize) + (boxSize / 2) + border, 
        Math.floor((recY - 2) - i) * (boxSize) + (boxSize / 2) + border)

        //adds the letter to the grid
        if (droppable == true && clicked == false)
        {
          addToGrid(String(((recX - 2) + i) + ', ' + ((recY - 2) - i)  + ', ' + lett), p5)
  
          if (i == goal[selectedGoal].length - 1)
          {
            droppable = false;
            selectedGoal = -1;
            break;
          }
        }
      }
    }
  }

  p5.fill(255)
}

//inserts the users letters
function wordFiller(p5)
{  
  //goes through the storage string to grab the letters and their cords
  for(let i = 0; i < countOccurrences(letters, ', ') / 3; i++)
  {
    let z = i * 3
    p5.textSize(32);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(letters.split(', ')[2 + z].toUpperCase(), 
    Math.floor(letters.split(', ')[0 + z]) * (boxSize) + (boxSize / 2) + border, 
    Math.floor(letters.split(', ')[1 + z]) * (boxSize) + (boxSize / 2) + border)
  }
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
    if (newby.length == 1)
    {
      //checks for letter on the same space as the new one
      if (letters.split(', ')[0 + z] == recX - 2 && 
      letters.split(', ')[1 + z] == recY - 2 && 
      letters.split(', ')[2 + z].toUpperCase() != String(newby).toUpperCase())
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
      if (letters.split(', ')[0 + z] == newby.split(', ')[0] && 
      letters.split(', ')[1 + z] == newby.split(', ')[1] && 
      letters.split(', ')[2 + z].toUpperCase() != String(newby.split(', ')[2]).toUpperCase())
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
    if (lett[0] != le)
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

//counts the amount of symbols
function countOccurrences(string, subString) 
{
    // Escape special characters in the subString to avoid regex interpretation
    const escapedSubString = subString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Create a regular expression with the escaped subString and the global flag
    const regex = new RegExp(escapedSubString, 'g');
    // Use match() to find all occurrences of the subString in the string
    const matches = string.match(regex);
    // Return the number of matches found
    return matches ? matches.length : 0;
}

//fills empty spaces
function fillGrid(p5) 
{
  filling = 1;
  checkAllGrid(p5)  
}

//checks the whole grid
function checkAllGrid(p5)
{
  let breaker = false;

  //checks the x axis
  for(let x = 0; x < xGridAmount; x++)
  {
    //stops x when called
    if (breaker == true)
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
                  if (dirCheck[4] == false && goal[c].charAt(i) == letters.charAt(6 + (9 * (y + ((x - i) * yGridAmount)))))
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
        if (filling == 0)
        {
          alert('GRID BOX ' + x  + ', ' + y + ' error');
          breaker = true;
          break;
        }
        
        if (filling == 1 || filling == 3)
        {
          //console.log(x + " " + y)
          //adds random letters to the grid          
          var ran = (Math.floor(Math.random() * (91 - 65)) + 65);
          addToGrid(String(x + ', ' + y  + ', ' + String.fromCharCode(ran).toUpperCase()), p5)
        }
        else
        {
          //asks the user if they want the random gaps to be automatically filled
          if (window.confirm(x + ' ' + y + ' ' + " are empty grid boxes do you want to randomly fill all the empty ones")) 
          {
            var ran = (Math.floor(Math.random() * (91 - 65)) + 65);
            addToGrid(String(x + ', ' + y  + ', ' + String.fromCharCode(ran).toUpperCase()), p5)
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
  if (filling == 2 || filling == 3)
  {
    for (let i = 0; i < goCheck.length; i++) 
    {
      //informs the user that they are missing some goals
      if (goCheck[i] == false)
      {
        alert(goal[i] + ' is cannot be found in the grid')
        break;
      }
      else if (i == goCheck.length - 1 && goCheck[i] == true)
      {
        //ask the user if they are finshed
        if (window.confirm("All goals are included do you want to upload")) 
        {
          window.txt = "You pressed OK!";
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
