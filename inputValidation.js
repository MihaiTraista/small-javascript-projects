export const checkInput = (keyPressed, expressionString) => {
  //  prevent user input that starts with 0-+*/.=
  if (expressionString.length === 0 && /[\=\+\*\/\-\.0]/g.test(keyPressed)) {
    throw Error(`Can't start with this symbol...`);
  }
}
