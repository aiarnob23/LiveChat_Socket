import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../axiosConfig";
import Users from "./users";
import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";




const Chat = () => {
   
    const [room, setRoom] = useState('');

    //-----------socket functions---------

   const socket = useMemo(() => io("http://localhost:8080", {
    withCredentials: true,
}), [])

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        })

        socket.on('msg',(data)=>{
            console.log(data, socket.id);
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
          });
        
          socket.on('reconnect', () => {
            console.log('Socket reconnected. New socket ID:', socket.id);
          });
        
          return () => {
            // Cleanup event listeners
            socket.off('disconnect');
            socket.off('reconnect');
          };
      
    },[socket])

    const handleJoinRoom = (e)=>{
        e.preventDefault();
        if(room==''){
            return;
        }
        console.log(room);
        handleSendigMessage();
    }

    const handleSendigMessage = ()=>{
        socket.emit('hi', 'this is from an user');
    }


   //-----------users list--------------
    const { isPending, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            axiosInstance.get('/users', {
                withCredentials: true,
            })
                .then(response => response.data)
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

   // ------------return body------------
    return (
        <div>


            <div className="flex w-full flex-row">
                {/* users part */}
                <div className="w-[1/4] border-2 ">
                    {data.map(user => <Users
                        key={user._id}
                        singleUser={user}
                    ></Users>)}
                </div>
                {/* chatbox part */}
                <div className="w-[3/4] p-4 border-2">
                    <form onSubmit={handleJoinRoom}>
                       <div className="flex flex-row items-center">
                       <input 
                       type="text"
                        placeholder="Type a room code"
                        onChange={(e)=>{setRoom(e.target.value)}}
                         className="my-1 input input-bordered input-info w-full max-w-xs" />
                        <button
                         type="submit"
                          className="btn bg-blue-300">
                            Confirm
                            </button>
                       </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Chat;