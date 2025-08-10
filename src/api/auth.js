const USERS_KEY = 'users'
const TOKEN_KEY = 'token'
const USERNAME_KEY = 'username'

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const AuthAPI = {
  register(username, email, password) {
    const users = getUsers()
    if (users.find(u => u.email === email)) {
      throw new Error('Email already exists')
    }
    users.push({ username, email, password })
    saveUsers(users)
  },

  login(email, password) {
    const user = getUsers().find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid credentials')
    localStorage.setItem(TOKEN_KEY, 'fake-token')
    localStorage.setItem(USERNAME_KEY, user.username)
  },

  me() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return null
    return { username: localStorage.getItem(USERNAME_KEY) }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USERNAME_KEY)
  }
}