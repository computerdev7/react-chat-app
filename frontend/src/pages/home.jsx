import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import useStore from "../store.jsx"
import Chat from "../component/chat.jsx"

const socket = io("http://localhost:3000")

export default function Home() {
    
    let { getUser, getChat } = useStore()

    let [users, setUsers] = useState([])

    let navigate = useNavigate()

    let userName = sessionStorage.getItem("username")

    let [printChat, setPrintChat] = useState([])

    if (!userName) {
        navigate("/")
    }

    let [message, setMessage] = useState('')

    let [recieverUser, setRecieverUser] = useState('')

    let hasRun = useRef({})

    useEffect(() => {

        socket.emit('userjoined', userName)

        socket.on('users', (users) => {
            
        })

        socket.on('message', ({ from, to,message }) => {
            setPrintChat(prev => [...prev, { from, to ,message }])
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
            <button key={i} onClick={() => {
                setRecieverUser(el.username)
                if (!(hasRun.current[el.username])) { 
                    getChat(el.username,userName)
                    .then(res=> {
                        setPrintChat('')
                        setPrintChat(prev=> [...prev,...res.data.message])
                        setPrintChat(prev=> [...prev,...res.data.data1])
                    })
                    hasRun.current[el.username] = 1
                }
            }}>{el.username}</button>
        )
    })

    let renderChat = printChat.map((el) => {

        if(recieverUser == el.to && userName != recieverUser){
            return (
                <li> sent to "{el.to}" {el.message||el.chat}</li>
            )
        } else if(recieverUser == el.from && userName != recieverUser){
             return (
                <li>sent from "{el.from}" {el.message||el.chat}</li>
            )
        }
    })
    
    return (
        <>
            <h1>{recieverUser}</h1>
            {renderUsers}
            <Chat renderChat={renderChat} />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => {
                socket.emit('message', { to: recieverUser, message })
            }}>send</button>
        </>
    )
}