import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Login from './Login.tsx'
import Register from './Register.tsx'
import Home from './Home.tsx'
import Otp from './Otp.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='otp' element={<Otp />} />
      <Route path='/' element={<Home />} />
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
