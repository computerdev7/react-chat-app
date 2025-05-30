import { useState } from "react"
import useStore from "../store.jsx";
import {useNavigate} from "react-router-dom"


export default function Entry(){

    let navigate = useNavigate()

    let [username,setUsername] = useState('');
    let [confirmusername,setConfirmUsername] = useState('');
    let [loginUser,setLoginUser] = useState('');

    let {signIn,logIn} = useStore();
    
    
    return (
        <>
        <form>
        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/> <br></br>
        <input type="text" value={confirmusername} onChange={(e)=> setConfirmUsername(e.target.value)}/> <br></br>
        <button onClick={(e)=> {
            signIn(username,confirmusername);
        }}>Signup</button>
        <h1>OR</h1>
        <input type="text" value={loginUser} onChange={(e)=> setLoginUser(e.target.value)} /> <br></br>
        <button onClick={(e)=> {
            e.preventDefault();
            logIn(loginUser)
            .then(res => {
                if(res.statusText === "OK"){
                    sessionStorage.setItem('username',loginUser)
                    navigate('/home')
                } else {
                    undefined
                }
            })
        }}>Login</button>
        </form>
        </>
    )
}