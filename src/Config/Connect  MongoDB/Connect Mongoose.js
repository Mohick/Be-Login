const mongoose = require('mongoose');



const connectMongoDB = async () => {


    try {
        await mongoose.connect(process.env.EXPRESS__URL__MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectMongoDB;