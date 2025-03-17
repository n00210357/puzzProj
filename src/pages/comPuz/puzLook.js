//produces the outline
export function Outline(p5, xGridAmount, yGridAmount, border, clicked, boxSize, selectedGoal, recX, recY)
{
  p5.textAlign(p5.LEFT);

  //outlines the grids
  p5.fill(0);
  p5.stroke(0);
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
      if (Math.trunc((p5.mouseY - border) / boxSize) === y  && ((clicked === false && selectedGoal === -1) || (clicked === true && selectedGoal !== -1)))
      {
        recY = y + (border / boxSize);
      }

      //draws the grid number in to their grid
      p5.fill(0);
      p5.textSize(8);
      p5.text(x + " " + y, x * boxSize + 6 + border, y * boxSize + 9 + border)
    }
  }

  let all = [p5, xGridAmount, yGridAmount, border, clicked, boxSize, selectedGoal, recX, recY]
  return all;
}

//inserts the users letters
export function wordFiller(p5, letters, boxSize, border)
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

//counts the amount of symbols
export function countOccurrences(string, subString) 
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