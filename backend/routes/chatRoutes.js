import express from "express"
import chat from "../model/chatModel.js"

let route = express.Router()

route.get('/getChat',async(req,res)=> {

    let {to,from} = req.query

    try{
        let data = await chat.find({to : to,from : from}).sort({createdAt : 1})
        let data1 = await chat.find({to : from,from : to}).sort({createdAt : 1})

        let newArr = [...data,...data1]

        let newestArr = newArr.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))

        res.status(200).json({message : newestArr})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

route.delete('/deleteChat',async(req,res)=> {

    let id = req.body.id

    try{
        let data = await chat.findByIdAndDelete({_id : id})
        res.status(200).json({message : 'data'})
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})

route.put('/updateChat',async(req,res)=> {
    let {id,data} = req.body

    try{

        let chatData = await chat.findByIdAndUpdate({_id:id},{chat : data},{new : true})

        res.status(201).json({message : chatData})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})
export default route
