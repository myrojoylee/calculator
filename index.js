// this does not take into account negative user input values
// however, negative answers are possible
// this obeys order of operations

const allButtons = document.querySelectorAll(".buttons");
let answerBox = document.querySelector(".answer-box");
let tempNumberSet = [];
let tempExpression = [];
let arithmeticArray = [];
let workingDisplay = [];
let cleanedUpNumbers = [];
let addOnArray = [];
let characterCount = 0;
let operatorPresent = false;
let hasDecimal = false;
let indexCount = 0;
let tempAnswer = 0;
let firstOperand,
  secondOperand,
  operator,
  indexOfMultiply,
  indexOfDivide,
  indexOfMultiplyOrDivide;

reflectDisplay();

function reflectDisplay() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      if (workingDisplay.length > 0) {
        if (this.innerHTML === "CLR") {
          clearAll();
        } else if (
          this.classList.contains("decimal") ||
          this.classList.contains("operator")
        ) {
          if (this.classList.contains("decimal")) {
            // prevents multiple decimal points in a number
            if (hasDecimal === false) {
              hasDecimal = true;
              characterCount++;
              workingDisplay.push(this.innerHTML);
              answerBox.innerHTML = workingDisplay.join("");
              tempNumberSet.push(this.innerHTML);
            }
          } else if (
            // prevents two operators next to each other
            // prevents an operator from being to the right
            // of a decimal point.
            // Operator to the left of a decimal is okay.
            isNaN(parseFloat(workingDisplay[characterCount - 1])) === false
          ) {
            if (this.classList.contains("operator")) {
              if (this.classList.contains("equal")) {
                // answerBox.innerHTML = "answer";
                cleaningUpArray();
                evaluateExpression();
              } else {
                operatorPresent = true;
                hasDecimal = false;
                characterCount++;
                workingDisplay.push(this.innerHTML);
                answerBox.innerHTML = workingDisplay.join("");
                tempNumberSet = [];
              }
            } else {
              characterCount++;
              workingDisplay.push(this.innerHTML);
              answerBox.innerHTML = workingDisplay.join("");
              tempNumberSet.push(this.innerHTML);
            }
          }
        } else {
          characterCount++;
          workingDisplay.push(this.innerHTML);
          answerBox.innerHTML = workingDisplay.join("");
          tempNumberSet.push(this.innerHTML);
        }
      } else if (this.classList.contains("clear")) {
        clearAll();
      } else {
        if (
          this.classList.contains("decimal") ||
          this.classList.contains("operator")
        ) {
          if (this.classList.contains("operator")) {
            operatorPresent = true;
            hasDecimal = false;
            characterCount = characterCount + 2;
            workingDisplay.push(0, this.innerHTML);
            answerBox.innerHTML = workingDisplay.join("");
            tempNumberSet = [];
          } else if (this.classList.contains("decimal")) {
            hasDecimal = true;
            characterCount = characterCount + 2;
            workingDisplay.push(0, this.innerHTML);
            answerBox.innerHTML = workingDisplay.join("");
            tempNumberSet.push(this.innerHTML);
          }
        } else {
          characterCount++;
          workingDisplay.push(this.innerHTML);
          answerBox.innerHTML = workingDisplay.join("");
          tempNumberSet.push(this.innerHTML);
        }
      }
    });
  }
}

// Empty out arrays and variables when you hit CLR
function clearAll() {
  answerBox.innerHTML = `0`;
  workingDisplay = [];
  characterCount = 0;
  tempNumberSet = [];
  tempExpression = [];
  addOnArray = [];
  cleanedUpNumbers = [];
  arithmeticArray = [];
  indexCount = 0;
  characterCount = 0;
  operatorPresent = false;
  hasDecimal = false;
}

// this prepares the array for evaluation of the entire expression
function cleaningUpArray() {
  if (
    workingDisplay[workingDisplay.length - 1] === "x" ||
    workingDisplay[workingDisplay.length - 1] === "/" ||
    workingDisplay[workingDisplay.length - 1] === "+" ||
    workingDisplay[workingDisplay.length - 1] === "-" ||
    workingDisplay[workingDisplay.length - 1] === "."
  ) {
    workingDisplay.pop();
  }
  for (let i = 0; i < workingDisplay.length; i++) {
    if (
      workingDisplay[i] !== "x" &&
      workingDisplay[i] !== "/" &&
      workingDisplay[i] !== "+" &&
      workingDisplay[i] !== "-"
    ) {
      tempExpression.push(workingDisplay[i]);
      cleanedUpNumbers = tempExpression.join("");
      addOnArray = cleanedUpNumbers;

      if (indexCount === workingDisplay.length - 1) {
        arithmeticArray.push(addOnArray);
      }
    } else {
      //   arithmeticArray.push(workingDisplay[i]);
      cleanedUpNumbers = cleanedUpNumbers.split(" ");
      cleanedUpNumbers.push(workingDisplay[i]);
      arithmeticArray = arithmeticArray.concat(cleanedUpNumbers);
      cleanedUpNumbers = [];
      tempExpression = [];
    }
    // console.log(indexCount);
    indexCount++;
  }
  if (
    arithmeticArray[arithmeticArray.length - 1] === "x" ||
    arithmeticArray[arithmeticArray.length - 1] === "/" ||
    arithmeticArray[arithmeticArray.length - 1] === "+" ||
    arithmeticArray[arithmeticArray.length - 1] === "-" ||
    arithmeticArray[arithmeticArray.length - 1] === "."
  ) {
    arithmeticArray.pop();
  }
  return arithmeticArray;
}

