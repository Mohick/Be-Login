

class LogoutAccount {
    async logout(req, res) {

        // Clear the session and cookies
        req.session.destroy();
        res.clearCookie('connect.sid');
    }
}

module.exports = new LogoutAccount();
