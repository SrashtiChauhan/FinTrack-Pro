const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.href = "login.html";
}

const username = document.getElementById("currentUsername");

if (username) {
  username.textContent = currentUser;
}

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}

const modal = document.getElementById("transactionModal");
const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close");

if (addBtn && modal) {
  addBtn.onclick = () => {
    modal.classList.add("active");
  };
}

if (closeBtn && modal) {
  closeBtn.onclick = () => {
    modal.classList.remove("active");
  };
}

window.onclick = (e) => {
  if (modal && e.target === modal) {
    modal.classList.remove("active");
  }
};

const dashboardBtn = document.getElementById("dashboardBtn");
const settingsBtn = document.getElementById("settingsBtn");

const dashboardPage = document.getElementById("dashboardPage");
const settingsPage = document.getElementById("settingsPage");

if (dashboardBtn && settingsBtn) {
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
}
