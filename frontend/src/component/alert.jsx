import { useState,useEffect } from "react"
import { IoIosCloseCircle } from "react-icons/io";

export default function Alert(prop){

    let [showAlert,setShowAlert] = useState(true)

    useEffect(()=> {

        setTimeout(()=> {
            setShowAlert(false)
        },5000)

    },[])

    return (
        <>
        {showAlert ? 
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-24 w-56 ${prop.color} 
        text-black font-semibold rounded-xl p-2 flex items-center shadow-alert-inner-shadow justify-center text-[25px]`}> 
        <p className="">
        {prop.data}
        </p>
        <button className="absolute right-2 top-2 transform: scale-110 text-black"
        onClick={()=> setShowAlert(false)} ><IoIosCloseCircle /></button>
        </div> : undefined}
        </>
    )
}