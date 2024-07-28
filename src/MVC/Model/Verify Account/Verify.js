const ModelVerifiedSchema = require('../../../Schema/Create Verified/Create Verified');
const ModelAccountschema = require('../../../Schema/Create Account/Create Account');
const randomVerify = require('../Random Verify/Random Verify');
const temPlateVerifyEmail = require('../Frame Template Email/Email Verify');
const SendEmail = require('../../../Config/Email/Config Email');


class VerifiedAccount {

    async createVerifyAccount(username, email) {
        try {
            // Check if a verification record exists for the given email
            const randomVerificationCode = randomVerify();
            // Send email verification
            const templateParams = temPlateVerifyEmail(username, email, randomVerificationCode);
            await SendEmail(templateParams);
            // Create a new verification record
            const newVerificationCode = new ModelVerifiedSchema({
                verificationCode: randomVerificationCode,
                email
            });
            // Save the new verification record
            await newVerificationCode.save();
            return;

        } catch (error) {
            console.error("Error in verification process:", error);
            throw error; // Handle or propagate the error as needed
        }
    }
    async verifiedAccount(req, res) {
        try {
            const { verificationCode } = req.body;
            const { email } = req.session.account;
            console.log(req.session.account);
            if (email && verificationCode) {
                // Find the verified account using the provided email
                const verifiedAccount = await ModelVerifiedSchema.findOne({ email });

                if (verifiedAccount.email) {
                    // Check if the provided verification code matches the one in the database
                    if (Number(verifiedAccount.verificationCode) === Number(verificationCode)) {
                        // Update the account as verified
                        const account = await ModelAccountschema.updateOne({ email }, { verified: true });
                        await ModelVerifiedSchema.findOneAndDelete({ email }); // Delete the verified record after successful verification
                        delete req.session.account;
                        req.session.account = {
                            id: account._id,
                            email: account.email
                        }
                        return res.json({
                            valid: true,
                            message: "Account verified successfully"
                        });
                    } else {
                        return res.json({
                            valid: false,
                            message: "Invalid verification code"
                        });
                    }
                } else {
                    return res.json({
                        valid: false,
                        message: "No account found with the provided email"
                    });
                }
            } else {
                return res.json({
                    valid: false,
                    message: "Email and verification code are required"
                });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                valid: false,
                message: "An error occurred during verification"
            });
        }

    }
    async reNewVerify(req, res) {
        try {
            const { email } = req.session.account;
            if (email) {
                // Find the verified account using the provided email
                const [account, verification] = await Promise.all([
                    ModelAccountschema.findOne({ email }),  // Corrected with query object
                    ModelVerifiedSchema.find({ email })     // Corrected with query object
                ])
                if (account && account.email) {

                    if (verification.length > 0) {
                        res.json({
                            valid: false,
                            message: "Please wait approximately 2 minutes for the next verification code."
                        });
                    } else {
                        callCreateVerifyAccount(account.username, account.email); // Assuming createVerifyAccount is a method in the same context
                        res.json({
                            valid: true,
                            message: "Verification code has been sent again."
                        });
                    }

                } else {
                    // Handle the case where the account is not found
                    res.json({
                        valid: false,
                        message: "Account not found."
                    });
                }
                // })
            } else {
                return res.json({
                    valid: false,
                    message: "Email is required"
                });
            }

        } catch (error) {
            console.error("Error in verification process:", error);
            throw error; // Handle or propagate the error as needed
        }
    }
}


const callCreateVerifyAccount = (username, email) => {
    new VerifiedAccount().createVerifyAccount(username, email); return
}


module.exports = new VerifiedAccount()