//GRID VARS
//grid box size
let boxSize = 50;

//the length of the grid
let xGridAmount = 10;
let yGridAmount = 10;

//the holds the cords for selected boxs
let recX = 0;
let recY = 0;


//MOUSE VARS
//stores if user clicked
let clicked = false;


//CANVAS VARS
//A allows the canvase to be referenced
let canvas;
let border = 100;

//gets sketch size
let xSketchSize = (boxSize * xGridAmount) + border * 2;
let ySketchSize = (boxSize * yGridAmount) + border * 2;


//CROSSWORD
//string that holds the placed in letters
let selectedGoal = -1;
let dragDropDir = 0;
let droppable = false;
let letters = "0, 0, a, 1, 0, b, 0, 1, c, 1, 1, d, 0, 2, e, 0, 5, f, 0, 9, g";
let goal = ["bee", "cat", "dog"];
let inputBox;
let deleteBut;
let insertBut;

//draws once at start
function setup() 
{
  //draws sketch
  canvas = createCanvas(xSketchSize, ySketchSize);
  canvas.position(100, 100);
  inputBox = createInput('');
  deleteBut = createButton('delete')
  insertBut = createButton('insert into goal')
}

//draws every frame
function draw() 
{
  //moves the text over to the left
  textAlign(LEFT);

  //refreshs the background
  background(220);

  //highlights a boxs if the mouse is over it or clicked
  if (mouseX >= (0 + border) && mouseX <= (width - border) && mouseY >= (0 + border) && mouseY <= (height - border))
  {
    //checks if clicked of just hovering over
    if (clicked == false)
    {
      fill(150);
    }
    else if (clicked == true && selectedGoal == -1)
    {
      fill(50);
    }

    //draws the square to darken
    rect(recX * boxSize, recY * boxSize, boxSize, boxSize);
  }  

  //draws the outline
  outline()
  wordFiller();
  puzzleKey();

  textAlign(CENTER)
  textSize(12);
  text(letters, width / 2, height - border / 2)

  if (clicked == true && selectedGoal == -1)
  {
    if (keyIsPressed && ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)))
    {
      addToGrid()
      keyCode = null;
      clicked = false;
    }
  }
}

//produces the outline
function outline()
{
  //outlines the grids
  fill(0);
  for(x = 0; x < xGridAmount; x++)
  {
    //draws the xAxis outlines
    rect(x * boxSize + border, 0 + border, 1, yGridAmount * boxSize);

    //detects which x grid the mouse is hovering over
    if (Math.trunc(((mouseX - border) / boxSize)) == x && ((clicked == false && selectedGoal == -1) || (clicked == true && selectedGoal != -1)))
    {
      recX = x + (border / boxSize);
    }

    for(y = 0; y < yGridAmount; y++)
    {
      //draws the yAxis outlines
      rect(0 + border, y * boxSize + border, xGridAmount * boxSize, 1);

      //detects which y grid the mouse is hovering over
      if (Math.trunc((mouseY - border) / boxSize) == y  && ((clicked == false && selectedGoal == -1) || (clicked == true && selectedGoal != -1)))
      {
        recY = y + (border / boxSize);
      }

      //draws the grid number in to their grid
      fill(0);
      textSize(8);
      text(x + " " + y, x * boxSize + 6 + border, y * boxSize + 9 + border)
    }
  }

  if (clicked == false && droppable == false)
  {
    selectedGoal = -1
  }
}

//allows the user to add a Letter to the grid
function addToGrid(dragged)
{  
  if (dragged == undefined)
  {
    letters = `${letters}, ${String(recX - 2,)}, ${String(recY - 2,)}, ${String.fromCharCode(keyCode)}`
    lettSorter(String.fromCharCode(keyCode))
  }
  else
  {
    letters = `${letters}, ${dragged}`
    lettSorter(dragged)
  }

  keyCode = null;
}

//checks to see if the user has clicked
function mousePressed()
{
  if (clicked == false)
  {
    clicked = true;
  }
  else
  {
    clicked = false;
  }  
}

//draws the border and the puzzle key
function puzzleKey()
{
  //creates borders
  fill(0)
  rect(0, 0, xSketchSize, border)
  rect(0, 0, border, ySketchSize)
  rect(width - border, 0, border, ySketchSize)
  rect(0, height - border, xSketchSize, border)
    
  //draws currently assign goal
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);

  for(i = 0; i < goal.length; i++)
  {
    if (selectedGoal == -1)
    {
      goalSelect(i)
    }
    else if (i == selectedGoal && clicked == true)
    {
      fill(150, 150, 255)      
      text(i, width - border, border + i * 40 + 20)
      text(goal[i], width - border + 20, border + i * 40 + 20)
    }

    if (i != selectedGoal)
    {    
      text(i, width - border, border + i * 40 + 20)
      text(goal[i], width - border + 20, border + i * 40 + 20)
    }

    fill(255)
  }

  //draws the input and delete from goal inputs
  inputBox.position(width - border + 40 + 20, border + goal.length * 40 + 100);
  insertBut.position(width, border + (goal.length + 1) * 40 + 100);
  deleteBut.position(width, border + (goal.length + 2) * 40 + 100);

  //inserts if text box not empty
  if (inputBox.value() != "" && inputBox.value() != null)
  {
    insertBut.mousePressed(addToGoal)
  }  

  if (selectedGoal >= 0 && selectedGoal <= goal.length - 1)
  {
    deleteBut.mousePressed(removeFromGoal)
  }  

  dragDropWord()
}

