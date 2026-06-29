function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show " + type;
  setTimeout(() => {
    toast.className = "";
  }, 3000);
}
//login
const passwordInput = document.getElementById("loginPassword");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {
  const eyeIcon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}
// Register Password
const registerPassword = document.getElementById("registerPassword");
const toggleRegisterPassword = document.getElementById(
  "toggleRegisterPassword",
);

if (registerPassword && toggleRegisterPassword) {
  const eye = toggleRegisterPassword.querySelector("i");

  toggleRegisterPassword.addEventListener("click", () => {
    if (registerPassword.type === "password") {
      registerPassword.type = "text";
      eye.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      registerPassword.type = "password";
      eye.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// Confirm Password
const confirmPassword = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

if (confirmPassword && toggleConfirmPassword) {
  const eye = toggleConfirmPassword.querySelector("i");

  toggleConfirmPassword.addEventListener("click", () => {
    if (confirmPassword.type === "password") {
      confirmPassword.type = "text";
      eye.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      confirmPassword.type = "password";
      eye.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// register
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    // Check passwords
    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check username already exists
    const exists = users.find((user) => user.username === username);

    if (exists) {
      showToast("Username already exists!", "error");

      return;
    }

    // Save user
    users.push({
      username,
      password,
    });

    localStorage.setItem("users", JSON.stringify(users));

    showToast("Registration Successful!", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const remember = document.getElementById("rememberMe").checked;
    // get users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // find matching user
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      showToast("Invalid username or password!", "error");
      return;
    }
    // Save logged in user
    localStorage.setItem("currentUser", username);
    // Remember Me
    if (remember) {
      localStorage.setItem("rememberUser", username);
    } else {
      localStorage.removeItem("rememberUser");
    }
    showToast("Login Successful!", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
}
// Auto Fill Remember Me
window.addEventListener("DOMContentLoaded", () => {
  const rememberedUser = localStorage.getItem("rememberUser");
  if (rememberedUser) {
    document.getElementById("loginUsername").value = rememberedUser;
    document.getElementById("rememberMe").checked = true;
  }
});
// forgot password modal
const forgotLink = document.querySelector(".forgot-password");
const forgotModal = document.getElementById("forgotModal");
const cancelReset = document.getElementById("cancelReset");

if (forgotLink && forgotModal) {
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    forgotModal.classList.add("active");
  });
}

if (cancelReset && forgotModal) {
  cancelReset.addEventListener("click", () => {
    forgotModal.classList.remove("active");
  });
}

window.addEventListener("click", (e) => {
  if (e.target === forgotModal) {
    forgotModal.classList.remove("active");
  }
});
// reset password
const resetPasswordBtn = document.getElementById("resetPasswordBtn");

if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener("click", () => {
    const username = document.getElementById("forgotUsername").value.trim();

    const newPassword = document.getElementById("newPassword").value;

    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    if (username === "" || newPassword === "" || confirmNewPassword === "") {
      showToast("Please fill all fields!", "error");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex === -1) {
      showToast("Username not found!", "error");
      return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    showToast("Password updated successfully!", "success");

    forgotModal.classList.remove("active");

    document.getElementById("forgotUsername").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";
  });
}

// New Password
const newPassword = document.getElementById("newPassword");
const toggleNewPassword = document.getElementById("toggleNewPassword");

if (newPassword && toggleNewPassword) {
  const eye = toggleNewPassword.querySelector("i");

  toggleNewPassword.addEventListener("click", () => {
    if (newPassword.type === "password") {
      newPassword.type = "text";
      eye.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      newPassword.type = "password";
      eye.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// Confirm New Password
const confirmNewPassword = document.getElementById("confirmNewPassword");
const toggleConfirmNewPassword = document.getElementById(
  "toggleConfirmNewPassword",
);

if (confirmNewPassword && toggleConfirmNewPassword) {
  const eye = toggleConfirmNewPassword.querySelector("i");

  toggleConfirmNewPassword.addEventListener("click", () => {
    if (confirmNewPassword.type === "password") {
      confirmNewPassword.type = "text";
      eye.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      confirmNewPassword.type = "password";
      eye.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}
