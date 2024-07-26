const path = require('path');


const runReadJson = (app,express) => {
    console.log(path.join(__dirname, '../../../public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../../../public')));
    
}


module.exports = runReadJson;
