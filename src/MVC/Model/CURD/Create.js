const ModelAccountSchema = require('../../../Schema/Create Account/Create Account');

const bcrypt = require('bcrypt');
const VerifiedAccount = require('../Verify Account/Verify');
const checkFormInputFromUser = require('../Check Form Input Create Account/Check Form Input');

class CreateAccount {
    async CreateAccount(req, res) {
        const { username, password, email } = req.body;
        // Validation checks
        const checked = {
            username: checkFormInputFromUser.username(username),
            password: checkFormInputFromUser.password(password),
            email: checkFormInputFromUser.email(email)
        };
        if (checked.username.valid && checked.password.valid && checked.email.valid) {
            try {
                const account = await ModelAccountSchema.find({ email });
                if (account.length > 0) {
                    return res.json({ valid: false, message: "Email already exists." });
                } else {
                    // Hash the password using bcrypt
                    const salt = await bcrypt.genSalt(Number(process.env.EXPRESS__ROUNDS__HASH));
                    const hash = await bcrypt.hash(password, salt);
                    // Create new account
                    const newAccount = new ModelAccountSchema({
                        username: username,
                        password: hash,
                        email: email
                    });
                    await newAccount.save();

                    // Send email verification
                    req.session.account = {
                        email: email
                    }
                    await VerifiedAccount.createVerifyAccount(username, email);
                    return res.json({ email });
                }
            } catch (error) {
                console.error("Error finding user:", error);
                return res.json({ valid: false, message: "An error occurred while processing your request." });
            }
        } else {
            return res.json(checked);
        }
    }
}

module.exports = new CreateAccount();
