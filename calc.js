let num1 = 0;
let num2 = 0;
let showResult = false;
let expressionString = "";
let shiftKeyPressed = false;

const checkInput = keyPressed => {
  //  does user input start with 0-+*/. or =?
  if (expressionString.length === 0 && /[\=\+\*\/\-\.0]/g.test(keyPressed)) {
    throw Error('Can\'t start with this symbol...');
  }
}

const updateScreen = () => {
  let displayText;
  if (showResult){
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
    displayText = (result % 1 * 100 < 1) ? result : result.toFixed(2);
  } else {
    displayText = expressionString;
  }
  document.getElementById('screen').innerHTML = displayText;
}

const clearAll = () => {
  expressionString = "";
  document.getElementById('keyInput').blur();
  document.getElementById('keyInput').value = '';  
}

const updateValues = (keyPressed) => {
  const isNumber = /[\d\.]/.test(keyPressed);
  if (keyPressed !== 'AC' && keyPressed !== '=') {
    expressionString += keyPressed;
  } else if (keyPressed === '=') {
    showResult = true;
  } else if (keyPressed === 'AC'){
    showResult = false;
    clearAll();
  }
}

const handleCalculation = (btn, keyNum=undefined) => {
  let keyPressed;
  if(!keyNum){
    keyPressed = btn.target.innerText;
  } else {
    keyPressed = String(keyNum);
  }
  checkInput(keyPressed);
  updateValues(keyPressed);
  updateScreen();
  if (showResult) {
    showResult = false;
    clearAll();
  }
}

const allButtons = document.getElementsByClassName("b");
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", handleCalculation);
}

const handleKeydown = (key) => {
  const k = key.keyCode;
  //  48-57
  let c = (48 <= k && k <= 57 && !shiftKeyPressed) ? k-48 : (
    (shiftKeyPressed && k === 187) ? '+' : (
      (k === 189) ? '-' : (
        (k === 191) ? '/' : (
          (!shiftKeyPressed && k === 187) ? '=' : (
            (k === 190) ? '.' : (
              (k === 8) ? 'CE' : (
                (shiftKeyPressed && k === 56) ? '*' : 0
              )
            )
          )
        )
      )
    )
  )
  
  if (k === 16) {
    shiftKeyPressed = true;
    return;
  } else {
    shiftKeyPressed = false;
  }

  console.log(`k ${k}, c ${c}`);
  handleCalculation("", String(c))
  if (c === '='){
    clearAll();
  }
}