function evaluateExpression() {
  while (arithmeticArray.length > 1) {
    indexOfMultiply = arithmeticArray.indexOf("x");
    indexOfDivide = arithmeticArray.indexOf("/");
    // if either 'x' or '/' appears, the following are all possible cases
    if (
      arithmeticArray.includes("x") === true ||
      arithmeticArray.includes("/") === true
    ) {
      if (arithmeticArray.includes("x")) {
        // if both 'x', '/' found but 'x' appears first in array
        if (indexOfMultiply < indexOfDivide && indexOfDivide >= 0) {
          indexOfMultiplyOrDivide = arithmeticArray.indexOf("x");
          firstOperand = parseFloat(
            arithmeticArray[indexOfMultiplyOrDivide - 1]
          );
          operator = arithmeticArray[indexOfMultiplyOrDivide];
          secondOperand = parseFloat(
            arithmeticArray[indexOfMultiplyOrDivide + 1]
          );
          arithmeticOperations();
          arithmeticArray.splice(indexOfMultiplyOrDivide - 1, 3, tempAnswer);
          console.log(arithmeticArray);
        }
        // if both 'x', '/' found but '/' appears first in array
        else if (
          arithmeticArray.includes("/") === true &&
          indexOfMultiply > indexOfDivide &&
          indexOfDivide >= 0
        ) {
          indexOfMultiplyOrDivide = arithmeticArray.indexOf("/");
          firstOperand = parseFloat(
            arithmeticArray[indexOfMultiplyOrDivide - 1]
          );
          operator = arithmeticArray[indexOfMultiplyOrDivide];
          secondOperand = parseFloat(
            arithmeticArray[indexOfMultiplyOrDivide + 1]
          );
          arithmeticOperations();
          arithmeticArray.splice(indexOfMultiplyOrDivide - 1, 3, tempAnswer);
          console.log(arithmeticArray);
        }
        // if only 'x' appears, just multiply.
        else {
          indexOfMultiplyOrDivide = arithmeticArray.indexOf("x");
          firstOperand = parseFloat(
            arithmeticArray[indexOfMultiplyOrDivide - 1]
          );
          operator = arithmeticArray[indexOfMultiplyOrDivide];
          secondOperand = parseFloat(
            arithmeticArray[indexOfMultiplyOrDivide + 1]
          );
          arithmeticOperations();
          arithmeticArray.splice(indexOfMultiplyOrDivide - 1, 3, tempAnswer);
          console.log(arithmeticArray);
        }
      }
      // if only '/' appears
      else {
        indexOfMultiplyOrDivide = arithmeticArray.indexOf("/");
        firstOperand = parseFloat(arithmeticArray[indexOfMultiplyOrDivide - 1]);
        operator = arithmeticArray[indexOfMultiplyOrDivide];
        secondOperand = parseFloat(
          arithmeticArray[indexOfMultiplyOrDivide + 1]
        );
        arithmeticOperations();
        arithmeticArray.splice(indexOfMultiplyOrDivide - 1, 3, tempAnswer);
        console.log(arithmeticArray);
      }
    }
    // if only '+' or '-' are in the array, no need for order of operations
    else {
      firstOperand = parseFloat(arithmeticArray[0]);
      operator = arithmeticArray[1];
      secondOperand = parseFloat(arithmeticArray[2]);
      arithmeticOperations();
      arithmeticArray.shift();
      arithmeticArray.shift();
      arithmeticArray.shift();
      arithmeticArray.unshift(tempAnswer);
      console.log(arithmeticArray);
    }
  }
  answerBox.innerHTML = tempAnswer;
  return `${tempAnswer}`;
}

function arithmeticOperations() {
  if (operator === "+") {
    tempAnswer = firstOperand + secondOperand;
  } else if (operator === "-") {
    tempAnswer = firstOperand - secondOperand;
  } else if (operator === "x") {
    tempAnswer = firstOperand * secondOperand;
  } else if (operator === "/") {
    tempAnswer = firstOperand / secondOperand;
  }
}
