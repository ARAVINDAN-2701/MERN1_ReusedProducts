var mdb = require("mongoose")
const ViewInterest = mdb.Schema({
    owner:{type:String},
    viewer:{type:String},
    p_name:{type:String},
    describe:{type:String},
})

const view_scheme = mdb.model("viewInterest"/*this is the collections name*/,ViewInterest);
module.exports = view_scheme;