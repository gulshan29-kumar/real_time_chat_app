import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser?.fullName || "")
  const [bio, setBio] = useState(authUser?.bio || "")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio })
        navigate('/')
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(selectedImg)
      reader.onload = async () => {
        const base64Image = reader.result
        await updateProfile({ profilePic: base64Image, fullName: name, bio })
        navigate('/')
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 relative'>
      <div className='w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative'>
        
        {/* Top Header */}
        <div className='flex items-center justify-between pb-6 border-b border-slate-800/80 mb-6'>
          <div>
            <h2 className='text-xl font-bold text-white tracking-tight'>Edit Profile</h2>
            <p className='text-xs text-slate-400 mt-1'>Update your identity and biography on QuickChat</p>
          </div>

          <button 
            onClick={() => navigate('/')} 
            className='px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer'
          >
            <span>←</span> Back to Chats
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Avatar selection */}
          <div className='flex items-center gap-5 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80'>
            <div className='relative group'>
              <img 
                src={selectedImg ? URL.createObjectURL(selectedImg) : (authUser?.profilePic || assets.avatar_icon)} 
                alt="Profile Preview" 
                className='w-16 h-16 rounded-full object-cover border-2 border-violet-500/50 shadow-lg'
              />
              <label 
                htmlFor="avatar-upload"
                className='absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-[10px] text-white font-medium'
              >
                Change
              </label>
            </div>

            <div className='flex-1'>
              <label 
                htmlFor="avatar-upload" 
                className='inline-block px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 text-xs font-medium cursor-pointer transition'
              >
                Choose New Avatar
              </label>
              <input 
                onChange={(e) => setSelectedImg(e.target.files[0])} 
                type="file" 
                id='avatar-upload' 
                accept='image/png, image/jpeg, image/webp' 
                hidden
              />
              <p className='text-[11px] text-slate-500 mt-1'>PNG, JPG, or WEBP (Max 4MB)</p>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className='block text-xs font-medium text-slate-300 mb-1.5'>Full Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name}
              type="text" 
              required 
              placeholder='Your Name' 
              className='w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none'
            />
          </div>

          {/* Bio */}
          <div>
            <label className='block text-xs font-medium text-slate-300 mb-1.5'>Profile Bio</label>
            <textarea 
              onChange={(e) => setBio(e.target.value)} 
              value={bio} 
              placeholder="Tell others what you do or your current status..." 
              required 
              rows={4}
              className="w-full glass-input p-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            disabled={isUpdating}
            className="w-full py-3 rounded-xl gradient-btn text-white font-semibold text-sm cursor-pointer transition flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isUpdating ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>

        <div className='mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500'>
          QuickChat Architecture by <span className='text-violet-400 font-medium'>Gulshan Kumar</span> (IIIT Ranchi)
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
