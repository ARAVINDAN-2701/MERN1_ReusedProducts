var mdb = require("mongoose")

const loginScheme = new mdb.Schema({
    name : {type:String},
    email : {type:String,unique:true},
    password:{type:String},
    number:{type:String},
})
const login_module = mdb.model('login',loginScheme)
module.exports = login_module