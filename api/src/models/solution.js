const mongoose = require('../db');
const solutionSchema = mongoose.Schema({
    title: String,
    anonymity: String,
    desc: String,
    classify: String,
    author: String,
    openId: String,
})
const Models = {
    solution: mongoose.model('solution', solutionSchema)
}
module.exports = Models;