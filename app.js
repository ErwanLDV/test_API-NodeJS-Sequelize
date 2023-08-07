const express = require('express');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')


const app = express();
const port = process.env.PORT || 3000;


app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json()) // ou .use(express.json())
.use(cors()) // possibilité de rajouter des options. Pour le moment valeur par default === *

sequelize.initDb()

app.get('/', (req, res) => {
  res.json('Hello Heroku !')
})

// Points de terminaison
require('./src/routes/findAllPokemons')(app) // === const findAllPokemons = require('./src/routes/findAllPokemons') puis => findAllPokemons(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)
require('./src/routes/signUp')(app)

//ajout erreur 404
app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL'
  res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application est demarrée sur : http://localhost:${port}`));