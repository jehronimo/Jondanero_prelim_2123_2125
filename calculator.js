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

  const reset = (answer) => {
    operation = undefined;
    firstNum = answer;
    secondNum = undefined;
    displayScreen.value = answer;
    isNotCalculated = true;
    isCalculatedByEquals = false;
  };

  const clear = () => {
    reset(undefined);
    displayScreen.value = "";
  };

  const calculate = (operator, firstNumber, secondNumber) => {
    operation = operations[operator];
    return operation(firstNumber, secondNumber);
  };

  let displayScreen = document.querySelector(".screen");

  const onNumberClicked = (button) => {
    return () => {
      if (button.value == "." && displayScreen.value.includes(".")) {
        return;
      }

      if (isCalculatedByEquals) {
        displayScreen.value = button.value;
        isCalculatedByEquals = false;
        isNotCalculated = true;
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

  const onEqualButtonClicked = () => {
    secondNum = displayScreen.value;
    let answer = calculate(operation, firstNum, secondNum);
    reset(answer);
    isCalculatedByEquals = true;
    operation = undefined;
  };

  const onHelloButtonClicked = () => {
    const lastInput = displayScreen.value;
    const displayLastInput = () => {
      isNaN(lastInput)
        ? (displayScreen.value = "")
        : (displayScreen.value = lastInput);
    };
    const words = ["Hello", "Bonjour", "Konnichiwa", "Hola", "Nǐn hǎo"];
    displayScreen.value = words[Math.trunc(Math.random() * words.length)];
    setTimeout(displayLastInput, 500);
  };

  const onByeButtonClicked = () => {
    displayScreen.value = "Goodbye";
    displayScreen.style.opacity = 1;
    let done = false;
    const fade = () => {
      displayScreen.style.opacity -= 0.2;

      if (displayScreen.style.opacity == 0) {
        done = true;
      }

      if (done) {
        clear();
        displayScreen.style.opacity = 1;
      } else {
        setTimeout(fade, 500);
      }
    };
    setTimeout(fade, 500);
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

  const equalButton = document.querySelector("#equal-btn");
  equalButton.addEventListener("click", onEqualButtonClicked);

  const acButton = document.querySelector("#ac-btn");
  acButton.addEventListener("click", clear);

  const helloButton = document.querySelector("#hello-btn");
  helloButton.addEventListener("click", onHelloButtonClicked);

  const byeButton = document.querySelector("#bye-btn");
  byeButton.addEventListener("click", onByeButtonClicked);
};
pageLoaded();
