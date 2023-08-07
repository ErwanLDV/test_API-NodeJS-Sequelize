const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => { // sync({ force: true }) pour ecraser les datas exstante a chaque demarrage
  return sequelize.sync().then(console.log('La base de donnée a bien été initialisée !'))
  // .then(_ => {
  //   pokemons.map(pokemon => {
  //     Pokemon.create({
  //       name: pokemon.name,
  //       hp: pokemon.hp,
  //       cp: pokemon.cp,
  //       picture: pokemon.picture,
  //       types: pokemon.types
  //     }).then(pokemon => console.log(pokemon.toJSON()))
  //   })

  //   bcrypt.hash('pikachu', 10)
  //   .then(hash => {
  //     return User.create({
  //       username: 'pikachu',
  //       password: hash
  //     });
  //   })
  //   .then(user => console.log(user.toJSON()));

    console.log('La base de donnée a bien été initialisée !')
  // })
}

module.exports = {
  initDb, Pokemon, User
}