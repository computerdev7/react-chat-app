import express from "express"
import { createServer } from "http"
import { Server } from "socket.io";
import cors from "cors"
import { connectToDb } from "./database/databse.js";
import dotenv from "dotenv"
import userRoute from "./routes/userRoutes.js"
import chat from "./model/chatModel.js"
import chatRoutes from "./routes/chatRoutes.js"

let app = express();
let httpServer = createServer(app)
let port = process.env.PORT || 3000;

dotenv.config();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST","PUT","DELETE"]
    }
});

app.set("io",io);
app.use(cors());
app.use(express.json());

// chat functionality using socketio

app.use('/user',userRoute);
app.use('/chat',chatRoutes)

let users = {}

io.on('connection',(socket) => {

        console.log("connection",socket.id)

       socket.on('userjoined',(userName) => {
        users[socket.id] = userName;
        io.emit('users',users)
       })
       
       socket.on('message',async({to,message})=> {

           let reciever =  Object.keys(users).find(key => users[key] === to)
           
           let sender = users[socket.id]
        
      try {

       let data = new chat({chat : message,to : to,from : sender})

       let saveData = await data.save()

       console.log(saveData)

      }catch(err){
       console.log(err)
      }
      
          io.to(socket.id).emit('message',({from : sender ,to : to, message}))
          io.to(reciever).emit('message',({from : sender ,to : to, message}))  
      

       })

       socket.on("disconnect",()=> {
        console.log("disconnected",socket.id)
        delete users[socket.id]
        io.emit('users',users)
       })
})

httpServer.listen(port, () => { 
    connectToDb();
    console.log('server running on port',port);
})

export default users