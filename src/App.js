import React, {useState} from 'react'
import './App.css'
import Sidebar from './Sidebar'
import Chat from './Chat'
import Login from './Login'
import { useStateValue } from './StateProvider'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const App = () => {
  const [{user},dispatch] = useStateValue()
  console.log(user);

  
    return (
      <div className='app'>
        {!user ? (
          <Login/>
        ):(
          <div className='app__body'>
            <Router>
              <Sidebar />
              <Switch>
                <Route exact path='/'>
                  <Chat />
                </Route>
                <Route path='/rooms/:roomId'>
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>          
        )}

      </div>
    )
}

export default App
