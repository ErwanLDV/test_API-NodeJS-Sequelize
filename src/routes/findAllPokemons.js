const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth') // middleware jwt
  
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name 
      const limit = parseInt(req.query.limit) || 5  // Si limitaion === limitation sinon limitation à 5 par default

      if(name.length <= 1) {
        const message = 'Le terme de recherche doit contenir au moins 2 caractères'
        return res.status(400).json({ message })
        
      }
      // findAll avec condition(recherche strict) ou pour recherche avec pagination findAndCountAll
      return Pokemon.findAndCountAll({ where: { 
        name: {
          [Op.like]: `%${name}%` // {where: { name: name }} === recherche strict => ici utilisation d'un opérateur sequelize avec like
        }
       },
       order: ['name'], // order by name ASC
       limit: limit // limitation
      })
      .then(({ count, rows }) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}`
        res.json({ message, data: rows })
      })
    }else {
      Pokemon.findAll({ order: ['name'] })
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        }).catch(error => {
          const message = `La liste des pokemons n'a pas pu etre récupérée. Réessayez dans quelques instants.`
          res.status(500).json({message, data: error})
        })
    }
  })
}