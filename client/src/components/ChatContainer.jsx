import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)
  const scrollEnd = useRef()
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e?.preventDefault()
    if (input.trim() === "" || isSending) return
    setIsSending(true)
    try {
      await sendMessage({ text: input.trim() })
      setInput("")
    } finally {
      setIsSending(false)
    }
  }

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }
    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        await sendMessage({ image: reader.result })
        e.target.value = ""
      } catch (err) {
        toast.error("Failed to upload image")
      }
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const isOnline = selectedUser ? onlineUsers.includes(selectedUser._id) : false

  return selectedUser ? (
    <div className='h-full flex flex-col bg-slate-900/40 relative overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md z-10'>
        <div className='flex items-center gap-3 min-w-0'>
          <button 
            onClick={() => setSelectedUser(null)} 
            className='md:hidden p-1.5 -ml-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition'
          >
            <img src={assets.arrow_icon} alt="Back" className='w-4 rotate-180 brightness-200' />
          </button>

          <div className='relative shrink-0'>
            <img 
              src={selectedUser.profilePic || assets.avatar_icon} 
              alt={selectedUser.fullName} 
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
            />
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
              isOnline ? 'bg-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-500'
            }`}></span>
          </div>

          <div className='min-w-0'>
            <p className='text-sm font-semibold text-white truncate flex items-center gap-2'>
              {selectedUser.fullName}
            </p>
            <p className='text-[11px] text-slate-400 truncate'>
              {isOnline ? (
                <span className='text-emerald-400 flex items-center gap-1'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block'></span>
                  Active Now
                </span>
              ) : (
                'Offline'
              )}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2 text-slate-400'>
          <button 
            onClick={() => toast("Contact verified • QuickChat Security", { icon: "🔒" })} 
            className='p-2 rounded-xl hover:bg-slate-800/70 text-slate-300 hover:text-violet-400 transition cursor-pointer'
            title="Info"
          >
            <img src={assets.help_icon} alt="Help" className='w-4 h-4 opacity-70 hover:opacity-100 brightness-200' />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-center p-6 text-slate-500'>
            <div className='w-12 h-12 rounded-full bg-violet-600/10 flex items-center justify-center mb-2'>
              <img src={assets.logo_icon} alt="" className='w-6 h-6 opacity-40' />
            </div>
            <p className='text-xs font-medium text-slate-400'>No messages yet with {selectedUser.fullName}</p>
            <p className='text-[11px] text-slate-500 mt-1'>Send a message or an image to start chatting!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === authUser?._id

            return (
              <div 
                key={index} 
                className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img 
                    src={selectedUser?.profilePic || assets.avatar_icon} 
                    alt="" 
                    className='w-7 h-7 rounded-full object-cover shrink-0 border border-slate-700' 
                  />
                )}

                <div className={`flex flex-col max-w-[78%] sm:max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {msg.image ? (
                    <div className='overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 shadow-md mb-1 group'>
                      <img 
                        src={msg.image} 
                        alt="Attachment" 
                        onClick={() => window.open(msg.image)}
                        className='max-w-[260px] sm:max-w-[320px] max-h-[300px] object-cover cursor-pointer group-hover:scale-105 transition duration-300' 
                      />
                    </div>
                  ) : (
                    <div className={`px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-md break-words ${
                      isMe 
                        ? 'gradient-btn text-white rounded-2xl rounded-br-xs font-normal' 
                        : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-2xl rounded-bl-xs'
                    }`}>
                      {msg.text}
                    </div>
                  )}

                  <span className='text-[10px] text-slate-500 mt-1 px-1'>
                    {formatMessageTime(msg.createdAt)}
                  </span>
                </div>

                {isMe && (
                  <img 
                    src={authUser?.profilePic || assets.avatar_icon} 
                    alt="" 
                    className='w-7 h-7 rounded-full object-cover shrink-0 border border-violet-500/40' 
                  />
                )}
              </div>
            )
          })
        )}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input bar */}
      <div className='p-3 sm:p-4 bg-slate-900/80 border-t border-slate-800/80 backdrop-blur-md'>
        <form onSubmit={handleSendMessage} className='flex items-center gap-2 max-w-4xl mx-auto'>
          <div className='flex-1 flex items-center bg-slate-800/70 border border-slate-700/70 hover:border-violet-500/50 focus-within:border-violet-500 rounded-2xl px-3 py-1.5 transition'>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder="Type your message..." 
              className='flex-1 text-xs sm:text-sm bg-transparent border-none outline-none text-white placeholder-slate-400 py-1.5 px-1'
            />
            
            <input 
              onChange={handleSendImage} 
              type="file" 
              id='image-upload' 
              accept='image/png, image/jpeg, image/webp' 
              hidden 
            />
            <label 
              htmlFor="image-upload" 
              className="p-1.5 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-violet-300 cursor-pointer transition"
              title="Attach image"
            >
              <img src={assets.gallery_icon} alt="Attach" className="w-5 h-5 opacity-70 hover:opacity-100" />
            </label>
          </div>

          <button 
            type="submit" 
            disabled={!input.trim() || isSending}
            className='p-3 rounded-2xl gradient-btn text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shrink-0 flex items-center justify-center'
            title="Send Message"
          >
            <img src={assets.send_button} alt="Send" className="w-4 h-4 brightness-200" />
          </button>
        </form>
      </div>
    </div>
  ) : (
    /* Empty State */
    <div className='h-full hidden md:flex flex-col items-center justify-center p-8 bg-slate-900/30 text-center relative overflow-hidden'>
      <div className='max-w-md flex flex-col items-center space-y-6'>
        <div className='relative'>
          <div className='w-20 h-20 rounded-3xl bg-gradient-to-tr from-violet-600/30 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center backdrop-blur-xl shadow-xl shadow-violet-950/40'>
            <img src={assets.logo_big || assets.logo_icon} className='w-12 h-12 object-contain filter drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]' alt="QuickChat" />
          </div>
          <span className='absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900'></span>
        </div>

        <div>
          <h3 className='text-xl font-bold text-white tracking-tight'>Welcome to QuickChat</h3>
          <p className='text-xs text-slate-400 mt-2 leading-relaxed'>
            Select any active user from the sidebar to begin messaging in real time with instant WebSocket transmission and image sharing.
          </p>
        </div>

        {/* Feature Tags */}
        <div className='grid grid-cols-2 gap-2.5 w-full pt-2'>
          <div className='p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-300'>
            ⚡ Real-time Socket.IO
          </div>
          <div className='p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-300'>
            🖼️ Fast Media Sharing
          </div>
          <div className='p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-300'>
            🟢 Live Presence Status
          </div>
          <div className='p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] text-slate-300'>
            🛡️ Encrypted JWT Auth
          </div>
        </div>

        <div className='pt-4 border-t border-slate-800/80 w-full text-[11px] text-slate-500'>
          Developed by <span className='text-violet-400 font-semibold'>Gulshan Kumar</span> • IIIT Ranchi
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
