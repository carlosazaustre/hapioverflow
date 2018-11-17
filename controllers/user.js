'use strict'

const Boom = require('boom')
const users = require('../models').users

async function createUser (req, h) {
  let result
  try {
    result = await users.create(req.payload)
  } catch (error) {
    console.error(error)
    return h.response('Problems creating the user').code(500)
  }

  return h.response(`User created ID: ${result}`)
}

function logout (req, h) {
  return h.redirect('/login').unstate('user')
}

async function validateUser (req, h) {
  let result
  try {
    result = await users.validateUser(req.payload)
    if (!result) {
      return h.response('Wrong email or password').code(401)
    }
  } catch (error) {
    console.error(error)
    return h.response('Problems validating the user').code(500)
  }

  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

function failValidation (req, h, err) {
  return Boom.badRequest('Validation Failed', req.payload)
}

module.exports = {
  createUser,
  validateUser,
  logout,
  failValidation
}
