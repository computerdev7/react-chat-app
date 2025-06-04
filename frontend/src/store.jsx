import {create} from "zustand"
import axios from "axios"
import Alert from "./component/alert.jsx"

const useStore = create((set,get)=> ({
    signIn : async(password,confirmPassword)=> {

        try {  
            if(password === confirmPassword){
                let data = await axios.post("http://localhost:3000/user/signin",{username : password})
                return data
            } else {
                console.log('not matched users')
            }

        }catch(err){
            console.log(err.message,'error while singing up')
        }
    },
    logIn : async(password)=> {
        try {
                let data = await axios.post("http://localhost:3000/user/login",{username : password})
                
                return data
            
        }catch(err){
            console.log(err.message,'error while login ')
        }
    },
    getUser : async()=> {
        try {
           let data = await axios.get('http://localhost:3000/user/getUsers')
           return data
        }catch(err){
            console.log(err.message,'error while fetching the users list')
        }
    },
    userName : '',
    getChat : async(to,from)=> {
        try {
           let data = await axios.get(`http://localhost:3000/chat/getChat?to=${to}&from=${from}`)
            return data
        } catch(err){
            console.log(err.message)
        }
    },
    deleteChat : async(id)=> {
        
        try{
            let data = await axios.delete('http://localhost:3000/chat/deleteChat',{data: {id : id}})
            return data
        }catch(err){
            console.log(err.message)
        }
    },
    updateChat : async(id,data)=> {
        try{
            let updateChat = await axios.put('http://localhost:3000/chat/updateChat',{id,data})
            return updateChat
        }catch(err){
            console.log(err.message)
        }
    }
}))

export default useStore;