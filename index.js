import { handleButtonClicked } from './calculator.js';
import { handleKeydown } from './textareaInput.js';

const allButtons = document.getElementsByClassName("b");

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", handleButtonClicked);
}

document.addEventListener('keydown', handleKeydown);
