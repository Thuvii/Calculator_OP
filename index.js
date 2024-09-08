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
      if (!checkNum2) {
        if (btn.innerText == "+/-") {
          changeSignBtn(number1);
        } else {
          number1 += btn.innerText;
          checkdot(number1);
        }
        opDisplay.innerText = number1;
      } else {
        if (btn.innerText == "+/-") {
          changeSignBtn(number2);
        } else {
          number2 += btn.innerText;
          checkdot(number2);
        }
        opDisplay.innerText = number1 + " " + oper + " " + number2;
      }
    });
  });
}

function changeSignBtn(number) {
  if (number == "") {
    signBtn.disabled = true;
    return;
  } else {
    signBtn.disabled = false;
    number = parseFloat(number) * -1;
    return number;
  }
}

function getOper() {
  operation.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (number1) {
        oper = btn.innerText;
        checkNum2 = true;
        opDisplay.innerText = number1 + " " + oper;
      }
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
      case "×":
        result = n1 * n2;
        break;
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
    clearAll();
  }
}

function clearAll() {
  number1 = "";
  number2 = "";
  oper = "";
  checkNum2 = false;
  dotBtn.disabled = false;
}
function clean() {
  resDisplay.innerText = "0";
  opDisplay.innerText = "";
  clearAll();
  dotBtn.disabled = false;
}

equal.addEventListener("click", calculate);
cleanScreen.addEventListener("click", clean);
getNumber();
getOper();
