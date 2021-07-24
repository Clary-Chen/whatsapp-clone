import React, { useState,useEffect } from 'react'
import './Chat.css'
import db from './firebase'
import { useStateValue } from './StateProvider'

import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile,SearchOutlined } from '@material-ui/icons'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'



const Chat = () => {
  const [input,setInput] = useState('')
  const [roomName,setRoomName] = useState('')
  const {roomId} = useParams()
  const [messages,setMessages] = useState([])
  const [{user},dispatch] = useStateValue()

  const sendMessage = (e)=>{  
    e.preventDefault()
    console.log('just send',input);

    db.collection("rooms").doc(roomId)
      .collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

    setInput('')
  }

  useEffect(()=>{
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot =>(
        setRoomName(snapshot.data().name)
      ))

      db.collection("rooms").doc(roomId)
        .collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(
        setMessages(snapshot.docs.map(doc=>doc.data()))
      ))
    }
  },[roomId])
  
  

  return (
    <div className='chat'>
      {/* chat__header */}
      <div className='chat__header'>
        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6-hkYXSY-keNEMaNDvT4PziSq8l4-niyMQ&usqp=CAU' />

        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            last seen at{' '}
            {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div>

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* chat__body */}
      <div className='chat__body'> 
        {messages.map(message=>(
          <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      {/* chat__footer */}
      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
