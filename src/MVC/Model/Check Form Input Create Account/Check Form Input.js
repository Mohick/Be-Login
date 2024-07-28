const ContainerRegex = require("../../../Regex/Manager Regex");


const checkFormInputFromUser = {
    username: (username) => {
        return ContainerRegex.username(username) ?
            { valid: true, message: "" } :
            { valid: false, message: "Username must be at least 6 characters and no more than 30 characters long." };
    },
    password: (password) => {
        return ContainerRegex.password(password) ?
            {
                valid: true,
                message: {
                    length: true,
                    lowercase: true,
                    uppercase: true,
                    number: true,
                    specialCharacter: true
                }
            } :
            {
                valid: false,
                message: {
                    length: "Password must be between 8 and 50 characters long.",
                    lowercase: "Password must include at least one lowercase letter.",
                    uppercase: "Password must include at least one uppercase letter.",
                    number: "Password must include at least one number.",
                    specialCharacter: "Password must include at least one special character (@$!%*?&)."
                }
            };
    },
    email: (email) => {
        return ContainerRegex.email(email) ?
            { valid: true, message: "" } :
            { valid: false, message: "Invalid email address. Please enter a valid email." };
    }
};


module.exports = checkFormInputFromUser;