import { handleTextareaInput } from './calculator.js';

export const handleKeydown = (key) => {
  console.log("handleKeydown", key.keyCode);

  const k = key.keyCode;
  let c;
  let isShiftKeyPressed = false;
  
  switch (k) {
    case 16:  // shift key
      isShiftKeyPressed = true;
      break;
    // Taking advantage of fall-through to match for numkeys 0-9
    case 48: case 49: case 50: case 51: case 52:
    case 53: case 54: case 55: case 57:
      c = k - 48;
      break;
    case 187:
      c = isShiftKeyPressed ? '+' : '=';
      break;
    case 189:
      c = '-';
      break;
    case 191:
      c = '/';
      break;
    case 190:
      c = '.';
      break;
    case 8:     // backspace key
      c = 'CE';
      break;
    case 56:    // 8 key
      c = isShiftKeyPressed ? '*' : 8;
      break;
  }

  console.log(`k ${k}, c ${c}`);
  handleTextareaInput(String(c))

  // if (c === '='){
  //   clearAll();
  // }
}