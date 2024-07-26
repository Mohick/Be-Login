const { engine } = require("express-handlebars");
const path = require("path");
const configHandleBars = (app) => {
    app.engine('.hbs', engine({
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, '../../MVC/views'));
}


module.exports = configHandleBars;