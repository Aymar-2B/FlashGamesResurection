const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    title: String,
    summary: String,
    mark: Number,
    image: String
});

module.exports = mongoose.model("Game", GameSchema);
