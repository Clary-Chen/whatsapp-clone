import React,{useState,useEffect} from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from './firebase'
import { Link } from 'react-router-dom'

const SidebarChat = ({ id, name, createNewChat}) => {
  const [messages,setMessages] = useState([])

  useEffect(()=>{
    if(id){
      db.collection("rooms").doc(id)
        .collection("messages").orderBy('timestamp','desc').onSnapshot(snapshot=>
          setMessages(snapshot.docs.map(doc=>doc.data()))
      )
    }
  },[id])

  const createChat = ()=>{
    const roomName = prompt('please enter name for chat....')
    if(roomName){
      db.collection("rooms").add({
        name: roomName
      })
    }
  }
  
    return !createNewChat ? (
      <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
          <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6-hkYXSY-keNEMaNDvT4PziSq8l4-niyMQ&usqp=CAU' />
          <div className='sidebarChat__info'>
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>       
      </Link>

    ) : (
      <div className="sidebarChat" onClick={createChat}>
        <h2>create new chat</h2>
      </div>
    )
}

export default SidebarChat
