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
const transactionForm = document.getElementById("transactionForm");

let editingId = null;

if (addBtn && modal) {
  addBtn.onclick = () => {
    editingId = null;
    if (transactionForm) {
      transactionForm.reset();
    }
    if (dateInput) {
      dateInput.value = new Date().toISOString().split("T")[0];
    }
    document.getElementById("modalTitle").textContent = "Add Transaction";
    document.getElementById("saveTransactionBtn").textContent =
      "Save Transaction";

    modal.classList.add("active");
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

function renderTransactions(list = null) {
  const transactions =
    list || JSON.parse(localStorage.getItem("transactions")) || [];
  const table = document.getElementById("transactionTable");

  table.innerHTML = "";

  if (transactions.length === 0) {
    table.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:25px;">
                No transactions found
            </td>
        </tr>
        `;
    return;
  }

  transactions.forEach((transaction) => {
    table.innerHTML += `
        <tr>
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.type === "income" ? "+" : "-"}$${transaction.amount}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-id="${transaction.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="delete-btn" data-id="${transaction.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `;
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      if (confirm("Delete this transaction?")) {
        deleteTransaction(id);
      }
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

      const transaction = transactions.find((t) => t.id === id);

      if (!transaction) return;

      editingId = id;

      document.getElementById("type").value = transaction.type;
      document.getElementById("description").value = transaction.description;
      document.getElementById("amount").value = transaction.amount;
      document.getElementById("date").value = transaction.date;
      document.getElementById("category").value = transaction.category;

      document.getElementById("modalTitle").textContent = "Edit Transaction";
      document.getElementById("saveTransactionBtn").textContent =
        "Update Transaction";

      modal.classList.add("active");
    });
  });
}

function deleteTransaction(id) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  transactions = transactions.filter((transaction) => transaction.id !== id);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  renderTransactions();
  updateDashboard();
}

function filterTransactions() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const type = document.getElementById("filterType").value;

  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const filtered = transactions.filter((transaction) => {
    const matchSearch =
      transaction.description.toLowerCase().includes(search) ||
      transaction.category.toLowerCase().includes(search);

    const matchType =
      type === "All Types" || transaction.type === type.toLowerCase();

    return matchSearch && matchType;
  });

  renderTransactions(filtered);
}

if (transactionForm) {
  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const transaction = {
      id: editingId ? editingId : Date.now(),
      type: document.getElementById("type").value,
      description: document.getElementById("description").value.trim(),
      amount: Number(document.getElementById("amount").value),
      date: document.getElementById("date").value,
      category: document.getElementById("category").value,
    };

    if (editingId) {
      transactions = transactions.map((t) =>
        t.id === editingId ? transaction : t,
      );
    } else {
      transactions.push(transaction);
    }

    localStorage.setItem("transactions", JSON.stringify(transactions));

    editingId = null;

    transactionForm.reset();
    dateInput.value = new Date().toISOString().split("T")[0];

    document.getElementById("modalTitle").textContent = "Add Transaction";
    document.getElementById("saveTransactionBtn").textContent =
      "Save Transaction";

    modal.classList.remove("active");

    renderTransactions();
    updateDashboard();
  });
}

renderTransactions();
updateDashboard();

document
  .getElementById("searchInput")
  .addEventListener("input", filterTransactions);
document
  .getElementById("filterType")
  .addEventListener("change", filterTransactions);
