// OBTENER USUARIO LOGUEADO
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

// Guard de seguridad
if (!currentUser) {
  window.location.href = 'login.html';
}

// CONTENEDOR DE PERFILES
const container = document.getElementById('profiles-container');

// FUNCIÓN PARA RENDERIZAR PERFILES
function renderProfiles(profiles) {
  if (!container) return;

  container.innerHTML = '';

  profiles.forEach((profile) => {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');

    const img = document.createElement('img');
    img.src = profile.avatar;
    img.alt = profile.name;
    img.classList.add('profile-img');

    const name = document.createElement('p');
    name.innerText = profile.name;
    name.classList.add('profile-name');

    profileDiv.addEventListener('click', () => {
      sessionStorage.setItem('currentProfile', JSON.stringify(profile));
      window.location.href = 'home.html';
    });

    profileDiv.appendChild(img);
    profileDiv.appendChild(name);
    container.appendChild(profileDiv);
  });
}

// INITIAL RENDER
renderProfiles(currentUser.profiles);

// MODAL (VANILLA JS)
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const saveProfileBtn = document.getElementById('save-profile');
const modal = document.getElementById('modal');
const profileInput = document.getElementById('new-profile-name');

// OPEN MODAL
if (openModalBtn && modal) {
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
}

// CLOSE MODAL
if (closeModalBtn && modal) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    profileInput.value = '';
  });
}

// SAVE NEW PROFILE
if (saveProfileBtn) {
  saveProfileBtn.addEventListener('click', () => {
    const name = profileInput.value.trim();

    if (!name) {
      alert('Profile name is required');
      return;
    }

    const newProfile = {
      id: Date.now(),
      name,
      avatar: './assets/avatar-prede.webp',
    };

    // ADD PROFILE TO CURRENT USER
    currentUser.profiles.push(newProfile);

    // UPDATE LOCALSTORAGE
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map((u) => (u.email === currentUser.email ? currentUser : u));
    localStorage.setItem('users', JSON.stringify(users));

    // UPDATE SESSIONSTORAGE
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Re-renderizar perfiles
    renderProfiles(currentUser.profiles);

    // CLOSE MODAL
    modal.classList.add('hidden');
    profileInput.value = '';
  });
}
