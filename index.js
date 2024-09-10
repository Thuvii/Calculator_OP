//document.addEventListener('keypress', (a) => {
//  opDisplay.innerText += `${a.key}`;
//});

let number1 = "";
let number2 = "";
let oper = "";
let checkNum2 = false;

let btnNumber = document.querySelectorAll(".btn-number");
let opDisplay = document.querySelector(".operationScreen");
let operation = document.querySelectorAll(".btn-oper");
let equal = document.querySelector(".result-btn");
let resDisplay = document.querySelector(".resultScreen");
let cleanScreen = document.querySelector(".clear-btn");
let dotBtn = document.querySelector(".dot-btn");
let signBtn = document.querySelector(".btn-sign");

function getNumber() {
  btnNumber.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleInputAll(btn.innerText);
    });
  });
}

function handleInputAll(value) {
  if (!checkNum2) {
    if (value == "." && !number1.includes(".")) {
      number1 += value;
      checkdot(number1);
    } else if (!isNaN(value)) {
      number1 += value;
    }
    opDisplay.innerText = number1;
  } else {
    if (value == "." && !number2.includes(".")) {
      number2 += value;
      checkdot(number2);
    } else if (!isNaN(value)) {
      number2 += value;
    }
    opDisplay.innerText = number1 + " " + oper + " " + number2;
  }
}

let operatorSign = ["+", "-", "÷", "×", "%", "/", "*"];
function handleInputOper(value) {
  if (number1 && oper && number2) {
    calculate();
  } else if (number1) {
    if (operatorSign.includes(value)) {
      if (value == "/") {
        oper = "÷";
      } else if (value == "*") {
        oper = "×";
      } else {
        oper = value;
      }
      checkNum2 = true;
      opDisplay.innerText = number1 + " " + oper;
    }
  }
}

function changeSignBtn(number) {
  if (number == "") {
    return number;
  } else {
    number = parseFloat(number) * -1;
    return number;
  }
}

function getOper() {
  operation.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleInputOper(btn.innerText);
      btn.classList.add("select");
    });
  });
}

function checkdot(number) {
  if (number.includes(".")) {
    dotBtn.disabled = true;
  } else {
    dotBtn.disabled = false;
  }
}

function handleBackspace() {
  if (number2) {
    number2 = number2.substring(0, number2.length - 1);
    opDisplay.innerText = number1 + " " + oper + " " + number2;
  } else if (oper) {
    oper = "";
    opDisplay.innerText = number1;
  } else if (number1) {
    number1 = number1.substring(0, number1.length - 1);
    if (number1 == "") {
      checkNum2 = false;
    }
    opDisplay.innerText = number1;
  }
}

function calculate() {
  let result = 0;
  if (number1 && number2 && oper) {
    let n1 = parseFloat(number1);
    let n2 = parseFloat(number2);
    switch (oper) {
      case "+":
        result = n1 + n2;
        break;
      case "-":
        result = n1 - n2;
        break;
      case "*":
      case "×":
        result = n1 * n2;
        break;
      case "/":
      case "÷":
        if (n2 == 0) {
          resDisplay.innerText = "Can't divide by 0";
          return;
        } else {
          result = n1 / n2;
        }
        break;
      case "%":
        result = (n1 / n2) * 100;
        break;
    }
    result = parseFloat(result.toFixed(10));
    resDisplay.innerText = result;
    number1 = result.toString();
    number2 = "";
    oper = "";
    checkNum2 = false;
  }
}

function clearAll() {
  number1 = "";
  number2 = "";
  oper = "";
  checkNum2 = false;
  dotBtn.disabled = false;
  signBtn.disabled = false;
}
function clean() {
  resDisplay.innerText = "0";
  opDisplay.innerText = "";
  number1 = "";
  number2 = "";
  oper = "";
  dotBtn.disabled = false;
  signBtn.disabled = false;
}

signBtn.addEventListener("click", () => {
  if (!checkNum2) {
    number1 = changeSignBtn(number1);
    opDisplay.innerText = number1;
  } else {
    number2 = changeSignBtn(number2);
    opDisplay.innerText = number1 + " " + oper + " " + number2;
  }
});
equal.addEventListener("click", calculate);
cleanScreen.addEventListener("click", clean);
getNumber();
getOper();

document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (!isNaN(key) || key === ".") {
    handleInputAll(key);
  } else if (operatorSign.includes(key)) {
    handleInputOper(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    handleBackspace();
  }
});
