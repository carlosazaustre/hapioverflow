'use strict'

const bcrypt = require('bcrypt')

class Users {
  constructor (db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('users')
  }

  async create (data) {
    data.password = await this.constructor.encrypt(data.password)
    const newUser = this.collection.push()
    newUser.set(data)

    return newUser.key
  }

  static async ecncrypt (passwd) {
    const saltRounds = 10
    const hashPassword = await bcrypt.hash(passwd, saltRounds)
    return hashPassword
  }
}

module.exports = Users
