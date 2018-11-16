'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
  credentials: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://platzi-overflow-3cb9d.firebaseio.com/'
})

const db = firebase.database()
const Users = require('./users')

module.exports = {
  users: new Users(db)
}
