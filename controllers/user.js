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

module.exports = {
  createUser
}
