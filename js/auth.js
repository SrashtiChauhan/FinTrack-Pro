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
      alert("Passwords do not match!");

      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check username already exists
    const exists = users.find((user) => user.username === username);

    if (exists) {
      alert("Username already exists!");

      return;
    }

    // Save user
    users.push({
      username,
      password,
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    window.location.href = "login.html";
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
      alert("Invalid username or password!");
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

    alert("Login Successful!");

    window.location.href = "index.html";
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
