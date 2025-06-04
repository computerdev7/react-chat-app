import { io } from "socket.io-client"
import { useEffect, useState, useRef } from "react"
import useStore from "../store.jsx"

const socket = io('http://localhost:3000')

export default function Chat({ printChat, userName, recieverUser, setPrintChat }) {

    let [toggleAlert, setToggleAlert] = useState(false)

    let lastMessage = useRef(null);

    let [toggleUpdate, setToggleUpdate] = useState(false);

    let [chatValue, setChatValue] = useState('')

    let [updateChatValue, setUpdateChatValue] = useState('');

    let { deleteChat, updateChat } = useStore()

    useEffect(() => {

        lastMessage.current?.scrollIntoView({ behavior: "smooth" })

    }, [printChat])

    function funcUpdateConfirmChat() {
        setToggleUpdate(false)
        setToggleAlert(false)
        setPrintChat((prev) => {
            return prev.map((el) => {
                if (el._id === chatValue && el.message) {
                    return { ...el, message: updateChatValue }
                } else if (el._id === chatValue && el.chat) {
                    return { ...el, chat: updateChatValue }
                } else {
                    return el
                }
            })
        })
        updateChat(chatValue, updateChatValue)
    }

    function funcDeleteChat() {
        setToggleAlert(false)
        setPrintChat((prev) => {
            let checkFind = prev.filter((el) => (el._id != chatValue))
            return [...checkFind]
        })
        deleteChat(chatValue)
    }

    function funcAlert(){
        setToggleAlert(false)
    }

    let renderChat = printChat.map((el) => {
        if (recieverUser == el.to && userName != recieverUser) {
            return (
                <div className="flex " ref={lastMessage}>
                    <p onClick={() => {
                        setToggleAlert(true)
                        setChatValue(el._id ? el._id : el.id)
                        setUpdateChatValue(el.message || el.chat)
                    }} className="bg-slate-200 w-fit p-1 rounded-lg">sent to "{el.to}" {el.message || el.chat}</p>
                </div>
            )
        } else if (recieverUser == el.from && userName != recieverUser) {
            return (
                <div className="flex flex-row-reverse  " ref={lastMessage}>
                    <p onClick={() => {
                    }} className="bg-slate-400 w-fit text-right p-1 rounded-lg">sent from "{el.from}" {el.message || el.chat}</p>
                </div>
            )
        }
    })

    return (
        <>
            <div className="w-full h-full flex flex-col gap-1 p-1 pt-16">
                {renderChat}
                {toggleAlert
                    &&
                    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-24 w-56 bg-slate-500 rounded-xl p-2 text-sm'>
                        {toggleUpdate ?
                            <div className="flex flex-col h-full w-full">
                                <input className="p-1"
                                    type="text" value={updateChatValue} onChange={(e) => setUpdateChatValue(e.target.value)} />
                                <div className="flex flex-row h-2/3 items-center justify-around ">
                                    <button onClick={funcUpdateConfirmChat}>CONFIRM</button>
                                    <button onClick={funcAlert}> CANCEL
                                    </button>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="flex">
                                    <p className="h-2/3 ">Would you like to 'UPDATE' or 'DELETE' the text</p>
                                    <button className='mb-7' onClick={funcAlert}>X</button>
                                </div>
                                <div className="w-full flex items-center justify-around h-1/3">
                                    <button onClick={() => {
                                        setToggleUpdate(true)
                                    }}>UPDATE</button>
                                    <button onClick={funcDeleteChat}>DELETE</button>
                                </div>
                            </div>
                        }
                    </div>}
            </div>
        </>
    )
}