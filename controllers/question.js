'use strict'

const questions = require('../models').questions

async function createQuestion (req, h) {
  let result
  try {
    result = await questions.create(req.payload, req.state.user)
    console.log(`Question created with ID: ${result}`)
  } catch (error) {
    console.error(`An Error was happen: ${error}`)

    return h.view('ask', {
      title: 'Send Question',
      error: 'Problems creating the question'
    }).code(500).takeover
  }

  return h.response(`Question created with ID: ${result}`)
}

module.exports = {
  createQuestion
}