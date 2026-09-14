import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='w-full h-screen p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden'>
      <div className={`w-full max-w-[1540px] h-full max-h-[92vh] glass-panel rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 relative shadow-2xl border border-white/10 transition-all duration-300 ${
        selectedUser 
          ? 'md:grid-cols-[320px_1fr] lg:grid-cols-[340px_1fr_300px]' 
          : 'md:grid-cols-[360px_1fr]'
      }`}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  )
}

export default HomePage
