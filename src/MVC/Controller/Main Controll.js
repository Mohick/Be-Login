


const mainController = (app) => {

    app.get('/login', (req, res) => {
        res.render('home');
    })
}




module.exports = mainController;