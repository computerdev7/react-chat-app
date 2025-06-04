import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import useStore from "../store.jsx"
import Chat from "../component/chat.jsx"
import '../Index.css'

const socket = io("http://localhost:3000")

export default function Home() {

    let { getUser, getChat } = useStore()

    let [users, setUsers] = useState([])

    let navigate = useNavigate()

    let userName = sessionStorage.getItem("username")

    let [printChat, setPrintChat] = useState([])

    let [toggle, setToggle] = useState(true)

    if (!userName) {
        navigate("/")
    }

    let [message, setMessage] = useState('')

    let [recieverUser, setRecieverUser] = useState('')

    let hasRun = useRef({})

    useEffect(() => {

        socket.emit('userjoined', userName)

        socket.on('users', (users) => { })

        socket.on('message', ({ from, to, message,_id }) => {
            setPrintChat(prev => [...prev, { from, to, message,_id }])
        })

    }, [])

    useEffect(() => {
        getUser()
            .then(res => {
                setUsers(res.data.message)
            })
    }, [])


    let renderUsers = users.map((el, i) => {
        return (
            <button className="border-b w-full h-16 text-left pl-5 bg-red-400 hover:bg-red-100"
                key={i} onClick={() => {
                    setToggle(false)
                    setRecieverUser(el.username)
                    if (!(hasRun.current[el.username])) {
                        getChat(el.username, userName)
                            .then(res => {
                                setPrintChat('')
                                setPrintChat(prev => [...prev, ...res.data.message])
                            })
                        hasRun.current[el.username] = 1
                    }
                }}>{el.username}</button>
        )
    })

    

    return (
        <>
            <div>

                {/* the toggle literla center noooo... */}
                {toggle ?
                    <div className="min-h-screen w-full bg-red-300">
                        {renderUsers}
                    </div>
                    :
                    <div>
                        <div className="w-full h-11 bg-blue-200 flex fixed top-0">
                            <div className="bg-gray-300 flex-[0.2] flex items-center justify-center">
                                <button
                                    onClick={() => setToggle(true)}>back</button>
                            </div>
                            <div className="bg-slate-100 flex-[0.8] flex items-center justify-center">
                                <h1 className="" >{recieverUser}</h1>
                            </div>
                        </div>
                        <div className="bg-green-100 min-h-screen flex flex-col-reverse ">
                            <Chat printChat={printChat} recieverUser={recieverUser} userName={userName} setPrintChat={setPrintChat}/>
                        </div>
                        <div className="w-full h-10 flex justify-around bg-blue-200 sticky bottom-0 p-1">
                            <input className="border items-center justify-center flex-[0.7]"
                                type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                            <button className="border flex-[0.2]"
                                onClick={() => {
                                    socket.emit('message', { to: recieverUser, message })
                                }}>send</button>
                        </div>
                    </div>}
            </div>
        </>
    )
}