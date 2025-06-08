import { strict } from "assert";
import mongoose from "mongoose";

let Schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
},{strict : false,timestamps: true})

let user = mongoose.model('user',Schema)

export default user