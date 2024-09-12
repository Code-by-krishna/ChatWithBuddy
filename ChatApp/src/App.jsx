import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Modules/index.jsx'
import Dashboard from './Modules/Dashboard/index.jsx'
import OTPVerification from './Components/OTPVerification.jsx'
import Menubar from './Components/Menubar.jsx'
import EditProfile from './Components/EditProfile.jsx'
import ShowProfile from './Components/ShowProfile.jsx'
import PaymentGateway from './Components/PaymentGateway.jsx'
import ContactUs from './Components/ContactUs.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import { Navigate, Route, Routes, redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null || false;

  if (!isLoggedIn && auth) {
    return <Navigate to={'/users/sign_in'} />
  } else if (isLoggedIn && ['users/sign_in', 'users/sign_up'].includes(window.location.pathname)) {
    return <Navigate to={'/'} />
  }

  return children
}

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/users/sign_in' element={
          <ProtectedRoute>
            <Form isSignInPage={true} />
          </ProtectedRoute>
        } />
        <Route path='/users/sign_up' element={
          <ProtectedRoute>
            <Form isSignInPage={false} />
          </ProtectedRoute>
        } />
        <Route path='/verify-otp' element={
          <ProtectedRoute auth={false}>
            <OTPVerification />
          </ProtectedRoute>
        } />
        <Route
          path='/edit-profile'
          element={
            <ProtectedRoute auth={true}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/show-profile'
          element={
            <ProtectedRoute auth={true}>
              <ShowProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/payment-gateway'
          element={
            <ProtectedRoute auth={true}>
              <PaymentGateway />
            </ProtectedRoute>
          }
        />
        <Route
          path='/contact-us'
          element={
            <ProtectedRoute auth={true}>
              <ContactUs />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute auth={false}>
              <ForgotPassword/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>

  )
}

export default App
