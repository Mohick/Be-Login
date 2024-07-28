
const emailjs = require("@emailjs/nodejs");


const SendEmail = (templateParams) => {
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
}

module.exports = SendEmail;