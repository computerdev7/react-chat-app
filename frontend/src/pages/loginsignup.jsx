import { useState } from "react"
import useStore from "../store.jsx";
import { useNavigate } from "react-router-dom"
import ToolTip from "../component/tooltip.jsx";
import Alert from "../component/alert.jsx";

export default function Entry() {

    let navigate = useNavigate()
    let [username, setUsername] = useState('');
    let [confirmusername, setConfirmUsername] = useState('');
    let [loginUser, setLoginUser] = useState('');
    let { signIn, logIn } = useStore();
    let [showAlertSign, setShowAlertSign] = useState(false);
    let [showSignIn, setShowSignIn] = useState(false);

    return (
        <>
            <div className="text-white h-screen flex justify-center items-center pt-10 bg-red-500">
                <div className=" h-[550px] sm:h-5/6 md:h-[550px] xl:h-[600px] w-[280px] sm:w-2/4 lg:w-2/5 xl:w-1/3 text-center flex flex-col gap-5 sm:gap-7 p-2 sm:p-5 shadow-box-inner-shadow bg-neutral-900 rounded-3xl ); ">
                    <h1 className=" text-2xl sm:text-3xl xl:text-4xl font-bold mt-5 sm:mt-0"
                    >Just-Chat</h1>
                    <form className="flex flex-col items-center">
                        <h1 className="mb-3 text-xl sm:text-2xl xl:text-3xl">SIGNUP</h1>
                        <span className="inline-block group">
                            <h5 className="text-left font-light text-red-400 hover:text-gray-400  group inline-block">username
                            </h5>
                            <ToolTip data={'username can have atleast "6 CHAR" with "1 SPECIAL CHAR" and "1 NUMBER'} />
                        </span>
                        <input className="text-black border-2 rounded-md p-1 w-5/6 mb-2 focus:outline-red-500 "
                            type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="akash@1" />
                        <h5 className="text-left font-light inline text-gray-400">confirm-username</h5>
                        <input className='text-black border-2 rounded-md p-1 w-5/6 mb-4 focus:outline-red-500'
                            type="text" value={confirmusername} onChange={(e) => setConfirmUsername(e.target.value)} placeholder="akash@1" />
                        <button className="border-2 w-1/2 sm:w-1/3 h-[40px] rounded-md hover:bg-red-500 hover:text-black active:bg-neutral-600 active:text-gray-400 active:border-0 "
                            onClick={(e) => {
                                e.preventDefault();
                                signIn(username, confirmusername)
                                    .then(res => {
                                        setUsername('');
                                        setConfirmUsername('')
                                        if (res == undefined) {
                                            setShowAlertSign(true)
                                            setTimeout(() => {
                                                setShowAlertSign(false)
                                            }, 5000)
                                        } else if (res.statusText == 'OK') {
                                            setShowSignIn(true)
                                            setTimeout(() => {
                                                setShowSignIn(false)
                                            }, 5000)
                                        } else {
                                            alert('something unexpected occur please try again with valid detail')
                                        }
                                    })
                            }}>Signup</button>
                        {showAlertSign && <Alert data={'invlaid details'} color={' bg-red-500'} />}
                        {showSignIn && <Alert data={'successfully signin'} color={' bg-green-500'} />}
                        <h1 className="text-red-500 mt-5 mb-5 font-bold text-xl">OR</h1>
                        <h1 className="mb-3 text-xl sm:text-2xl xl:text-3xl" inline>LOGIN</h1>
                        <h5 className="text-left font-light inline text-gray-400">username</h5>
                        <input className='text-black border-2 rounded-md p-1 w-5/6 mb-4 focus:outline-red-500'
                            type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} placeholder="akash@1" />
                        <span className="inline-block group w-1/2">
                            <button className="border-2 w-full sm:w-2/3 h-[40px] rounded-md hover:bg-red-500 hover:text-black active:bg-neutral-600 active:text-gray-400 active:border-0"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logIn(loginUser)
                                        .then(res => {
                                            setLoginUser('')
                                            if (res == undefined) {
                                                setShowAlertSign(true)
                                                setTimeout(() => {
                                                    setShowAlertSign(false)
                                                }, 5000)
                                            }
                                            else if (res.statusText === "OK") {
                                                sessionStorage.setItem('username', loginUser)
                                                navigate('/home')
                                            } else {
                                                alert('something unexpected occurr and please put valid detail')
                                            }
                                        })
                                }}>Login</button>
                            <ToolTip data={'Go to the Home page'} />
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}