import ToolTip from "./tooltip.jsx"
import { useNavigate } from "react-router-dom"
import useStore from "../store.jsx";

export default function RenderUser({users,userName,showFull,setToggle,setRecieverUser,hasRun,setShowChatAlert,setPrintChat}) {

    let navigate = useNavigate();
    let {getChat} = useStore();

    let renderUsers = users.map((el, i) => {
        if (el.username != userName) {
            return (
                <div className=" w-full h-16 text-left p-5 bg-stone-900  text-white  hover:text-red-500  shadow-user-inner-shadow active:bg-stone-700"
                    key={i} onClick={() => {

                        if (showFull) {
                            undefined
                        } else if (!showFull) {
                            setToggle(false)
                        }

                        setRecieverUser(el.username)

                        if (!(hasRun.current[el.username])) {
                            getChat(el.username, userName)
                                .then(res => {
                                    if (res == undefined) {
                                        setShowChatAlert(true)
                                    } else {
                                        setPrintChat(prev => [...prev, ...res.data.message])
                                    }
                                })
                            hasRun.current[el.username] = 1
                        }
                    }}>
                    <button className="group"
                        onClick={() => {
                            navigate('/profile', { state: { el: el } })
                        }}
                    > {el.username}
                        <ToolTip data={'Visit Profile'} />
                    </button>
                </div>
            )
        } else if (users.length === 1) {
            return (
                <h1 className="text-red-500 text-xl text-center">NO USER'S YET EXCEPT YOU</h1>
            )
        }
    })

    return (
        <>
        {renderUsers}
        </>
    )
}