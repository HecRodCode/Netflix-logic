// Select form
const form = document.getElementById('register-form');
form.addEventListener('submit', registerUser);

function registerUser(e) {
  e.preventDefault();

  // Select data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    document.getElementById('message').innerText = 'the passwords do not match';
  }

  // add user
  let users = JSON.parse(localStorage.getItem('users')) || [];

  users.push({
    email,
    password,
    profiles: [{ id: 1, name: 'Perfil 1' }],
    favorites: {},
  });

  // add user in localStorage
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('message').innerText =
    'User successfully registered!';
  form.reset();
}