//select a goal with the mouse
function goalSelect(i)
{
  if (mouseX >= (width - border + 20) && mouseY >= (border + i * 40 + 20 / 2) && mouseY <= (20 + (border + i * 40 + 20 / 2)))
  {
    if (selectedGoal == -1 && clicked == true)
    {
      selectedGoal = i
    }

    fill(0, 0, 255)
  }
}

//adds a new goal
function addToGoal()
{
  append(goal, inputBox.value())
}

//removes a selected goal
function removeFromGoal()
{
  let newGoal = []

  goal.forEach(sel => {
    if (sel != goal[selectedGoal])
    {
      newGoal.push(sel)
    }
  });

  newGoal.push(goal[selectedGoal])
  newGoal.pop();
  goal = newGoal;
}

function dragDropWord()
{
  if (keyIsPressed && keyCode == 32)
  {
    if (dragDropDir <= 6)
    {
      dragDropDir = dragDropDir + 1
    }
    else
    {
      dragDropDir = 0
    }

    keyIsPressed = false
  }

  if (mouseX >= (0 + border) && mouseX <= (width - border) && mouseY >= (0 + border) && mouseY <= (height - border))
  {
    if (selectedGoal != -1)
    {
      let lett;

      textSize(32);
      textAlign(CENTER, CENTER);

      if (dragDropDir == 0)
      {
        if (goal[selectedGoal].length + (recX - 3) >= xGridAmount)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }
      else if (dragDropDir == 1)
      {
        if (goal[selectedGoal].length + (recX - 3) >= xGridAmount || goal[selectedGoal].length + (recY - 3) >= xGridAmount)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }
      else if (dragDropDir == 2)
      {
        if (goal[selectedGoal].length + (recY - 3) >= xGridAmount)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }
      else if (dragDropDir == 3)
      {
        if (((goal[selectedGoal].length - 1) - (recX - 2)) * -1 <= -1 || goal[selectedGoal].length + (recY - 3) >= xGridAmount)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }
      else if (dragDropDir == 4)
      {
        if (((goal[selectedGoal].length - 1) - (recX - 2)) * -1 <= -1)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }
      else if (dragDropDir == 5)
      {
        if (((goal[selectedGoal].length - 1) - (recX - 2)) * -1 <= -1 || ((goal[selectedGoal].length - 1) - (recY - 2)) * -1 <= -1)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }
      else if (dragDropDir == 6)
      {
        if (((goal[selectedGoal].length - 1) - (recY - 2)) * -1 <= -1)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }
      else if (dragDropDir == 7)
      {
        if (goal[selectedGoal].length + (recX - 3) >= xGridAmount || ((goal[selectedGoal].length - 1) - (recY - 2)) * -1 <= -1)
        {
          fill(255, 0, 0)
          droppable = false;
        }
        else
        {
          fill(0, 255, 0)
          droppable = true;
        }
      }

      for (let i = 0; i < goal[selectedGoal].length; i++) 
      {
        lett = goal[selectedGoal].charAt(i);

        if (dragDropDir == 0)
        {
          text(lett, 
          Math.floor((recX - 2) + i) * (boxSize) + (boxSize / 2) + border, 
          Math.floor(recY - 2) * (boxSize) + (boxSize / 2) + border)

          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2) + i) + ', ' + ((recY - 2))  + ', ' + lett))
    
            if (i == goal[selectedGoal].length - 1)
            {
              droppable = false;
              selectedGoal = -1;
              break;
            }
          }
        }
        else if (dragDropDir == 1)
        {
          text(lett, 
          Math.floor((recX - 2) + i) * (boxSize) + (boxSize / 2) + border, 
          Math.floor((recY - 2) + i) * (boxSize) + (boxSize / 2) + border)

          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2) + i) + ', ' + ((recY - 2) + i)  + ', ' + lett))
    
            if (i == goal[selectedGoal].length - 1)
            {
              droppable = false;
              selectedGoal = -1;
              break;
            }
          }
        }
        else if (dragDropDir == 2)
        {
          text(lett, 
          Math.floor((recX - 2)) * (boxSize) + (boxSize / 2) + border, 
          Math.floor((recY - 2) + i) * (boxSize) + (boxSize / 2) + border)

          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2)) + ', ' + ((recY - 2) + i)  + ', ' + lett))
    
            if (i == goal[selectedGoal].length - 1)
            {
              droppable = false;
              selectedGoal = -1;
              break;
            }
          }
        }
        else if (dragDropDir == 3)
        {
          text(lett, 
          Math.floor((recX - 2) - i) * (boxSize) + (boxSize / 2) + border, 
          Math.floor((recY - 2) + i) * (boxSize) + (boxSize / 2) + border)

          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2) - i) + ', ' + ((recY - 2) + i)  + ', ' + lett))
    
            if (i == goal[selectedGoal].length - 1)
            {
              droppable = false;
              selectedGoal = -1;
              break;
            }
          }

        }
        else if (dragDropDir == 4)
        {
          text(lett, 
          Math.floor((recX - 2) - i) * (boxSize) + (boxSize / 2) + border, 
          Math.floor((recY - 2)) * (boxSize) + (boxSize / 2) + border)

          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2) - i) + ', ' + ((recY - 2))  + ', ' + lett))
    
            if (i == goal[selectedGoal].length - 1)
            {
              droppable = false;
              selectedGoal = -1;
              break;
            }
          }
        }
        else if (dragDropDir == 5)
        {
          text(lett, 
          Math.floor((recX - 2) - i) * (boxSize) + (boxSize / 2) + border, 
          Math.floor((recY - 2) - i) * (boxSize) + (boxSize / 2) + border)
          
          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2) - i) + ', ' + ((recY - 2) - i)  + ', ' + lett))
    
            if (i == goal[selectedGoal].length - 1)
            {
              droppable = false;
              selectedGoal = -1;
              break;
            }
          }
        }
        else if (dragDropDir == 6)
        {
          text(lett, 
          Math.floor((recX - 2)) * (boxSize) + (boxSize / 2) + border, 
          Math.floor((recY - 2) - i) * (boxSize) + (boxSize / 2) + border)

          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2)) + ', ' + ((recY - 2) - i)  + ', ' + lett))
    
            if (i == goal[selectedGoal].length - 1)
            {
              droppable = false;
              selectedGoal = -1;
              break;
            }
          }
        }
        else if (dragDropDir == 7)
        {
          text(lett, 
          Math.floor((recX - 2) + i) * (boxSize) + (boxSize / 2) + border, 
          Math.floor((recY - 2) - i) * (boxSize) + (boxSize / 2) + border)

          if (droppable == true && clicked == false)
          {
            addToGrid(String(((recX - 2) + i) + ', ' + ((recY - 2) - i)  + ', ' + lett))
  
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
  }

  fill(255)
}

