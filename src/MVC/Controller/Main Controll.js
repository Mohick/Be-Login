const CreateAccount = require('../Model/CURL/Create')


const mainController = (app) => {

    app.post('/createUser', CreateAccount.CreateAccount)

    app.get("/", (req, res) => {
        res.render("home");
    })
}




module.exports =  mainController;