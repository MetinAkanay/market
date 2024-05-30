import React, { useState } from 'react'
import {Button, TextField} from "@mui/material"
import axios from "axios"
import SendIcon from "@mui/icons-material/Send"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  console.log(username)
  console.log(password)

  const handleLogin = async() => {
    try {
      if(username != "" || password != ""){
      let requestObj = {
        userName:username,
        password:password
      }
      let response = await axios.post("http://localhost:9000/user/login", requestObj)
      console.log(response.data)
    }
    } catch (error) {
      console.log("Login Error", error.response.data.message)
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className='flex justify-center items-center h-screen min-w-'>
      <div className=''>
      <div>
        <TextField
        variant="standard" 
        label="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='my-4'>
        <TextField 
        variant="standard" 
        label="Password" 
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
      <Button variant='outlined' onClick={handleLogin} endIcon={<SendIcon />}>Login</Button>
      </div>
    </div>
    </div>
  )
}

export default Login