const bcrypt = require('bcrypt');
const ModelAccountSchema = require('../../../Schema/Create Account/Create Account');
const checkFormInputFromUser = require('../Check Form Input Create Account/Check Form Input');

class LoginAccount {
    async login(req, res) {
        const { email, password } = req.query;

        // Validation checks
        const checked = {
            email: checkFormInputFromUser.email(email),
            password: checkFormInputFromUser.password(password)
        };

        if (checked.email.valid && checked.password.valid) {
            try {
                const account = await ModelAccountSchema.findOne({ email });

                switch (true) {
                    case !account:
                    case !(await bcrypt.compare(password, account.password)):
                        // Nếu mật khẩu không khớp
                        return res.status(401).json({ valid: false, message: "Invalid password" });

                    case !account.verified:
                        // Nếu tài khoản chưa được xác minh
                        req.session.account = {
                            email: account.email
                        };
                        return res.status(403).json({ valid: false, message: "Account is not verified" });

                    default:
                        // Nếu mọi thứ đều đúng
                        req.session.account = {
                            _id: account._id,
                            email: account.email
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
        try {
            const { email, _id } = req.session.account;
            switch (true) {
                case !email || !_id:
                    // Case where email or ID is missing
                    return res.json({
                        valid: false,
                        message: "Missing email or ID"
                    });

                default:
                    // Find account by email and ID
                    const account = await ModelAccountSchema.findById({ email, _id });

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
                            return res.json({
                                valid: true,
                                message: "Auto login successful"
                            });
                    }
            }
        } catch (error) {

        }
    }
}

module.exports = new LoginAccount();
