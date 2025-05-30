import {create} from "zustand"
import axios from "axios"


const useStore = create((set)=> ({
    signIn : async(password,confirmPassword)=> {
        try {
                        
            if(password === confirmPassword){
                let data = await axios.post("http://localhost:3000/user/signin",{username : password})
                console.log(data)
            } else {
                alert('usernames do not match with the confirm_username')
            }

        }catch(err){
            console.log(err,'error while signup ')
        }
    },
    logIn : async(password)=> {
        try {
                let data = await axios.post("http://localhost:3000/user/login",{username : password})
                
                return data
            
        }catch(err){
            console.log(err,'error while login ')
        }
    },
    getUser : async()=> {
        try {
           let data = await axios.get('http://localhost:3000/user/getUsers')
           return data
        }catch(err){
            console.log('error while fetching the users list')
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
    }
}))

export default useStore;