
const ModelAccountSchema = require('../../../Schema/Create Account/Create Account');
const checkFormInputFromUser = require('../Check Form Input Create Account/Check Form Input');
const VerifiedAccounts = require('../Verify Account/Verify')
const bcrypt = require('bcrypt');
class LoginAccount {
    async login(req, res) {
        const { email, password } = req.body;

        // Validation checks
        const checked = {
            email: checkFormInputFromUser.email(email),
            password: checkFormInputFromUser.password(password)
        };

        if (checked.email.valid && checked.password.valid) {
            try {
                const account = await ModelAccountSchema.findOne({ email: email });

                switch (true) {
                    case !account:
                    case !(await bcrypt.compare(password, account.password)):
                        // Nếu mật khẩu không khớp
                        return res.status(200).json({ valid: false, message: "Invalid password" });
                    default:
                        // Nếu mọi thứ đều đúng
                        req.session.account = {
                            email: account.email,
                            _id: account._id.toString()
                        };
                        return res.json({ valid: true, message: "Login successful" });
                }
            } catch (error) {
                console.error("Error finding user:", error);
                return res.status(500).json({ valid: false, message: "Internal server error" });
            }
        } else {
            return res.status(400).json({ valid: false, message: "Invalid email or password format" });
        }
    }
    async autoLoginEqualReadCookie(req, res) {
        if (req.session.account) {
            const { email, _id } = req.session.account;

            try {
                switch (true) {

                    case !_id || !email:
                        return res.json({
                            login: false,
                            message: "Missing email or ID"
                        });
                    default:
                        // Find account by email and ID
                        const account = await ModelAccountSchema.findOne({ email, _id });

                        switch (true) {
                            case !account:
                                // Case where account is not found
                                return res.json({
                                    valid: false,
                                    message: "Account not found"
                                });

                            case account.email !== email:
                                // Case where email does not match
                                return res.json({
                                    valid: false,
                                    message: "Email does not match"
                                });

                            default:
                                // Case where account and email are valid
                                console.log(req.cookies);
                                
                                if (account.verified) {

                                    return res.json({
                                        username: account.username,
                                        email: account.email,
                                        password: "*************",
                                        login: true,
                                        verified: account.verified,
                                        message: "Auto login successful"
                                    });
                                } else {
                                    await VerifiedAccounts.createVerifyAccount(account.username, account.email)
                                    return res.json({
                                        username: account.username,
                                        email: account.email,
                                        password: "*************",
                                        login: true,
                                        verified: account.verified,
                                        message: "Auto login successful"
                                    });
                                }
                        }
                }
            } catch (error) {
                console.error("Error finding user:", error);
                return res.status(500).json({ valid: false, message: "Internal server error" });
            }
        } else {
            return res.json({
                login: false,
                message: "No account found in session"
            });
        }
    }
}

module.exports = new LoginAccount();
