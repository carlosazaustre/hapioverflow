'use strict'

function home (req, h) {
  return h.view('index', {
    title: 'Home'
  })
}

function register (req, h) {
  return h.view('register', {
    title: 'Registro'
  })
}

module.exports = {
  home,
  register
}
