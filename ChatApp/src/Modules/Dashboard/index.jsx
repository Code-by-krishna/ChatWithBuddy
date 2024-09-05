import React, { useEffect, useRef, useState } from "react";
import img1 from '../images/krishna.jpeg';
import ChatBuddyimg1 from '../images/ChatBuddy1.jpg'
import ChatBuddyimg2 from '../images/ChatBuddy2.jpg'
import defaultAvatar from '../images/krishna.jpeg';
import { io } from 'socket.io-client';
import Menubar from "../../Components/Menubar";
import DropdownMenu from "../../Components/DropdownMenu";
// import { useLocation } from 'react-router-dom';

const Dashboard = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user:detail")))
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const messageRef = useRef(null);
    // let isUpdated = true;
    // console.log("messages", messages);

    useEffect(() => {
        setSocket(io('http://localhost:5050'));
    }, []);

    useEffect(() => {
        socket?.emit('addUser', user?.id);
        socket?.on('getUsers', users => {
            console.log('activeUsers :>>', users);
        })
        socket?.on('getMessage', data => {
            console.log("data :>>", data);
            setMessages(prev => ({
                ...prev,
                messages: [...prev.messages, { user: data.user, message: data.message }]
            }))
            //setMessages({ messages: [...messages?.messages, data], receiver: messages?.receiver, conversationId: messages?.conversationId})
        })
    }, [socket]);

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages?.messages])

    useEffect(() => {
        const LoggedInUser = JSON.parse(localStorage.getItem("user:detail"));
        const fetchConversations = async () => {
            const result = await fetch(`https://chatwithbuddy-chatappserver.onrender.com/user/conversation/${LoggedInUser?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await result.json();
            // console.log(data);
            setConversations(data);
        }
        fetchConversations();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`https://chatwithbuddy-chatappserver.onrender.com/allUser/${user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await res.json();
            setUsers(result);
        }
        fetchUsers();

    }, [])

    const fetchMessages = async (conversationId, receiver) => {
        const response = await fetch(`https://chatwithbuddy-chatappserver.onrender.com/user/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        const result = await response.json();
        // console.log(receiver);
        setMessages({ messages: result, receiver, conversationId });

    }

    const sendMessage = async (e) => {
        socket?.emit('sendMessage', {
            senderId: user?.id,
            receiverId: messages?.receiver?.receiverId,
            conversationId: messages?.conversationId,
            message
        }
        )
        const res = await fetch(`https://chatwithbuddy-chatappserver.onrender.com/user/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conversationId: messages?.conversationId, senderId: user?.id, message, receiverId: messages?.receiver?.receiverId
            })
        });
        setMessage('');
    }

    const userAvatar = user?.avatar;
    const avatarUrl = userAvatar ? `https://chatwithbuddy-chatappserver.onrender.com/uploads/${userAvatar}` : defaultAvatar;


    return (
        <div className="w-screen flex">
            <div className=" w-[25%] h-screen bg-blue-100 shadow-lg overflow-scroll" >
                <div className="flex rounded-full mt-4 mx-6 my-5">
                    <img className="rounded-[50%]" src={avatarUrl} alt="user image" width={50} height={50} />
                    <div className="mx-3">
                        <h2 className="text-xl font-normal">{user?.fullName}</h2>
                        <p className="text-sm font-light">Admin</p>
                    </div>
                    <div className=" ml-auto mr-2 mt-1 bg-blue-100 cursor-pointer ">
                        < Menubar />
                    </div>
                </div>
                <hr />
                <div className="mx-10" >
                    <div className="text-blue-600 text-xl">Conversations</div>
                    <div className="mt-4 ">
                        {
                            conversations.length > 0 ?
                                conversations.map(({ conversationId, user }) => {
                                    return (
                                        <div className="flex pb-4 mb-3 border-b border-b-gray-300 hover:bg-zinc-300">
                                            <div className="cursor-pointer flex items-center" onClick={() => fetchMessages(conversationId, user)}>
                                                <img className="rounded-[50%] ml-3 mt-3" src={img1} alt="user image" width={40} height={40} />
                                                <div className="mx-4">
                                                    <h2 className="text-lg font-normal">{user?.fullName}</h2>
                                                    <p className="text-sm font-light text-gray-600">{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <div className="text-center text-lg font-semibold mt-24">No Conversations</div>
                        }
                    </div>
                </div>
            </div>
            <div className="w-[50%] h-screen bg-white flex flex-col items-center">
                {
                    messages?.receiver?.fullName &&
                    <div className="w-[75%] h-[10%] bg-blue-100 rounded-full mt-5 mb-3 " >
                        <div className="flex  pb-4 mb-3 items-center">
                            <div className="flex items-center justify-center ml-6 mt-1">
                                <img className=" cursor-pointer rounded-full" src={img1} alt="user image" width={35} height={35} />
                                <div className="ml-4 w-[170px]">
                                    <h2 className="text-lg font-normal">{messages?.receiver?.fullName}</h2>
                                    <p className="text-sm font-light text-gray-600">{messages?.receiver?.email}</p>
                                </div>
                                {/* <div className=" cursor-pointer ml-[130px] shadow-lg rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                    </svg>
                                </div> */}
                            </div>
                        </div>
                    </div>
                }
                <div className="w-full h-[75%]  overflow-y-scroll shadow-lg">
                    <div className="h-[1000px] px-5 py-6">
                        {
                            messages?.messages?.length > 0 ?
                                messages.messages.map(({ message, user: { id } = {} }) => {
                                    console.log(message);
                                    return (
                                        <>
                                            <div className={` max-w-[40%] p-1.5 text-sm ${id === user?.id ? 'rounded-tl-xl rounded-br-xl bg-blue-500 mb-3 ml-auto text-white' : ' rounded-tr-xl rounded-bl-xl mb-3  bg-blue-50'}  `}>
                                                {message}
                                            </div>
                                            <div ref={messageRef}></div>
                                        </>
                                    )
                                }) : <div className="flex items-center justify-center ">
                                    <div>
                                        <div className=" flex justify-center items-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-hipchat shadow-sm " width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M17.802 17.292s.077 -.055 .2 -.149c1.843 -1.425 3 -3.49 3 -5.789c0 -4.286 -4.03 -7.764 -9 -7.764c-4.97 0 -9 3.478 -9 7.764c0 4.288 4.03 7.646 9 7.646c.424 0 1.12 -.028 2.088 -.084c1.262 .82 3.104 1.493 4.716 1.493c.499 0 .734 -.41 .414 -.828c-.486 -.596 -1.156 -1.551 -1.416 -2.29z" />
                                                <path d="M7.5 13.5c2.5 2.5 6.5 2.5 9 0" />
                                            </svg>
                                            <span className=" font-semibold text-2xl font-sans ml-1 shadow-sm">ChatBuddy</span>
                                        </div>
                                        <div className="text-center text-lg font-semibold mt-6 mb-7">No Messages or No Conversation Selected</div><hr/>
                                        <div><img src={ChatBuddyimg1} width={450} height={450}></img></div>
                                        <div className="text-center text-lg font-semibold mt-7 mb-5">A thoughtful message can turn a bad day into a <br/>good one.</div><hr/>
                                        <div className="text-center text-lg font-semibold mt-3  mb-7">Every message exchanged is a step closer to <br/>understanding each other.</div>
                                        <div><img src={ChatBuddyimg2} width={450} height={450}></img></div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {!messages?.receiver?.fullName && <div className=" flex items-center justify-center h-[130px] text-xl text-black font-semibold">ChatBuddy: Where conversations find a home</div>}
                {
                    messages?.receiver?.fullName &&
                    <div className="p-5 w-full flex items-center ">
                        <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} className=" p-2 outline-none shadow-lg  bg-blue-100 rounded-full w-[70%]" />
                        <div className={`ml-4 bg-blue-50 p-2 rounded-full cursor-pointer ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 14l11 -11" />
                                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg>
                        </div>
                        <div className={`ml-4 bg-blue-100 p-2 rounded-full cursor-pointer `} >
                        <DropdownMenu />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                <path d="M9 12h6" />
                                <path d="M12 9v6" />
                            </svg> */}
                        </div>
                    </div>
                }

            </div>
            <div className="w-[25%] h-screen bg-blue-100 shadow-lg overflow-scroll">
                <div className="text-blue-600  text-xl px-8 py-8">Online Users</div>
                <div className="mx-8">
                    {
                        users.length > 0 ?
                            users.map(({ userId, user }) => {
                                return (
                                    <div className="flex pb-4 mb-3 border-b border-b-gray-300 hover:bg-zinc-300">
                                        <div className="cursor-pointer flex items-center" onClick={() => fetchMessages("new", user)}>
                                            <img className="rounded-[50%] ml-3 mt-3" src={img1} alt="user image" width={40} height={40} />
                                            <div className="mx-4">
                                                <h2 className="text-lg font-normal">{user?.fullName}</h2>
                                                <p className="text-sm font-light text-gray-600">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="text-center text-lg font-semibold mt-24">No Conversations</div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Dashboard