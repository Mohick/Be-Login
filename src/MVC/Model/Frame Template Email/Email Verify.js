



const temPlateVerifyEmail = (username, email, verificationCode) => {
    const templateParams = {
        from_name: process.env.EXPRESS__NAME__EMAIL__KEY__EMAIL,
        to: email,
        to_name: username,
        message: verificationCode,
        reply_to: process.env.EXPRESS__REPLAY__EMAIL__KEY__EMAIL
    };
    return templateParams;
}

module.exports = temPlateVerifyEmail;