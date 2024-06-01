import React, { useState } from 'react';
import { Button, InputAdornment, TextField, IconButton } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bg from '../assets/images/Register-bg.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterSchema = Yup.object().shape({
  userName: Yup.string()
    .required('Username is required!')
    .min(3, 'Username is too short')
    .max(20, 'Username is too long'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password is too short!'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Password not match')
    .required('PasswordConfirm is required')
    .min(4, 'Password is too short!'),
});

function Register() {
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const handleRegister = async (registerObject) => {
    console.log(handleRegister);
    try {
      delete registerObject['passwordConfirm'];
      let response = await axios.post('http://localhost:9000/user/register', registerObject);
      console.log(response.data);
      if (response.data.message) {
        toast.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div style={{ minWidth: '300px' }} className='border-gray-300 border-2 p-6 rounded-lg bg-blue-800 bg-opacity-15'>
        <Formik
          initialValues={{ userName: '', email: '', password: '', passwordConfirm: '' }}
          onSubmit={(values) => handleRegister(values)}
          validationSchema={RegisterSchema}
        >
          {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
            <Form>
              <div>
                <TextField
                  variant='standard'
                  label='Username'
                  required
                  fullWidth
                  value={values.userName}
                  onChange={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  error={touched.userName && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                />
              </div>
              <div className='my-4'>
                <TextField
                  variant='standard'
                  label='Email'
                  type='email'
                  required
                  fullWidth
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div className='my-4'>
                <TextField
                  variant='standard'
                  label='Password'
                  type={isShow ? 'text' : 'password'}
                  required
                  fullWidth
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setIsShow(!isShow)}>
                          {isShow ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className='my-4'>
                <TextField
                  variant='standard'
                  label='Password Confirm'
                  type={isShowConfirm ? 'text' : 'password'}
                  required
                  fullWidth
                  value={values.passwordConfirm}
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setIsShowConfirm(!isShowConfirm)}>
                          {isShowConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <span className='my-3 text-sm'>Already have an account? <Link to={'/login'} className='underline text-blue-400'>Login</Link></span>
              <div className='flex justify-center mt-3'>
                <Button type='submit' variant='outlined' endIcon={<SendIcon />}>
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
