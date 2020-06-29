const mongoose = require("mongoose");
const { Number } = require("mongoose");

const skillSchema = mongoose.Schema({
    language: {type: String, required: true},
    knowledgeLevel: {type: Number, required: true}
});

module.exports = mongoose.model("Skills", skillSchema);