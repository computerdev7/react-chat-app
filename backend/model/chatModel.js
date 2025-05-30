import mongoose from "mongoose"

let chatSchema = new mongoose.Schema({
    chat : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    from : {
        type : String,
        required : true
    }
}, {timestamps : true});

let chat = new mongoose.model('chat',chatSchema)

export default chat