require('dotenv').config()
const express = require('express')
const server = express()
const sequelize = require('./connection/connection')
const Categorias = require('./models/categorias')
const Catalogo = require('./models/catalogo')
const Genero = require('./models/genero')
const { Op } = require('sequelize')

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '127.0.0.1'
const BASE_URL = process.env.BASE_URL
const UPLOADS = process.env.UPLOADS

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get('/', (req, res) => {
  console.log('get received...')
  res.status(200).send('OK')
})

server.get('/categorias', async (req, res) => {
  const categorias = await Categorias.findAll()
  res.status(200).send(categorias)
})

server.get('/catalogo', async (req, res) => {
  const catalogo = await Catalogo.findAll()
  catalogo.forEach(produccion =>{
    produccion.poster = BASE_URL + UPLOADS + produccion.poster
  })
  res.status(200).send(catalogo)
})

server.get('/catalogo/:id', async (req, res) => {
  const produccion = await Catalogo.findAll({where: {id: req.params.id}})
  res.status(200).send(produccion)
})

server.get('/catalogo/nombre/:nombre', async (req, res) => {
  const catalogo = await Catalogo.findAll({where: {titulo: {[Op.substring]: req.params.nombre}}})
  res.status(200).send(catalogo)
})

server.get('/catalogo/genero/:genero', async (req, res) => {
  const genero = await Catalogo.findAll({where: {generos: {[Op.substring]: req.params.genero}}})
  res.status(200).send(genero)
})

server.get('/catalogo/categoria/:categoria', async (req, res) => {
  const categoria = await Categoria.findAll({where: {categoria: {[Op.substring]: req.params.categoria}}})
  res.status(200).send(categoria)
})

sequelize.authenticate().then(()=>{
  console.log('Connection established')
  server.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`)
  })
}).catch((error) => {
  console.error(error)
});