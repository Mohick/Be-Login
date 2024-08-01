const SendEmail = require("../../../Config/Email/Config Email");
const ModelAccountSchema = require("../../../Schema/Create Account/Create Account");
const temPlateVerifyEmail = require("../Frame Template Email/Email Verify");
const randomVerify = require("../Random Verify/Random Verify");
const randomPassword = require("./random password");




class ForgotPassword {

    async forgotPassword(req, res, next) {
        const { email } = req.body;
        if (!email) {
            return res.json({
                valid: false,
                message: "Please provide an email address."
            });
        } else {
            // Check if user exists in the database
            const account = await ModelAccountSchema.findOne({ email });
            if (!account) {
                return res.json({
                    valid: false,
                    message: "Email address not found."
                });
            } else {
                const randomVerifys = randomVerify()
                const tempalteEmail = temPlateVerifyEmail(
                    account.username,
                    randomVerifys,
                )
                await SendEmail(tempalteEmail)
                account /// xử lý account
            }
        }
    }
}


module.exports = new ForgotPassword