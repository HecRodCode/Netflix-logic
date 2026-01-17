export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function getCurrentUser() {
  return JSON.parse(sessionStorage.getItem('currentUser'));
}

export function setCurrentUser(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentProfile() {
  return JSON.parse(sessionStorage.getItem('currentProfile'));
}

export function setCurrentProfile(profile) {
  sessionStorage.setItem('currentProfile', JSON.stringify(profile));
}
