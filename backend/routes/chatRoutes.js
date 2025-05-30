import express from "express"
import chat from "../model/chatModel.js"

let route = express.Router()

route.get('/getChat',async(req,res)=> {

    let {to,from} = req.query

    console.log(to,from)

    try{
        let data = await chat.find({to : to,from : from})
        let data1 = await chat.find({to : from,from : to})
        res.status(200).json({message : data,data1})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

export default route
