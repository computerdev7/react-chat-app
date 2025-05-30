import mongoose from "mongoose";

let Schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
})

let user = mongoose.model('user',Schema)

export default user