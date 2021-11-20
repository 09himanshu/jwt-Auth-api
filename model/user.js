const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})


// jwt authentication
userSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({ _id: this._id}, process.env.JWTKEY, {expiresIn: "10m"});
    return token;
}

module.exports = mongoose.model("user", userSchema);