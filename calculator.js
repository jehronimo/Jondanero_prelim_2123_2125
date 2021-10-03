const pageLoaded = () => {
  const add = (first, second) => {
    return Number(first) + Number(second);
  };

  const subtract = (first, second) => {
    return Number(first) - Number(second);
  };

  const multiply = (first, second) => {
    return Number(first) * Number(second);
  };

  const divide = (first, second) => {
    return Number(first) / Number(second);
  };

  const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
  };

  let operation;
  let isNotCalculated = true;
  let isCalculatedByEquals = false;
  let firstNum;
  let secondNum;

  let displayScreen = document.querySelector(".screen");

  const onNumberClicked = (button) => {
    return () => {
      if (button.value == "." && displayScreen.value.includes(".")) {
        return;
      }

      if (isCalculatedByEquals) {
        displayScreen.value = button.value;
        isCalculatedByEquals = false;
        isNotCalculated = false;
        return;
      }
      if (displayScreen.value == "0" && button.value != ".") {
        displayScreen.value = button.value;
        return;
      }
      if (operation && isNotCalculated && !isCalculatedByEquals) {
        displayScreen.value = button.value;
        isNotCalculated = false;
      } else {
        displayScreen.value += button.value;
      }
    };
  };

  const onOperatorClicked = (button) => {
    return () => {
      if (displayScreen.value == "") {
        return;
      }
      if (firstNum != undefined && !isNotCalculated) {
        secondNum = displayScreen.value;
      } else {
        firstNum = displayScreen.value;
      }

      if (operation && firstNum && secondNum) {
        let answer = calculate(operation, firstNum, secondNum);
        reset(answer);
        isCalculatedByEquals = false;
      }
      operation = button.value;
    };
  };

  const addNumericalButtonListener = (button) => {
    button.addEventListener("click", onNumberClicked(button));
  };

  const addOperatorButtonListener = (button) => {
    button.addEventListener("click", onOperatorClicked(button));
  };

  const numericalButtons = document.querySelectorAll(".numerical-btn");
  numericalButtons.forEach(addNumericalButtonListener);

  const operatorButtons = document.querySelectorAll(".operator-btn");
  operatorButtons.forEach(addOperatorButtonListener);
};
pageLoaded();
