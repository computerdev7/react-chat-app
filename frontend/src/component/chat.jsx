import {io} from "socket.io-client"
import { useEffect,useState } from "react"

const socket = io('http://localhost:3000')

export default function Chat({renderChat}){

    

    return (
        <>
        <ol>
        {renderChat}
        </ol>
        </>
    )
}