const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = loginForm.querySelector('input[placeholder="Username"]').value;
    const password = loginForm.querySelector('input[placeholder="Password"]').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
        localStorage.setItem("loggedInUser", username);
        localStorage.setItem("role", foundUser.role); // Simpan role

        if (foundUser.role === "admin") {
            window.location.href = "panel.html";
        } else {
            window.location.href = "non-admin.html";
        }
    } else {
        alert("Username atau password salah!");
    }
});


registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = registerForm.querySelector('input[placeholder="Username"]').value;
    const email = registerForm.querySelector('input[placeholder="Email"]').value;
    const password = registerForm.querySelector('input[placeholder="Password"]').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const usernameExists = users.some(user => user.username === username || user.email === email);

    if (usernameExists) {
        alert("Username atau email sudah digunakan!");
        return;
    }

    // Tentukan role: jika username adalah "admin", maka role admin, selain itu user
    const role = (username === "admin") ? "admin" : "user";

    users.push({ username, email, password, role }); // simpan role
    localStorage.setItem("users", JSON.stringify(users));

    alert("Pendaftaran berhasil! Silakan login.");
    container.classList.remove('active'); // kembali ke halaman login
});

if (foundUser) {
    localStorage.setItem("loggedInUser", username);

    // Simulasi role admin
    if (username === "admin") {
        window.location.href = "panel.html";
    } else {
        window.location.href = "non-admin.html";
    }
} else {
    alert("Username atau password salah!");
}
function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    window.location.href = "index.html";
}
