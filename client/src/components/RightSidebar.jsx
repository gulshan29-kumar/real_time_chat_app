import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  // Get all images from messages
  useEffect(() => {
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  }, [messages])

  if (!selectedUser) return null

  const isOnline = onlineUsers.includes(selectedUser._id)

  return (
    <div className='bg-slate-900/80 border-l border-slate-800/80 text-slate-200 w-full h-full flex flex-col justify-between overflow-y-auto max-lg:hidden'>
      <div className='p-6 space-y-6'>
        
        {/* User Card */}
        <div className='flex flex-col items-center text-center space-y-3 pt-4'>
          <div className='relative'>
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon} 
              alt={selectedUser.fullName}
              className='w-20 h-20 rounded-full object-cover border-2 border-violet-500/50 shadow-xl shadow-violet-950/40' 
            />
            <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
              isOnline ? 'bg-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-500'
            }`}></span>
          </div>

          <div>
            <h2 className='text-base font-bold text-white tracking-tight'>
              {selectedUser.fullName}
            </h2>
            <p className='text-xs text-slate-400 mt-0.5'>
              {selectedUser.email || "quickchat.user@iiitranchi.ac.in"}
            </p>
          </div>

          <div className='w-full px-3 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300 leading-relaxed'>
            "{selectedUser.bio || "Active on QuickChat"}"
          </div>
        </div>

        {/* Media Section */}
        <div className='border-t border-slate-800/80 pt-4'>
          <div className='flex items-center justify-between text-xs mb-3 text-slate-400 font-medium'>
            <span>Shared Media</span>
            <span className='px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 font-semibold'>
              {msgImages.length}
            </span>
          </div>

          {msgImages.length === 0 ? (
            <p className='text-[11px] text-slate-500 text-center py-4 bg-slate-950/20 rounded-xl border border-dashed border-slate-800'>
              No media shared yet
            </p>
          ) : (
            <div className='grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1'>
              {msgImages.map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => window.open(url)} 
                  className='aspect-square rounded-xl overflow-hidden border border-slate-700/60 hover:border-violet-500/80 transition cursor-pointer group bg-slate-800/40'
                >
                  <img 
                    src={url} 
                    alt={`Media ${index}`} 
                    className='w-full h-full object-cover group-hover:scale-110 transition duration-300'
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Footer / Sign Out */}
      <div className='p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3'>
        <button 
          onClick={() => logout()} 
          className='w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-medium text-xs tracking-wide cursor-pointer transition'
        >
          Sign Out of Account
        </button>

        <div className='text-center text-[10px] text-slate-500'>
          Developed by <span className='text-violet-400'>Gulshan Kumar (IIIT Ranchi)</span>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
