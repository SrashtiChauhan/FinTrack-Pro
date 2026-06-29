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
const dateInput = document.getElementById("date");

if (addBtn && modal) {
  addBtn.onclick = () => {
    modal.classList.add("active");
    if (dateInput) {
      dateInput.value = new Date().toISOString().split("T")[0];
    }
  };
}

if (closeBtn && modal) {
  closeBtn.onclick = () => {
    modal.classList.remove("active");
  };
}
if (dateInput) {
  dateInput.value = new Date().toISOString().split("T")[0];
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
function updateDashboard() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  });
  const balance = income - expense;
  document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
  document.getElementById("income").textContent = `$${income.toFixed(2)}`;
  document.getElementById("expense").textContent = `$${expense.toFixed(2)}`;
  document.getElementById("transactionCount").textContent = transactions.length;
}

function renderTransactions() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const table = document.getElementById("transactionTable");

  table.innerHTML = "";

  transactions.forEach((transaction) => {
    table.innerHTML += `
        <tr>
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.type === "income" ? "+" : "-"}$${transaction.amount}</td>
            <td>
            <button class="delete-btn" data-id="${transaction.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
            </td>
        </tr>
    `;
  });
}
// transaction

const transactionForm = document.getElementById("transactionForm");

if (transactionForm) {
  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const transaction = {
      id: Date.now(),
      type: document.getElementById("type").value,
      description: document.getElementById("description").value.trim(),
      amount: Number(document.getElementById("amount").value),
      date: document.getElementById("date").value,
      category: document.getElementById("category").value,
    };

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    transactionForm.reset();
    dateInput.value = new Date().toISOString().split("T")[0];
    modal.classList.remove("active");
    renderTransactions();
    updateDashboard();
  });
}
renderTransactions();
updateDashboard();
