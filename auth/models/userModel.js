const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    displayName: { type: String },
    amountBought: {type: Number, required: true},
    amountSold: {type: Number, required: true}

});


module.exports = User = mongoose.model("user", userSchema);