const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, maxLength: 20 },
    condition: { type: String, required: true, maxLength: 20 },
    listed: { type: Boolean, required: true },
    boughtPrice: {type: Number, required: true },
    sellPrice: { type: Number, required: true },
    seller: { type: String, required: true },
    buyer: { type: String },
});


module.exports = Item = mongoose.model("item", itemSchema);