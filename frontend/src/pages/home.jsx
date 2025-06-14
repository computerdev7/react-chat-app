import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import useStore from "../store.jsx"
import Chat from "../component/chat.jsx"
import '../Index.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import Alert from "../component/alert.jsx"
import ToolTip from "../component/tooltip.jsx"
import { FaRegUser } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import RenderUser from "../component/RenderUser.jsx"

const socket = io("http://localhost:3000")

export default function Home() {

    let { getUser } = useStore()
    let [users, setUsers] = useState([])
    let navigate = useNavigate()
    let userName = sessionStorage.getItem("username")
    let [printChat, setPrintChat] = useState([])
    let [toggle, setToggle] = useState(true)
    let [message, setMessage] = useState('')
    let [recieverUser, setRecieverUser] = useState('')
    let [showFull, setShowFull] = useState(false)
    let [showUserAlert, setShowUserAlert] = useState(false)
    let [showChatAlert, setShowChatAlert] = useState(false)
    let w = window.innerWidth;

    if (!userName) {
        navigate("/")
    }

    useEffect(() => {
        if (w > 450) {
            setShowFull(true)
        }
    }, [])

    let hasRun = useRef({})

    useEffect(() => {

        socket.emit('userjoined', userName)

        socket.on('message', ({ from, to, message, _id }) => {
            setPrintChat(prev => [...prev, { from, to, message, id : _id }])
        })

    }, [])

    useEffect(() => {
        getUser()
            .then(res => {
                if (res == undefined) {
                    setShowUserAlert(true)
                } else {
                    setUsers(res.data.message)
                }
            })
    }, [])

    let userProfile;

    try{
        if(Array.isArray(users)){
            userProfile = users?.filter(e => e.username === userName)
        }
    }catch(err){
        console.log(err.message)
    }

    return (
        <>
            {showUserAlert && <Alert data={'unfetched users'} color={'bg-orange-400'} />}
            {showChatAlert && <Alert data={'unfetched chat'} color={'bg-orange-400'} />}
            <div className="min-h-screen w- flex flex-row">
                {toggle ?
                    <>
                        <div className="max-h-screen max-[450px]:w-full min:[450px]:w-1/2 max-[638px]:w-1/2 sm:w-2/5 xl:w-1/3 bg-stone-950 overflow-y-scroll sticky top-0">
                            <div className="h-16 flex items-center justify-between p-2 bg-red-500 shadow-black drop-shadow-2xl border-b border-red-400">
                                <p className="text-[30px] font-bold text-stone-800" >Connect to </p>
                                <div className="flex justify-around flex-row w-1/4">
                                    <div className="flex group">
                                        <button className="text-xl font-bold text-stone-800 active:text-stone-500 rounded-lg flex justify-center items-center"
                                            onClick={() => {
                                                navigate('/profile', { state: { el: userProfile[0] } })
                                            }}
                                        ><FaRegUser /></button>
                                        <div className="absolute h-fit w-fit p-1 group-hover:opacity-50 opacity-0 bg-black text-white top-10 pointer-events-none rounded-md">profile</div>
                                    </div>
                                    <div className="flex group">
                                        <button onClick={() => {
                                            sessionStorage.removeItem("username")
                                            navigate('/')
                                        }}
                                            className="text-xl font-bold text-stone-800 active:text-stone-500"><RiLoginBoxLine /></button>
                                        <div className="absolute h-fit w-fit p-1 group-hover:opacity-50 opacity-0 bg-black text-white right-3 top-10 pointer-events-none rounded-md">login page</div>
                                    </div>
                                </div>
                            </div>
                            <RenderUser users={users} userName={userName} showFull={showFull} setRecieverUser={setRecieverUser} setToggle={setToggle}
                                hasRun={hasRun} setShowChatAlert={setShowChatAlert} setPrintChat={setPrintChat} />
                        </div>
                        {showFull &&
                            <div className="bg-stone-500 min-h-screen min:[450px]:w-1/2 max-[638px]:w-1/2 sm:w-3/5 xl:w-2/3">
                                <div className="w-full h-[7vh] bg-red-500 flex sticky top-0 border-b border-red-400 shadow-2xl">
                                    {!toggle &&
                                        <div className=" flex-[0.2] flex items-center justify-center">
                                            <button className="h-2/3 w-2/3 flex items-center justify-center text-2xl hover:bg-red-300 rounded-full active:bg-stone-900 active:text-white"
                                                onClick={() => setToggle(true)}><IoMdArrowRoundBack /></button>
                                        </div>
                                    }
                                    <div className="flex-[0.9] flex items-center justify-center ">
                                        <h1 className="text-2xl md:text-3xl" >{recieverUser}</h1>
                                    </div>
                                </div>
                                {recieverUser.length != 0 ?
                                    <div className="flex flex-col-reverse min-h-[87vh] overflow-y-scroll w-full">
                                        <Chat printChat={printChat} recieverUser={recieverUser} userName={userName} setPrintChat={setPrintChat} />
                                    </div>
                                    :
                                    <div className="flex items-center justify-center w-full min-h-[87vh]">
                                        <p className=" relative text-2xl font-semibold text-red-700">
                                            CONNECT
                                        </p>
                                    </div>
                                }
                                <div className={`w-full h-[6vh] flex justify-around bg-red-500 sticky bottom-0 p-1 `}>
                                    {recieverUser.length > 0 &&
                                        <>
                                            <input className="border items-center justify-center flex-[0.7] p-2 rounded-xl"
                                                type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                                            <button className="border flex-[0.2] text-sm p-1 sm:text-lg rounded-full hover:bg-red-300 active:bg-stone-900 active:text-white"
                                                onClick={() => {
                                                    socket.emit('message', { to: recieverUser, message })
                                                    setMessage('')
                                                }}>send</button>
                                        </>}
                                </div>
                            </div>}
                    </>
                    :
                    <div className="bg-stone-500 min-h-screen w-full">
                        <div className="w-full h-[7vh]  bg-red-500 flex sticky top-0 border-b border-red-400 shadow-2xl">
                            <div className=" flex-[0.2] flex items-center justify-center">
                                <button className="h-2/3 w-2/3 flex items-center justify-center text-2xl hover:bg-red-300 rounded-full active:bg-stone-900 active:text-white"
                                    onClick={() => setToggle(true)}><IoMdArrowRoundBack /></button>
                            </div>
                            <div className="flex-[0.9] flex items-center justify-center ">
                                <h1 className="text-xl" >{recieverUser}</h1>
                            </div>
                        </div>
                        <div className=" flex flex-col-reverse min-h-[87vh]">
                            <Chat printChat={printChat} recieverUser={recieverUser} userName={userName} setPrintChat={setPrintChat} />
                        </div>
                        <div className="w-full h-[6vh] flex justify-around bg-red-500 sticky bottom-0 p-1 ">
                            <input className="border items-center justify-center flex-[0.7] p-2 rounded-xl"
                                type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                            <button className=" flex-[0.2] rounded-full hover:bg-red-300 active:bg-stone-900 active:text-white "
                                onClick={() => {
                                    socket.emit('message', { to: recieverUser, message })
                                    setMessage('')
                                }}>send</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}