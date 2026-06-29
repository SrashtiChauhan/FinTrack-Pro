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
const dashboardBtn = document.getElementById("dashboardBtn");
const settingsBtn = document.getElementById("settingsBtn");

const dashboardPage = document.getElementById("dashboardPage");
const settingsPage = document.getElementById("settingsPage");

dashboardBtn.addEventListener("click", () => {

    dashboardBtn.classList.add("active");
    settingsBtn.classList.remove("active");

    dashboardPage.style.display = "block";
    settingsPage.classList.remove("active");

});

settingsBtn.addEventListener("click", () => {

    settingsBtn.classList.add("active");
    dashboardBtn.classList.remove("active");

    dashboardPage.style.display = "none";
    settingsPage.classList.add("active");

});