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
        <div className="h-screen flex justify-center items-center sm:items-start pt-10 bg-red-400">
        <div className=" max-[400px]:h-4/6 sm:h-5/6 max-[400px]:w-5/6  max-[645px]:w-4/6 sm:w-2/4 lg:w-2/5 xl:w-1/3 text-center flex flex-col gap-5 sm:gap-7 bg-orange-100 
         sm:p-5">
        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold mt-5 sm:mt-0"
        >Just-Chat</h1>
        <form className="flex flex-col items-center">
        <h1 className="mb-3 text-xl sm:text-2xl xl:text-3xl">SIGNUP</h1>   
        <h5 className="text-left font-light inline">username</h5> 
        <input className="border-2 rounded-md p-1 w-5/6 mb-2" 
        type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/> 
        <h5 className="text-left font-light inline">confirm-username</h5> 
        <input className='border-2 rounded-md p-1 w-5/6 mb-4' 
        type="text" value={confirmusername}  onChange={(e)=> setConfirmUsername(e.target.value)}/> 
        <button 
        className="border-2 w-1/2 sm:w-1/3 h-[40px] rounded-md bg-slate-400"
        onClick={(e)=> {
            signIn(username,confirmusername);
        }}>Signup</button>
        <h1 className="mt-5 mb-5 font-bold text-xl">OR</h1>
        <h1 className="mb-3 text-xl sm:text-2xl xl:text-3xl" inline>LOGIN</h1>   
        <h5 className="text-left font-light inline">username</h5>  
        <input className='border-2 rounded-md p-1 w-5/6 mb-4'
        type="text" value={loginUser} onChange={(e)=> setLoginUser(e.target.value)} /> 
        <button className="border-2 w-1/2 sm:w-1/3 h-[40px] rounded-md bg-slate-400"
        onClick={(e)=> {
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
        </div>
        </div>
        </>
    )
}