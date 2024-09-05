//document.addEventListener('keypress', (a) => {
//  opDisplay.innerText += `${a.key}`;
//});

let number1 = "";
let number2 = "";
let oper = "";
let checkNum2 = false;

let btnNumber = document.querySelectorAll(".btn-number");
let opDisplay = document.querySelector(".operationScreen");
let operNumber = document.querySelectorAll(".btn-oper");
let equal = document.querySelector(".result-btn");
let resDisplay = document.querySelector(".resultScreen");
let cleanScreen = document.querySelector(".clean-btn");

function getNumber() {
  btnNumber.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!checkNum2) {
        number1 += btn.innerText;
        opDisplay.innerText = number1;
      } else {
        number2 += btn.innerText;
        opDisplay.innerText = number1 + " " + oper + " " + number2;
      }
    });
  });
}
function getOper() {
  operNumber.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (number1) {
        oper = btn.innerText;
        checkNum2 = true;
        opDisplay.innerText = number1 + " " + oper;
      }
    });
  });
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
      case "x":
        result = n1 * n2;
        break;
      case "÷":
        result = n1 / n2;
        break;
  
    }
    resDisplay.innerText = result;
    clearAll();
  }
}

function clearAll() {
  number1 = "";
  number2 = "";
  oper = "";
  checkNum2 = false;
}
function clean(){
 resDisplay.innerText = ""; 
}


equal.addEventListener("click", calculate);

getNumber();
getOper();
