export const checkInput = (keyPressed, expressionString) => {
  expressionString += keyPressed;
  //  prevent user input that starts with +-=*.
  if (/^[+\-=*/.]/.test(expressionString)) {
    throw Error(`Can't start with this symbol...`);
  }

  //  prevent more than one symbol
  if (/[\+\-\*\/]/g.test(expressionString)) {
    const symbols = [...expressionString].filter(char => /[\+\-\*\/]/.test(char));
    if (symbols.length > 1) {
      throw new Error('Invalid expression: More than one symbol detected');
    }
  }
}

