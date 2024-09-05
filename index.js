

let btnNumber = document.querySelectorAll('.btn-number');
let opDisplay = document.querySelector('.operationScreen');


btnNumber.forEach((btn) => {
    btn.addEventListener("click", () =>{
        console.log(typeof(btn.innerText));
    });
})
document.addEventListener('keypress', (a) => {
  opDisplay.innerText += `${a.key}`;
});

