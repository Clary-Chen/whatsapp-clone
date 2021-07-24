import React ,{ useState,useEffect } from 'react'
import './Sidebar.css'
import db from './firebase'

import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from "./SidebarChat"
import { useStateValue } from './StateProvider';


const Sidebar = () => {
  const [rooms,setRooms] = useState([])
  const [{user},dispatch] = useStateValue()
  
  useEffect(()=>{
    db.collection("rooms").onSnapshot(snapshot =>{
      setRooms(snapshot.docs.map(doc =>({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

    return (
      <div className='sidebar'>
        {/* sidebar__header */}
        <div className='sidebar__header'>
          <Avatar src={user?.photoURL}/>
          <div className='sidebar__headerRight'>
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>

        {/* sidebar__search */}
        <div className='sidebar__search'>
          <div className='sidebar__searchContainer'>
            <SearchOutlined />
            <input placeholder='search chat' type='text' />
          </div>
        </div>

        {/* sidebar__chats */}
        <div className='sidebar__chats'>
          <SidebarChat createNewChat/>
          {rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </div>
    )
}

export default Sidebar
