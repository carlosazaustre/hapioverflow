'use strict'

function home (req, h) {
  return h.view('index', {
    title: 'Home'
  })
}

function register (req, h) {
  return h.view('register', {
    title: 'Sign Up'
  })
}

function login (req, h) {
  return h.view('login', {
    title: 'Login'
  })
}

module.exports = {
  home,
  register,
  login
}
