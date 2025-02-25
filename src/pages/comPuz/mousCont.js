//checks to see if the user has clicked
export function mouseClicked(pros, clicked, boxed, secCli)
{
  if (clicked === false)
  {
    clicked = true;

    if (secCli !== undefined)
    {
      secCli = false;
    }
  }
  else if (secCli !== undefined && secCli === false)
  {
    secCli = true
  }
  else
  {
    clicked = false;
    boxed = false;
    secCli = false;
  }  

  pros.mouseButton = null
  let all = [pros, clicked, boxed, secCli]

  return all;
}

//checks to see if user stops clicking
export function mouseReleased(pros, clicked, border, newLine)
{
  if (clicked === true && pros.mouseX >= (0 + border) && pros.mouseX <= (pros.width - border) && pros.mouseY >= (0 + border) && pros.mouseY <= (pros.height - border))
  {
    newLine = true;
  }
  else
  {
    newLine = false;
    clicked = false;
  }

  let all = [pros, clicked, border, newLine]
  return all;
}