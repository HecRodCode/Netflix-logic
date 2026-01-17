// Sign Up
const registerForm = document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener('submit', registerUser);
}

function registerUser(e) {
  e.preventDefault();

  // Select data
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const message = document.getElementById('register-message');

  // Validation
  if (password !== confirmPassword) {
    message.innerText = 'Passwords do not match';
    message.style.color = 'red';
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Validate if the user already exists
  if (
    users.some(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    )
  ) {
    message.innerText = 'The user already exists.';
    message.style.color = 'red';
    return;
  }

  // Add user
  users.push({
    email,
    password,
    profiles: [
      { id: 1, name: 'Profile 1', avatar: './assets/avatar-prede.webp' },
    ],
    favorites: {},
  });

  // Save in localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Message
  message.innerText = 'User successfully registered!';
  message.style.color = 'green';
  registerForm.reset();
}

// Login
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', loginUser);
}

function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const message = document.getElementById('login-message');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  // Validation
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect to profiles.html
    window.location.href = 'profiles.html';
  } else {
    if (message) {
      message.innerText = 'Incorrect email or password';
      message.style.color = 'red';
    } else {
      document.message.innerText = 'Incorrect email or password';
      loginForm.appendChild(message);
    }
  }
}
