
// configuration
require('dotenv').config()
const express = require('express')
const app = express()
// config cors middleware
const configCORS = require('./src/Config/CORS/CORS')
configCORS(app)
const mainController = require("./src/MVC/Controller/Main Controll")
const runReadJson = require('./src/Config/JSON/Json.js')
const configMorgan = require('./src/Config/Morgan/Morgan')
const connectMongoDB = require('./src/Config/Connect  MongoDB/Connect Mongoose')
const configSessionCookies = require('./src/Config/Session Cookes/Session Cookes')
const configHandleBars = require('./src/Config/Handle Bar Expess/Handle Bar Expess.js')
const port = process.env.EXPRESS__PORT || 3000

// config session-cookies middle
configSessionCookies(app)
//config morgan 
configMorgan(app)
// config views s
configHandleBars(app)
// config watch types files json 
runReadJson(app, express)
// connect mongoDB
connectMongoDB()


//controll routes 

mainController(app)

// port of express
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})