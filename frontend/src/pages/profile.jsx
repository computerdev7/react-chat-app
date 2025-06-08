import { useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import moment from "moment"
import useStore from "../store.jsx"
import { FaPen } from "react-icons/fa";

export default function Profile() {

    let userName = sessionStorage.getItem('username')
    let location = useLocation()
    let { el } = location.state
    let { updateProfile, getUser } = useStore();
    let [userValue, setUserValue] = useState(el)
    let [nameValue, setNameValue] = useState(userValue.name)
    let [bioValue, setBioValue] = useState(userValue.bio)
    let [userSubmitBut, setUserSubmitBut] = useState(false)
    let [bioSubmitBut, setBioSubmitBut] = useState(false)
    let textAreaRef = useRef();
    let unSortedDate = userValue.createdAt
    let sortedDate = moment(unSortedDate).format('MMMM Do YYYY')

    useEffect(() => {
        getUser()
            .then(res => {
                for (let i = 0; i < res.data.message.length; i++) {
                    if (res.data.message[i]._id == el._id) {
                        setUserValue(res.data.message[i])
                    }
                }
            })
    }, [])

    useEffect(() => {
        setNameValue(userValue.name)
        setBioValue(userValue.bio)
    }, [userValue])

    let handleTextAreaInput = () => {
        let textarea = textAreaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    function handleTextAreaChange(e) {
        let input = e.target.value
        let word = input.trim().split(/\s+/);
        let wordLimit = 50;

        if (word.length <= wordLimit) {
            setBioValue(input);
        }
    }

    useEffect(() => {
        handleTextAreaInput();
    }, [bioValue])


    return (
        <>
            <div className="bg-red-500 flex items-center justify-center min-h-screen" >
                <div className="min-h-[300px]  w-3/4 sm:w-1/2 lg:w-1/3 bg-neutral-900 flex flex-col gap-4 p-5 text-white rounded-md shadow-box-inner-shadow">
                    <div>
                        <h1 className="text-lg font-bold w-full text-center">JUST-CHAT PROFILE</h1>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold ">{userValue.username}</h1>
                    </div>
                        <div className="font-extralight text-sm italic">name</div>
                    <div className="w-full flex justify-between">
                        <input className="bg-neutral-900 w-full focus:outline-none focus:border-b border-b border-stone-600 focus:border-white"
                            type="text" value={nameValue} onChange={(e) => setNameValue(e.target.value)} disabled={userSubmitBut ? false : true} placeholder={userName != el.username ? '' : 'Enter your name'} />
                        {userSubmitBut ? undefined :
                            (userName == el.username) ?
                                <button className="text-stone-500"
                                    onClick={() => {
                                        setUserSubmitBut(true)
                                    }}><FaPen /></button>
                                : undefined}
                    </div>
                        <div className="font-extralight text-sm italic">bio</div>
                    <div className="w-full flex justify-between">
                        <textarea ref={textAreaRef} onInput={handleTextAreaInput} className="bg-neutral-900 w-full resize-none overflow-hidden focus:outline-none focus:border-b border-b border-stone-600 focus:border-white"
                            type="text" value={bioValue} onChange={handleTextAreaChange} disabled={bioSubmitBut ? false : true} placeholder={userName != el.username ? '' : 'Fill the bio'}></textarea>
                        {bioSubmitBut ? undefined :
                            (userName == el.username) ?
                            <button className="text-stone-500"
                            onClick={() => {
                                setBioSubmitBut(true)
                            }}><FaPen /></button>
                            : undefined
                        }
                    </div>
                        {userName != el.username ? undefined : <p className="font-extralight text-sm text-right text-gray-400">word-limit : {bioValue.trim().split(/\s+/).filter(Boolean).length} / 50</p>}
                    <div>
                        <div className="font-extralight text-sm italic">joined at</div>
                        <h1>{sortedDate}</h1>
                    </div>
                    {(userSubmitBut || bioSubmitBut) &&
                        <div className="w-full flex items-center justify-around">
                            <button className="w-1/4 h-[30px] border rounded-md hover:bg-red-500 hover:text-black active:bg-stone-600 active:border-none" 
                            onClick={() => {
                                setBioSubmitBut(false);
                                setUserSubmitBut(false);
                                updateProfile(userValue._id, nameValue, bioValue)
                                    .then(res => setUserValue(res.data.message))
                            }}>Submit</button>
                            <button className="w-1/4 h-[30px] border rounded-md hover:bg-red-500 hover:text-black active:bg-stone-600 active:border-none" 
                            onClick={() => {
                                setBioSubmitBut(false);
                                setUserSubmitBut(false);
                            }}>Cancel</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
