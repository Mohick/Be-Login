






const ContainerRegex = {
    username: (strUsername) => {
        // Min length is 6, max length is 30
        const regex = /^[a-zA-Z0-9._]{6,30}$/;
        return regex.test(strUsername.trim());
    },
    password: (strPassword) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
        // Min length is 8, max length is 50, at least one uppercase letter, one lowercase letter, one digit, and one special character
        return regex.test(strPassword.trim());
    },
    email: (strEmail) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Validates email format
        return regex.test(strEmail.trim());
    }
};


module.exports = ContainerRegex
