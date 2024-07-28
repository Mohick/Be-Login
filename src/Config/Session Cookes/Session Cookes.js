
const cookieSession = require('cookie-session')


const configSessionCookies = (app) => {
    app.use(cookieSession({
        name: 'session',
        secret: process.env.EXPRESS__SECRET__KEY,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 ngày
        secure: false, // Chỉ gửi cookie qua HTTPS trong môi trường sản xuất
        httpOnly: false,
        sameSite: 'Strict' // Hoặc 'Strict' tùy thuộc vào yêu cầu bảo mật của bạn
    }))
}

module.exports = configSessionCookies;