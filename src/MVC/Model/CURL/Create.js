const CreateAccountSchema = require('../../../Schema/Create Account/Create Account');
const CreateVerifiedSchema = require('../../../Schema/Create Verified/Create Verified');

const ContainerRegex = require("../../../Regex/Manager Regex");
const bcrypt = require('bcrypt');
const emailjs = require("@emailjs/nodejs")
class CreateAccount {
    async CreateAccount(req, res) {

        const { username, password, email } = req.query

        const checked = {
            username: ContainerRegex.username(username) ? {
                valid: true,
                message: ""
            } : {
                valid: false,
                message: "Username must be at least 6 characters and no more than 30 characters long."
            },
            password: ContainerRegex.password(password) ? {
                valid: true,
                message: {
                    length: true,
                    lowercase: true,
                    uppercase: true,
                    number: true,
                    specialCharacter: true
                }
            } : {
                valid: false,
                message: {
                    length: "Password must be between 8 and 50 characters long.",
                    lowercase: "Password must include at least one lowercase letter.",
                    uppercase: "Password must include at least one uppercase letter.",
                    number: "Password must include at least one number.",
                    specialCharacter: "Password must include at least one special character (@$!%*?&)."
                }
            },
            email: ContainerRegex.email(email) ? {
                valid: true,
                message: ""
            } : {
                valid: false,
                message: "Invalid email address. Please enter a valid email"
            }

        }
        if (checked.username.valid && checked.password.valid && checked.email.valid) {
            try {
                await CreateAccountSchema.find({ email: email }).then((account) => {
                    if (account.length > 0) {
                        return {
                            valid: false,
                            message: "Email already exists."
                        };
                    } else {
                        // Hash the password using bcrypt
                        bcrypt.genSalt(Number(process.env.EXPRESS__ROUNDS__HASH), function (err, salt) {
                            bcrypt.hash(password, salt, function (err, hash) {
                                const newAccount = new CreateAccountSchema({
                                    username: username,
                                    password: hash,
                                    email: email
                                })
                                newAccount.save()
                            });
                        });
                        // Send email verification
                        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                        const random1 = Math.floor(Math.random() * array.length)
                        const random2 = Math.floor(Math.random() * array.length)
                        const random3 = Math.floor(Math.random() * array.length)
                        const random4 = Math.floor(Math.random() * array.length)
                        const random5 = Math.floor(Math.random() * array.length)
                        const random6 = Math.floor(Math.random() * array.length)
                        const verificationCode = array[random1] + "" + array[random2] + "" + array[random3] + "" + array[random4] + "" + array[random5] + "" + array[random6]
                        const templateParams = {
                            from_name: process.env.EXPRESS__NAME__EMAIL__KEY__EMAIL,
                            to: email,
                            to_name: username,
                            message: verificationCode,
                            reply_to: process.env.EXPRESS__REPLAY__EMAIL__KEY__EMAIL
                        };

                        emailjs
                            .send(process.env.EXPRESS__SERVICE__EMAIL, process.env.EXPRESS__TEMPLATE__EMAIL, templateParams, {
                                publicKey: process.env.EXPRESS__PUBLIC__KEY__EMAIL,
                                privateKey: process.env.EXPRESS__PRAVATE__KEY__EMAIL,
                            })
                            .then(
                                (response) => {
                                    console.log('SUCCESS!', response.status, response.text);
                                },
                                (err) => {
                                    console.log('FAILED...', err);
                                },
                            );
                        const newVerificationCode = new CreateVerifiedSchema({
                            verificationCode: templateParams.message,
                            email: email
                        })
                        newVerificationCode.save()
                        return res.json({
                            username: username,
                            password: password,
                            email: email
                        })

                    }
                })
            } catch (error) {
                // Xử lý lỗi
                console.error("Error finding user:", error);
                return { valid: false, message: "An error occurred while searching for the user." };
            }

        } else {
            return res.json(checked)
        }
    }
}



module.exports = new CreateAccount;