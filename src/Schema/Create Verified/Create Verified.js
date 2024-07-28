const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define the schema for the verified account
const CreateVerifiedAccountSchema = new Schema({
    id: ObjectId,
    email: { type: String, required: true },
    verificationCode: String,
    createdAt: { type: Date, default: Date.now, index: { expires: '2m' } } // TTL index
});

// Create a model using the schema
const ModelVerifiedAccountSchema = mongoose.model("VerifiedAccount", CreateVerifiedAccountSchema);

// Export the model
module.exports = ModelVerifiedAccountSchema;
