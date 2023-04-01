import { handleButtonClicked } from './calculator.js';

const allButtons = document.getElementsByClassName("b");

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", handleButtonClicked);
}