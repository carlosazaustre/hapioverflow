'use strict'

const Boom = require('boom')
const users = require('../models').users

async function createUser (req, h) {
  let result
  try {
    result = await users.create(req.payload)
  } catch (error) {
    console.error(error)
    return h.view('register', {
      title: 'Sign Up',
      error: 'Error creating the user'
    })
  }

  return h.view('register', {
    title: 'Sign Up',
    success: 'Succesfully user created'
  })
}

function logout (req, h) {
  return h.redirect('/login').unstate('user')
}

async function validateUser (req, h) {
  let result
  try {
    result = await users.validateUser(req.payload)
    if (!result) {
      return h.view('login', {
        title: 'Login',
        error: 'Wrong email/password'
      })
    }
  } catch (error) {
    console.error(error)
    return h.view('login', {
      title: 'Login',
      error: 'Problems validating the user'
    })
  }

  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

function failValidation (req, h, err) {
  const templates = {
    '/create-user': 'register',
    '/validate-user': 'login',
    '/create-question': 'ask'
  }
  return h.view(templates[req.path], {
    title: 'Validation Error',
    error: 'Please, complete the required fields'
  }).code(400).takeover()
}

module.exports = {
  createUser,
  validateUser,
  logout,
  failValidation
}
