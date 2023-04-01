import { checkInput } from './inputValidation.js';

let expressionString = "";
let displayText = "";

export const handleButtonClicked = (event) => {
  let buttonClicked = event.target.innerText;
  console.log("buttonClicked", buttonClicked);

  checkInput(buttonClicked, expressionString);

  if (buttonClicked === "AC"){
    clearAll();
  } else if (buttonClicked === "="){
    performCalculation();
  } else {
    expressionString += buttonClicked;
    displayText = expressionString;
  }

  updateScreen();

}

export const handleTextareaInput = (c) => {
  console.log("c", c);

  expressionString += c;
  displayText = expressionString;

  updateScreen();
}

const clearAll = () => {
  expressionString = "";
  displayText = "";
  updateScreen();
  document.getElementById('keyInput').blur();
  document.getElementById('keyInput').value = '';  
}

const updateScreen = () => {
  document.getElementById('screen').innerHTML = displayText;
}

const performCalculation = () => {
  let opIndex = [...expressionString].findIndex(char => /[\+\*\/\-]/g.test(char));

  if (opIndex === -1) {
    throw Error('Could not find the operator...');
  }
  console.log(`opIndex ${opIndex}, operator ${expressionString[opIndex]}`)

  let val1 = Number(expressionString.slice(0, opIndex));
  let val2 = Number(expressionString.slice(opIndex+1));
  let operator = expressionString[opIndex];
  let result;
  switch (operator){
    case '+':
      result = val1 + val2;
      break;
    case '-':
      result = val1 - val2;
      break;
    case '*':
      result = val1 * val2;
      break;
    case '/':
      result = val1 / val2;
      break;
  }

  displayText = Number.isInteger(result) ? result : result.toFixed(2);
}
