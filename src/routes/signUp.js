const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const { UniqueConstraintError } = require('sequelize')


module.exports = (app) => {

  app.post('/api/signup', (req, res) => {
    
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
      const message = `Vous devez entrer un pseudo et un mot de passe pour vous enregistrer`;
      return res.status(401).json({ message })
    }

    bcrypt.hash(password, 10).then(hashPassword => {
      User.create({
        username: username,
        password: hashPassword
      }).then(user => {
        // JWT
        const token = jwt.sign(
          { userId: user.id },
          privateKey,
          { expiresIn: '24h' }
        )
        const message = `Le compte a bien été crée.`
        res.json({ message, data: user, token })
      }).catch(error => {
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `L'inscription n'a pas pu etre éffectuée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    })
  })


}