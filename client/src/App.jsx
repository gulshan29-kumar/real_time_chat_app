import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const { authUser } = useContext(AuthContext)

  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 overflow-hidden flex flex-col justify-center">
      {/* Dynamic ambient background glow circles */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] z-0"></div>
      <div className="pointer-events-none fixed top-1/2 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] z-0"></div>
      <div className="pointer-events-none fixed -bottom-40 left-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px] z-0"></div>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#f8fafc',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />

      <div className="relative z-10 w-full min-h-screen">
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
