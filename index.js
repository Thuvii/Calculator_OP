

let btnNumber = document.querySelectorAll('.btn-number');



btnNumber.forEach((btn) => {
    btn.addEventListener("click", () =>{
        console.log(btn.innerText)
    });
})