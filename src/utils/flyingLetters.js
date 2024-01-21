import {randomNumBetween} from "./utils";
import {setFlyingLetters} from "../store/flyingLettersSlice";

export function isChar(key) {
  const re = new RegExp(/^[a-zA-Z0-9_.-]*$/);
  return re.test(key)
}

export function myPressedKey(e) {
  let keynum;

  if(window.event) { // IE                  
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera                 
    keynum = e.which;
  }


  return String.fromCharCode(keynum).toLowerCase() === e.key ? String.fromCharCode(keynum).toLowerCase() :  String.fromCharCode(keynum);
}

export function setLetterCordinates(e) {
  const rect = e.target.getBoundingClientRect();
  const minX = rect.left;
  const maxX = rect.left + rect.width;
  const startingPositionX = randomNumBetween(minX, maxX)
  const startingPositionY = rect.top - 10;

  const endingPositionX = randomNumBetween(startingPositionX - 100, startingPositionX + 100)
  const endingPositionY = randomNumBetween(startingPositionY - 100, startingPositionY - 200)

  return {
    startX: startingPositionX,
    endX: endingPositionX,
    startY: startingPositionY,
    endY: endingPositionY
  }
}

const classes = ["red", "green", "purple", "blue", "yellow"]

export function setLetters(e, dispatch) {
  const pressedKey = myPressedKey(e);
  if(!isChar(pressedKey)) return;
  const cordinates = setLetterCordinates(e)
  
  dispatch(setFlyingLetters({
    id: crypto.randomUUID(),
    letter: pressedKey,
    cordinates,
    className: classes[Math.floor(Math.random()*classes.length)]
  }));
}