import mongoose from "mongoose";

export let connectToDb = ()=> {
    mongoose.connect(process.env.MONGODB_URI)
    .then(res=> console.log('database connected'))
    .catch(err=> console.log(err))
}
