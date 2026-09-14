import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages
  } = useContext(ChatContext)

  const { logout, onlineUsers, authUser } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const filteredUsers = searchTerm
    ? users.filter((user) => user.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    : users

  useEffect(() => {
    getUsers()
  }, [onlineUsers])

  return (
    <div className={`bg-slate-900/60 border-r border-slate-800/80 h-full flex flex-col overflow-hidden text-slate-200 ${
      selectedUser ? "max-md:hidden" : "w-full"
    }`}>
      {/* Header bar */}
      <div className='p-4 border-b border-slate-800/70'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2.5'>
            <img src={assets.logo_icon || assets.logo} alt="Logo" className='w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]' />
            <div>
              <span className='font-bold text-base text-white tracking-tight'>Quick<span className='text-violet-400'>Chat</span></span>
              <span className='hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30'>v1.0</span>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className='p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer text-slate-300 flex items-center gap-1.5'
              title="User Options"
            >
              <img 
                src={authUser?.profilePic || assets.avatar_icon} 
                alt="Profile" 
                className='w-7 h-7 rounded-full object-cover border border-violet-400/40' 
              />
              <img src={assets.menu_icon} alt="Menu" className='w-3.5 h-3.5 brightness-200' />
            </button>

            {showMenu && (
              <div 
                onMouseLeave={() => setShowMenu(false)}
                className='absolute top-full right-0 mt-2 z-30 w-48 p-2 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl shadow-2xl space-y-1'
              >
                <div className='px-3 py-2 border-b border-slate-800'>
                  <p className='text-xs font-semibold text-white truncate'>{authUser?.fullName || "User"}</p>
                  <p className='text-[10px] text-slate-400 truncate'>{authUser?.email || ""}</p>
                </div>
                <button 
                  onClick={() => { navigate('/profile'); setShowMenu(false); }} 
                  className='w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-violet-600/20 hover:text-violet-300 cursor-pointer transition'
                >
                  Edit Profile
                </button>
                <div className='border-t border-slate-800/80 my-1'></div>
                <button 
                  onClick={() => { logout(); setShowMenu(false); }} 
                  className='w-full text-left px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 cursor-pointer transition'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className='relative mt-3.5'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <img src={assets.search_icon} alt="Search" className='w-3.5 opacity-60' />
          </div>
          <input 
            onChange={(e) => setSearchTerm(e.target.value)} 
            value={searchTerm}
            type="text" 
            className='w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:border-violet-500 focus:bg-slate-800/80 transition' 
            placeholder='Search contacts...'
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")} 
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white'
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Online Status Summary */}
      <div className='px-4 py-2 bg-slate-950/30 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/50'>
        <span className='uppercase font-semibold tracking-wider text-[10px] text-slate-500'>Direct Messages</span>
        <span className='flex items-center gap-1.5'>
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
          {onlineUsers.length} Active
        </span>
      </div>

      {/* User list */}
      <div className='flex-1 overflow-y-auto p-2 space-y-1'>
        {filteredUsers.length === 0 ? (
          <div className='p-6 text-center text-xs text-slate-500'>
            No contacts found
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id)
            const isSelected = selectedUser?._id === user._id
            const unread = unseenMessages[user._id] || 0

            return (
              <div 
                onClick={() => {
                  setSelectedUser(user)
                  setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }))
                }}
                key={user._id} 
                className={`relative flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${
                  isSelected 
                    ? 'bg-violet-600/25 border border-violet-500/40 shadow-lg shadow-violet-950/40' 
                    : 'hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {/* Avatar with indicator */}
                <div className='relative shrink-0'>
                  <img 
                    src={user?.profilePic || assets.avatar_icon} 
                    alt={user.fullName} 
                    className='w-10 h-10 rounded-full object-cover border border-slate-700'
                  />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                    isOnline ? 'bg-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-500'
                  }`}></span>
                </div>

                {/* User Info */}
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-baseline mb-0.5'>
                    <p className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {user.fullName}
                    </p>
                    <span className={`text-[10px] shrink-0 font-medium ${isOnline ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <p className='text-[11px] text-slate-400 truncate'>
                    {user.bio || "Available on QuickChat"}
                  </p>
                </div>

                {/* Unread Pill */}
                {unread > 0 && (
                  <span className='shrink-0 text-[10px] font-bold h-5 min-w-[20px] px-1 flex justify-center items-center rounded-full bg-violet-600 text-white shadow-md shadow-violet-600/50'>
                    {unread}
                  </span>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Footer Branding */}
      <div className='p-3 border-t border-slate-800/70 bg-slate-950/40 text-center text-[10px] text-slate-500'>
        QuickChat • Dev: <span className='text-violet-400 font-medium'>Gulshan Kumar (IIIT Ranchi)</span>
      </div>
    </div>
  )
}

export default Sidebar
