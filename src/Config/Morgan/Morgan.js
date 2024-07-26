
var morgan = require('morgan')
const configMorgan = (app) => {
    app.use(morgan('combined'))
}



module.exports = configMorgan;