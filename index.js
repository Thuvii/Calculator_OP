//document.addEventListener('keypress', (a) => {
//  opDisplay.innerText += `${a.key}`;
//});

let number1 = 0;
let number2 = 0;
let oper = "";
let checkNum2 = false;


let btnNumber = document.querySelectorAll(".btn-number");
let opDisplay = document.querySelector(".operationScreen");
let operation = document.querySelectorAll(".btn-oper");
let equal = document.querySelector(".result-btn");
let resDisplay = document.querySelector(".resultScreen");
let cleanScreen = document.querySelector(".clear-btn");
let dotBtn = document.querySelector(".dot-btn");

function getNumber() {
  btnNumber.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!checkNum2) {
        if(btn.innerText == "+/-"){
          number1 = changeSign(number1);
        }else{
          number1 += btn.innerText;
          checkdot(number1);
        }
        opDisplay.innerText = number1;
      } else {
        if(btn.innerText == "+/-"){
          number2 = changeSign(number2);
        }else{
          number2 += btn.innerText;
          checkdot(number2);
        }
        opDisplay.innerText = number1 + " " + oper + " " + number2;
      }
    });
  });
}

function changeSign(a){
  return parseFloat(a) * -1
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

function checkdot(number){
  if(number.includes(".")){
    dotBtn.disabled = true;
  }else{
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
        if(n2 == 0){
          resDisplay.innerText = "Can't divide by 0";
          return;
        }else{
          result = n1 / n2;
        }
        break;
      case "%":
        result = (n1/n2) * 100;
        break;
    }
    result = parseFloat(result.toFixed(10))
    resDisplay.innerText = result;
    clearAll();
  }
}

function clearAll() {
  number1 = 0;
  number2 = 0;
  oper = "";
  checkNum2 = false;
  dotBtn.disabled = false;
}
function clean(){
 resDisplay.innerText = ""; 
 opDisplay.innerText = "";
 clearAll();
  dotBtn.disabled = false;
}


equal.addEventListener("click", calculate);
cleanScreen.addEventListener("click", clean);
getNumber();
getOper();

