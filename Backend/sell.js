var mdb = require("mongoose")
const sellScheme = mdb.Schema({
    user:{type:String},
    category:{type:String},
    type:{type:String},
    name:{type:String},
    describe:{type:String},
    age:{type:String},
    quantity:{type:String},
    image:{type:String},
    price:{type:String},
    location:{type:String},
    offer:{type:String}
})


const sell_scheme = mdb.model("sell"/*this is the collections name*/,sellScheme)
module.exports = sell_scheme;