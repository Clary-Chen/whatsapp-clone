import React from 'react'
import { Button } from '@material-ui/core'

import './Login.css' 
import { auth,provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'


const Login = () => {
    const [state,dispatch] = useStateValue()

    const signIn = ()=>{
        auth
        .signInWithPopup(provider)
        .then(result => {
          dispatch({type: actionTypes.SET_USER, user: result.user})
        })
        .catch(err => alert(err.message))
    }
  

    return (
      <div className='login'>
        <div className='login__container'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' />

          <div className='login__text'>
            <h1>sign in to whatsapp</h1>
          </div>

          <Button onClick={signIn}>Sign in with Google</Button>
        </div>
      </div>
    )
}

export default Login