//inserts the users letters
function wordFiller()
{  
  //goes through the storage string to grab the letters and their cords
  for(i = 0; i < countOccurrences(letters, ', ') / 3; i++)
  {
    let z = i * 3
    textSize(32);
    textAlign(CENTER, CENTER);
    text(letters.split(', ')[2 + z].toUpperCase(), 
    Math.floor(letters.split(', ')[0 + z]) * (boxSize) + (boxSize / 2) + border, 
    Math.floor(letters.split(', ')[1 + z]) * (boxSize) + (boxSize / 2) + border)
  }
}

//sorts the letters on the letters string
function lettSorter(newby)
{
  let lett = [];

  //goes through all letters removing those on the same grid box
  for(i = 0; i < countOccurrences(letters, ', ') / 3; i++)
  {
    let z = i * 3

    if (newby.length == 1)
    {
      if (letters.split(', ')[0 + z] == recX - 2 && 
      letters.split(', ')[1 + z] == recY - 2 && 
      letters.split(', ')[2 + z].toUpperCase() != String(newby).toUpperCase())
      {

      }
      else
      {
        let t = letters.split(', ')[0 + z]
        t = t + ', '
        t = t + letters.split(', ')[1 + z]
        t = t + ', '
        t = t + letters.split(', ')[2 + z]
        t = t + ', '
        lett.push(t) 
        console.log(t)   
      }   
    } 
    else
    {
      if (letters.split(', ')[0 + z] == newby.split(', ')[0] && 
      letters.split(', ')[1 + z] == newby.split(', ')[1] && 
      letters.split(', ')[2 + z].toUpperCase() != String(newby.split(', ')[2]).toUpperCase())
      {

      }
      else
      {
        let t = letters.split(', ')[0 + z]
        t = t + ', '
        t = t + letters.split(', ')[1 + z]
        t = t + ', '
        t = t + letters.split(', ')[2 + z]
        t = t + ', '
        lett.push(t) 
        console.log(t)   
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

function countOccurrences(string, subString) {
  // Escape special characters in the subString to avoid regex interpretation
  const escapedSubString = subString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Create a regular expression with the escaped subString and the global flag
  const regex = new RegExp(escapedSubString, 'g');
  // Use match() to find all occurrences of the subString in the string
  const matches = string.match(regex);
  // Return the number of matches found
  return matches ? matches.length : 0;
}