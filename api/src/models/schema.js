const mongoose = require('../db');
const loginSchema = mongoose.Schema({
    name: String,
    password: String
})
// const Models = {
//     Login: mongoose.model('users', loginSchema)
// }
module.exports = mongoose.model('users', loginSchema);