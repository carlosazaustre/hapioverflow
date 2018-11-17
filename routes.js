'use strict'

const Joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: site.home
},

{
  method: 'GET',
  path: '/register',
  handler: site.register
},
{
  method: 'GET',
  path: '/login',
  handler: site.login
},
{
  method: 'GET',
  path: '/logout',
  handler: user.logout
},
{
  method: 'GET',
  path: '/ask',
  handler: site.ask
},

{
  method: 'POST',
  path: '/create-user',
  options: {
    validate: {
      payload: {
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
      },
      failAction: user.failValidation
    }
  },
  handler: user.createUser
},

{
  method: 'POST',
  path: '/validate-user',
  options: {
    validate: {
      payload: {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
      },
      failAction: user.failValidation
    }
  },
  handler: user.validateUser
},
{
  method: 'POST',
  path: '/create-question',
  options: {
    validate: {
      payload: {
        title: Joi.string().required(),
        description: Joi.string().required()
      },
      failAction: user.failValidation
    }
  },
  handler: question.createQuestion
},

{
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: '.',
      index: ['index']
    }
  }
},

{
  method: ['GET', 'POST'],
  path: '/{any*}',
  handler: site.notFound
}

]
