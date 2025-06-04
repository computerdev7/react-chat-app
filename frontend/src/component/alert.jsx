import { useState,useEffect } from "react"

export default function Alert(prop){

    let [showAlert,setShowAlert] = useState(true)

    useEffect(()=> {

        setTimeout(()=> {
            setShowAlert(false)
        },5000)

    },[])
 
    return (
        <>
        {showAlert ? <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-24 w-56 bg-slate-500 rounded-xl p-2 text-sm '> 
        {prop.data}
        </div> : undefined}
        </>
    )
}