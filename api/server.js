const express = require("express")

const carRouter = require('./cars/cars-router')

const server = express()
server.use('/api/cars', carRouter)



module.exports = server
