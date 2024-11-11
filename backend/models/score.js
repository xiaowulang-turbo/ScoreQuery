const mongoose = require("mongoose")

const scoreSchema = new mongoose.Schema({
    exam_id: String,
    name: String,
    score: Number,
    level: String,
})

module.exports = mongoose.model("Score", scoreSchema)
