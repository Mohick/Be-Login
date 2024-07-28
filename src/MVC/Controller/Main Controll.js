const CreateAccount = require('../Model/CURD/Create');
const VerifiedAccount = require('../Model/Verify Account/Verify');
const Login = require('../Model/Login/Login');


const mainController = (app) => {

    app.post('/createUser', CreateAccount.CreateAccount)
    app.put("/verify-account", VerifiedAccount.verifiedAccount)
    app.post("/re-new-verify", VerifiedAccount.reNewVerify)
    app.post("/login", Login.login)
}




module.exports = mainController;