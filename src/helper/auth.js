import { ref } from 'vue'

const STORAGE_KEY = 'current_user'

function readUserFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

// State reactive dùng chung cho toàn app (Navbar, SidebarAdmin, route guard...)
export const currentUser = ref(readUserFromStorage())

export function getCurrentUser() {
  return currentUser.value
}

export function setCurrentUser(user) {
  currentUser.value = user
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function isLoggedIn() {
  return !!currentUser.value
}

export function isAdmin() {
  return currentUser.value?.role === 'admin'
}

export function logout() {
  currentUser.value = null
  localStorage.removeItem(STORAGE_KEY)
}
