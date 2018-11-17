'use strict'

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

async function validateUser (req, h) {
  console.log('Controller User: validateUser')
  let result
  console.log(req.payload)
  try {
    result = await users.validateUser(req.payload)
  } catch (error) {
    console.error(error)
    return h.response('Problems validating the user').code(500)
  }

  return result
}

module.exports = {
  createUser,
  validateUser
}
