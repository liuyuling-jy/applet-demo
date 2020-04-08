const mongoose = require('../db');
const collectSchema = mongoose.Schema({
    itemId:String,
    title: String,
    anonymity: String,
    desc: String,
    classify: String,
    author: String,
    openId: String,
    collectOpenId:String
})
const Models = {
    collect: mongoose.model('collect', collectSchema)
}
module.exports = Models;