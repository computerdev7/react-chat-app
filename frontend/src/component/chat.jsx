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
            return prev?.map((el) => {
                if (el.id === chatValue) {
                    return { ...el, message: updateChatValue }
                } else if (el._id === chatValue ) {
                    return { ...el, chat: updateChatValue }
                } else {
                    return el
                }
            })
        })
        updateChat(chatValue, updateChatValue)
    }

    console.log(printChat)

    function funcDeleteChat() {
        setToggleAlert(false)
        console.log()
        setPrintChat((prev) => {
            let checkFind = prev?.filter((el) => {
           if(el._id){
            return el._id != chatValue
           } else if(el.id) {
            return el.id != chatValue
           }
        })
            return [...checkFind]
        })
        deleteChat(chatValue)
    }


    function funcAlert() {
        setToggleUpdate(false)
        setToggleAlert(false)
    }

    let renderChat = printChat?.map((el) => {
        return el
    })

    let arr1;
    let arr2;

        arr1 = renderChat?.filter((e) => {
           if (e._id) {
               return e
           }
       })
   
        arr2 = renderChat?.filter((e) => {
           if (e.id) {
               return e
           }
       })
   
       arr1?.map((el) => {
           for (let i = 0; i < arr2.length; i++) {
               if (el._id == arr2[i].id) {
                   arr2 = arr2?.filter(e => el._id != e.id)
               }
           }
       })


    let arr3 = [...arr1, ...arr2]

    let newRenderChat = arr3?.map((el) => {
        if (recieverUser == el.to && userName != recieverUser) {
            return (
                <div className="flex " ref={lastMessage}>
                    <p onClick={() => {
                        setToggleAlert(true)
                        setChatValue(el._id ? el._id : el.id)
                        setUpdateChatValue(el.message || el.chat)
                    }} className="bg-stone-950 text-white w-fit shadow-lg border border-gray-400 p-1 rounded-lg">sent to "{el.to}" {el.message || el.chat}</p>
                </div>

            )
        } else if (recieverUser == el.from && userName != recieverUser) {
            return (
                <div className="flex flex-row-reverse  " ref={lastMessage}>
                    <p onClick={() => {
                    }} className="bg-stone-800 text-white shadow-lg border border-gray-500 w-fit text-right p-1 rounded-lg">sent from "{el.from}" {el.message || el.chat}</p>
                </div>

            )
        }
    })


    return (
        <>
            <div className="w-full h-full flex flex-col gap-1 p-1 pt-16">
                {newRenderChat}
                {toggleAlert
                    &&
                    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-24 w-56 bg-red-500 rounded-xl p-2 text-sm shadow-alert-inner-shadow'>
                        {toggleUpdate ?
                            <div className="flex flex-col h-full w-full">
                                <input className="p-1 rounded-lg"
                                    type="text" value={updateChatValue} onChange={(e) => setUpdateChatValue(e.target.value)} />
                                <div className="flex flex-row h-2/3 items-center justify-around ">
                                    <button className="h-8 w-20 border rounded-lg bg-black text-white hover:bg-red-700 hover:text-stone-900 active:bg-red-900 active:text-white"
                                        onClick={funcUpdateConfirmChat}>CONFIRM</button>
                                    <button className="h-8 w-20 border rounded-lg bg-black text-white hover:bg-red-700 hover:text-stone-900 active:bg-red-900 active:text-white"
                                        onClick={funcAlert}> CANCEL
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
                                    <button className="h-8 w-20 border rounded-lg bg-black text-white hover:bg-red-700 hover:text-stone-900 active:bg-red-900 active:text-white"
                                        onClick={() => {
                                            setToggleUpdate(true);
                                        }}>UPDATE</button>
                                    <button className="h-8 w-20 border rounded-lg bg-black text-white hover:bg-red-700 hover:text-stone-900 active:bg-red-900 active:text-white"
                                        onClick={funcDeleteChat}>DELETE</button>
                                </div>
                            </div>
                        }
                    </div>}
            </div>
        </>
    )
}