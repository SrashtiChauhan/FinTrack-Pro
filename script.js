const modal = document.getElementById("transactionModal");

const addBtn = document.querySelector(".add-btn");

const closeBtn = document.querySelector(".close");

addBtn.onclick = () => {
    modal.classList.add("active");
}

closeBtn.onclick = () => {
    modal.classList.remove("active");
}

window.onclick = (e)=>{
    if(e.target===modal){
        modal.classList.remove("active");
    }
}