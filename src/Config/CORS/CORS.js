const cors = require('cors');

const configCORS = (app) => {
    const corsOptions = {
        origin: "https://projectlogin1.netlify.app/", // Replace with your allowed origin
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Methods you want to allow
        allowedHeaders: ['Content-Type', 'Authorization'], // Headers you want to allow
        credentials: true // Allow cookies to be sent
    };

    // Use the CORS middleware with the defined options
    app.use(cors(corsOptions));
}

module.exports = configCORS