import { getCurrentUser, getCurrentProfile } from './storage.js';

export function authGuard() {
  if (!getCurrentUser()) {
    window.location.href = 'login.html';
  }
}

export function profileGuard() {
  if (!getCurrentProfile()) {
    window.location.href = 'profiles.html';
  }
}
