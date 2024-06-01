import React, { useState } from 'react'
import { Button, InputAdornment, TextField } from "@mui/material"
import axios from "axios"
import SendIcon from "@mui/icons-material/Send"
import { Formik } from "formik"
import * as Yup from 'yup'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import bg from "../assets/images/React-eshop.jpg"
import { Visibility, VisibilityOff } from '@mui/icons-material';


const LoginSchema = Yup.object().shape({
  userName : Yup.string()
  .required("Username is required!")
  .min(3, "Username is too short")
  .max(20, "Username is too long"),

  password : Yup.string()
  .required("Passord is required")
  .min(4,"Password is too short!")
})

function Login() {
  const navigate = useNavigate()

  const [isShow, setIsShow] = useState(false)

  const handleLogin = async (loginObject) => {
    try {
      let response = await axios.post("http://localhost:9000/user/login", loginObject)
      console.log(response.data)
      if(response.data.status){
        toast.success(response.data.message)
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen' style={{backgroundImage:`url(${bg})`, backgroundPosition:"center", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
      <div style={{ minWidth: "300px" }} className='border-gray-300 border-2 p-6 rounded-lg bg-blue-800 bg-opacity-15'>
        <Formik
          initialValues={{ userName: "", password: "" }}
          onSubmit={(value) => handleLogin(value)}
          validationSchema={LoginSchema}
        >

          {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
            <>
              <div>
                <TextField
                  variant="standard"
                  label="Username"
                  fullWidth
                  value={values.userName}
                  onChange={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  error={touched.userName && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                />
              </div>
              <div className='my-4'>
                <TextField
                  variant="standard"
                  label="Password"
                  type={isShow ? "text" : "password"}
                  fullWidth
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: <InputAdornment position='end' onClick={() => setIsShow(!isShow)}>
                      {
                        isShow ? <VisibilityOff /> : <Visibility />
                      }
                      </InputAdornment>,
                  }}
                />
              </div>
              <span className='my-3 text-sm'>Don't have an account ? <Link to={"/Register"} className='underline text-blue-400'>Create Now</Link></span>
              <div className='flex justify-center mt-3'>
                <Button variant='outlined' onClick={handleSubmit} endIcon={<SendIcon />}>Login</Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login