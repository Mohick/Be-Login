
const express = require('express')
require('dotenv').config()
const app = express()
const mainController = require("./src/MVC/Controller/Main Controll")
const runReadJson = require('./src/Config/JSON/Json')
const configHandleBars = require("./src/Config/Handle Bar Expess/Handle Bar Expess")
const configMorgan = require('./src/Config/Morgan/Morgan')
const port = process.env.EXPRESS__PORT || 3000

// configuration
//config morgan 
configMorgan(app)
// config views 
configHandleBars(app)
// config watch types files json 
runReadJson(app, express)

//controll routes 
mainController(app)


// port of express
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})