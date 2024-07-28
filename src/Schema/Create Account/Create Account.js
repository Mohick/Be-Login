const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CreateAccountSchema = new Schema({
    id: ObjectId,
    username: String,  // Corrected typo here
    password: String,
    email: String,
    verified: { type: Boolean, default: false }
}, {
    timestamps: true  // This adds createdAt and updatedAt fields
});

const ModelAccountSchema = mongoose.model("Account", CreateAccountSchema);

module.exports = ModelAccountSchema;  // Removed parentheses to export the model
