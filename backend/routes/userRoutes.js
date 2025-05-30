import express from "express"
import user from "../model/userModel.js"
import users from "../index.js"

let route = express.Router()
        
route.post('/signin',async(req,res)=> { 

    let {username} = req.body

    try {

        let regexSpecial = /[@#$%&]/
        let regexAlpha = /[a-zA-Z]/
        let regexNumbers = /\d/

        let checkData = await user.find({username : username})

        if(username.length > 5 && username.length < 15 && regexSpecial.test(username) && regexAlpha.test(username)&& regexNumbers.test(username) && checkData.length === 0  ){
            
            let data = new user({username : username})
            
            let showData = await data.save()

            res.status(200).json({message : showData})
        } else {
            res.status(400).json({message : username})
        }

    }catch(err){
        res.status(500).json({message : err.message})
    }
})



route.post('/login',async(req,res)=> {

    let userName = req.body.username

    try {
        let data = await user.find({username : userName})

        if(data) {
            res.status(200).json({message : data[0]._id})
        } else {
            res.status(400).json({message : "wrong username"})
        }

    }catch(err) {
        res.status(500).json({message : "error while checking login data"})
    }

})

route.get('/getUsers',async(req,res)=> {

    try {

        let data = await user.find({})

        res.status(200).json({message : data})

    }catch(err){
        res.status(500).json({message : "can't get all the users data"})
    }
})

export default route