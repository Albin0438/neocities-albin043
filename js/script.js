// Function to toggle password visibility (Keep your existing code here)
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "👁️";
    }
}

// NEW: Handle Registration Validation & Alerts
function handleRegistration(event) {
    event.preventDefault(); // Stops the page from reloading immediately

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // 1. Check if passwords match
    if (password !== confirmPassword) {
        alert("❌ Registration Failed: Passwords do not match!");
        return false;
    }

    // 2. If everything passes
    alert("✅ Registration Successful!");
    
    // Redirect the user to the login page after they click 'OK'
    window.location.href = "login.html"; 
}

// NEW: Handle Login Alerts
function handleLogin(event) {
    event.preventDefault(); // Stops page reload
    
    // For now, it will accept any login input since there is no backend database
    alert("✅ Login Successful!");
}